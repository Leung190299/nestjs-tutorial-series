// D6 (ep86) — Phân trang: OFFSET lớn vs cursor (keyset), trên orders 500.000 dòng.
//
//   node d6.mjs
//
// Kịch bản: lấy TRANG CUỐI (20 dòng) của bảng 500.000 dòng, ORDER BY id.
//   [A] OFFSET : SELECT id,total,status FROM orders ORDER BY id LIMIT 20 OFFSET 499980
//   [B] cursor : SELECT id,total,status FROM orders WHERE id > $1 ORDER BY id LIMIT 20
//                với $1 = id CUỐI CÙNG của trang trước (đọc thật, KHÔNG hardcode)
//
// Script CHỈ ĐỌC: không tạo/xóa index, không ghi dữ liệu. Cả hai nhánh dùng chung
// PRIMARY KEY `orders_pkey` — so sánh công bằng, khác nhau chỉ ở CÁCH nhảy tới trang.
//
// Bằng chứng mạnh nhất KHÔNG phải ms mà là `rows` ở node quét: nhánh OFFSET bắt
// Postgres phát ra đủ 500.000 dòng rồi vứt bỏ 499.980 dòng, nhánh cursor chỉ 20.
// Docs (queries-limit): "The rows skipped by an OFFSET clause still have to be
// computed inside the server; therefore a large OFFSET might be inefficient."
//
// Mọi tên node/con số đều TRÍCH TỪ PLAN THẬT bằng regex — không hardcode tên node,
// planner đổi plan thì output đổi theo.
import { pool, q, label } from './db.mjs';

const PAGE = 20;
const DEEP = 499980; // offset của trang cuối khi bảng có 500.000 dòng
const MILESTONES = [0, 1000, 100000, DEEP];

const SQL_OFFSET = 'SELECT id,total,status FROM orders ORDER BY id LIMIT 20 OFFSET $1';
const SQL_CURSOR = 'SELECT id,total,status FROM orders WHERE id > $1 ORDER BY id LIMIT 20';

/** Tách dòng node dài thành {name, actual, rows} — giữ NGUYÊN VĂN phần trong ngoặc. */
function split(line) {
  const m = line.match(/^(.*?)\s+\(cost=[^)]*\)\s+\((actual[^)]*)\)\s*$/);
  if (!m) return { name: line, actual: '', rows: NaN };
  // Bỏ ` loops=1` cho vừa khung ảnh dọc (loops=1 = chạy đúng 1 lần, không mất thông tin).
  const actual = m[2].replace(/\s+loops=1$/, '');
  return {
    name: m[1],
    actual: `(${actual})`,
    rows: Number((m[2].match(/rows=(\d+)/) || [])[1] ?? NaN),
  };
}

/** EXPLAIN (ANALYZE, BUFFERS) + trích node ngoài cùng, node quét, buffers, exec. */
async function explain(sql, params) {
  const { rows } = await q(`EXPLAIN (ANALYZE, BUFFERS) ${sql}`, params);
  const lines = rows.map((r) => r['QUERY PLAN']);
  const t = lines.map((l) => l.trim());
  const top = split(t[0]);
  const childIdx = t.findIndex((l) => l.startsWith('->'));
  const child = childIdx === -1 ? null : split(t[childIdx].replace(/^->\s+/, ''));
  const sub = childIdx === -1 ? [] : t.slice(childIdx + 1);
  const buffers = (t.find((l) => l.startsWith('Buffers:')) || '').replace('Buffers: shared ', '');
  const exec = t.find((l) => l.startsWith('Execution Time:')) || '';
  return {
    full: lines,
    top,
    child,
    // Điều kiện dùng index (nếu có) — chứng minh cursor "nhảy" bằng index chứ không quét.
    cond: sub.find((l) => /^(Index Cond|Filter|Recheck Cond):/.test(l)) || '',
    // Nếu planner có báo dòng bị loại thì in nguyên văn (plan hiện tại không có).
    removed: sub.find((l) => /^Rows Removed by/.test(l)) || '',
    buffers,
    execMs: Number((exec.match(/([\d.]+) ms/) || [])[1] ?? NaN),
    scanned: child ? child.rows : top.rows,
    returned: top.rows,
  };
}

/** Chạy query THƯỜNG (không EXPLAIN): 2 lượt làm nóng rồi đo 3 lượt. */
async function timeIt(sql, params) {
  for (let i = 0; i < 2; i++) await q(sql, params);
  const ms = [];
  let rows = [];
  for (let i = 0; i < 3; i++) {
    const r = await q(sql, params);
    ms.push(r.ms);
    rows = r.rows;
  }
  return { ms, avg: ms.reduce((a, b) => a + b, 0) / ms.length, rows };
}

/** Checksum tính TRONG JS từ chính rows driver trả về (không nhờ SQL count/sum). */
function checksum(rows) {
  const ids = rows.map((r) => r.id);
  return {
    n: rows.length,
    min: Math.min(...ids),
    max: Math.max(...ids),
    sum: rows.reduce((s, r) => s + r.total, 0),
  };
}

/** id cuối cùng của trang TRƯỚC mốc `off` — đúng thứ mà app thật cầm để đi tiếp. */
async function boundaryId(off) {
  if (off === 0) return 0; // trang đầu: chưa có cursor -> id > 0
  const { rows } = await q('SELECT id FROM orders ORDER BY id LIMIT 1 OFFSET $1', [off - 1]);
  return rows[0].id;
}

const f = (x, d = 2) => x.toFixed(d);

// --------------------------------------------------------------------------
const { rows: cnt } = await q('SELECT count(*) AS n FROM orders');
const total = Number(cnt[0].n);

// Trang TRƯỚC trang cuối, lấy đúng như app thật: đọc trang rồi giữ id cuối cùng.
const prevPage = await q(SQL_OFFSET, [DEEP - PAGE]);
const lastId = prevPage.rows.at(-1).id;

const a = await explain(SQL_OFFSET, [DEEP]);
const ta = await timeIt(SQL_OFFSET, [DEEP]);
const b = await explain(SQL_CURSOR, [lastId]);
const tb = await timeIt(SQL_CURSOR, [lastId]);

const ka = checksum(ta.rows);
const kb = checksum(tb.rows);

// Đường cong: cùng 4 mốc cho cả hai cách phân trang.
const curve = [];
for (const off of MILESTONES) {
  const id = await boundaryId(off);
  const o = await timeIt(SQL_OFFSET, [off]);
  const c = await timeIt(SQL_CURSOR, [id]);
  curve.push({ off, id, offset: o.avg, cursor: c.avg });
}

// ---- in bằng chứng ----
label(`D6: OFFSET ${DEEP} vs cursor`);
console.log(`${total} dòng · trang cuối ${PAGE} dòng · ORDER BY id`);
console.log('');

function printBranch(head, p, t) {
  console.log(head);
  console.log(`  ${p.top.name} ${p.top.actual}`);
  if (p.child) {
    console.log(`  -> ${p.child.name}`);
    if (p.cond) console.log(`     ${p.cond}`);
    console.log(`     ${p.child.actual}`);
    if (p.removed) console.log(`     ${p.removed}`);
  }
  console.log(`  quét ${p.scanned} dòng · VỨT BỎ ${p.scanned - p.returned} · ${p.buffers}`);
  console.log(`  Exec ${f(p.execMs)} ms · query x3 ${t.ms.map((x) => f(x)).join('/')} ms`);
}

printBranch(`[A] LIMIT ${PAGE} OFFSET ${DEEP}`, a, ta);
console.log('');
printBranch(`[B] cursor WHERE id > ${lastId} LIMIT ${PAGE}`, b, tb);
console.log('');

const row = (k, x, y) => console.log(`${k.padEnd(11)}|${String(x).padStart(15)} |${String(y).padStart(14)}`);
label(`hai nhánh CÙNG ${PAGE} dòng? checksum JS`);
row('', 'OFFSET', 'cursor');
row('số dòng', ka.n, kb.n);
row('min/max id', `${ka.min}/${ka.max}`, `${kb.min}/${kb.max}`);
row('SUM(total)', ka.sum, kb.sum);
const same = ka.n === kb.n && ka.min === kb.min && ka.max === kb.max && ka.sum === kb.sum;
console.log(same
  ? '=> KHỚP TỪNG SỐ: hai cách viết, một trang'
  : '=> LỆCH! hai nhánh KHÔNG cùng dữ liệu — xem lại SQL');
console.log('');

label('càng về sau OFFSET càng chậm');
console.log(`${'OFFSET'.padEnd(9)}|${'A offset'.padStart(10)} |${'B cursor'.padStart(10)}`);
for (const c of curve) {
  console.log(`${String(c.off).padEnd(9)}|${(`${f(c.offset)} ms`).padStart(10)} |${(`${f(c.cursor)} ms`).padStart(10)}`);
}
const first = curve[0];
const last = curve.at(-1);
// Tên index THẬT lấy từ plan nhánh cursor (không hardcode — đổi plan thì đổi theo).
const idxName = ((b.child?.name || '').match(/using (\S+)/) || [])[1] || 'index';
console.log(`=> OFFSET N vẫn phải QUÉT rồi VỨT BỎ đủ N dòng:`);
console.log(`   ${f(first.offset)} ms -> ${f(last.offset)} ms (trang đầu -> trang cuối)`);
console.log(`=> cursor nhảy thẳng bằng index ${idxName}:`);
console.log(`   ${f(first.cursor)} ms -> ${f(last.cursor)} ms: PHẲNG, trang nào cũng vậy`);
console.log('=> bẫy: cursor cần cột sắp xếp ỔN ĐỊNH & UNIQUE,');
console.log('   và KHÔNG nhảy tới "trang số 500" tùy ý được');

await pool.end();
