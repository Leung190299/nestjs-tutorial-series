// D1 (ep81) — Index làm gì: quét cả bảng vs dùng index, trên orders 500.000 dòng.
//
//   node d1.mjs
//
// Script tự DROP INDEX ở đầu nên chạy lại bao nhiêu lần cũng ra cùng kịch bản.
// Sau khi chạy xong, index `idx_orders_customer` ĐƯỢC GIỮ LẠI (các câu sau như
// D3/D6/P6 hưởng lợi) — muốn về trạng thái "chưa index" thì chạy lại script này,
// bước đầu tiên của nó sẽ drop.
//
// Đo cho công bằng: trước mỗi nhánh chạy 1 lượt LÀM NÓNG cache rồi mới đo 3 lần,
// để chênh lệch đến từ CÁCH QUÉT (plan) chứ không phải từ đọc đĩa lần đầu.
//
// LƯU Ý sự thật đo được (đừng "sửa cho đẹp"): trên Postgres 17.11 + data này,
// nhánh chưa index ra plan SONG SONG (Gather -> Parallel Seq Scan), còn nhánh có
// index ra Bitmap Heap Scan -> Bitmap Index Scan chứ không phải Index Scan thuần —
// vì 61 dòng khớp nằm rải rác trên hàng chục trang. Cả hai vẫn là "quét cả bảng"
// vs "dùng index", đúng bài học; script in nguyên văn cái planner chọn.
import { pool, q, label } from './db.mjs';

const CUSTOMER_ID = 1;
const SQL = 'SELECT * FROM orders WHERE customer_id = $1';
// `node d1.mjs --full` in thêm plan ĐẦY ĐỦ 2 nhánh (dùng cho ảnh --wide).
const FULL = process.argv.includes('--full');

/** Chạy EXPLAIN (ANALYZE, BUFFERS) và trích các dòng cốt lõi (giữ NGUYÊN VĂN). */
async function explain(sql, params) {
  const { rows } = await q(`EXPLAIN (ANALYZE, BUFFERS) ${sql}`, params);
  const lines = rows.map((r) => r['QUERY PLAN']);
  const topIdx = lines.findIndex((l) => l.trim().length > 0);
  const top = split(lines[topIdx].trim());
  const rest = lines.slice(topIdx + 1);
  // Buffers ĐẦU TIÊN = của chính node ngoài cùng (đã cộng dồn node con).
  const buffers = (rest.find((l) => l.trim().startsWith('Buffers:')) || '').trim();
  const exec = (rest.find((l) => l.trim().startsWith('Execution Time:')) || '').trim();
  // Node con thực sự đi quét dữ liệu (Parallel Seq Scan / Bitmap Index Scan).
  const childIdx = rest.findIndex((l) => l.trim().startsWith('->'));
  const child = childIdx === -1 ? null : split(rest[childIdx].trim().replace(/^->\s+/, ''));
  // Dòng chú giải của node con: ưu tiên "Rows Removed by Filter" (nói lên công
  // sức bỏ đi của Seq Scan), không có thì lấy điều kiện dùng index.
  const sub = rest.slice(childIdx + 1).map((l) => l.trim());
  const detail = childIdx === -1 ? ''
    : (sub.find((l) => l.startsWith('Rows Removed by Filter:'))
      || sub.find((l) => /^(Index Cond|Filter|Recheck Cond):/.test(l)) || '');
  return {
    full: lines,
    top,
    child,
    childDetail: detail,
    buffers,
    exec,
    execMs: Number((exec.match(/([\d.]+) ms/) || [])[1] ?? NaN),
    // Tổng trang bộ nhớ đệm node ngoài cùng chạm tới (hit + read).
    bufTotal: (buffers.match(/(hit|read)=(\d+)/g) || [])
      .reduce((s, x) => s + Number(x.split('=')[1]), 0),
  };
}

/** Tách dòng node dài (~100 ký tự) thành {name, cost, actual, loops} cho vừa ảnh dọc. */
function split(line) {
  const m = line.match(/^(.*?)\s+\((cost=[^)]*)\)\s+\((actual[^)]*)\)\s*$/);
  if (!m) return { name: line, cost: '', actual: '', loops: 1 };
  return {
    name: m[1],
    cost: `(${m[2]})`,
    actual: `(${m[3]})`,
    loops: Number((m[3].match(/loops=(\d+)/) || [])[1] ?? 1),
  };
}

function printPlan(p) {
  if (FULL) {
    // Bỏ khối "Planning:" cho vừa khung ảnh ngang; phần cây plan giữ NGUYÊN VĂN.
    const pi = p.full.findIndex((l) => l.trim() === 'Planning:');
    const out = pi === -1 ? p.full
      : [...p.full.slice(0, pi), ...p.full.slice(pi + 2).filter((l) => !l.startsWith('Planning Time:'))];
    out.forEach((l) => console.log(l));
    return;
  }
  console.log(p.top.name);
  if (p.top.cost) console.log(`  ${p.top.cost}`);
  if (p.top.actual) console.log(`  ${p.top.actual}`);
  if (p.child) {
    console.log(`  -> ${p.child.name}`);
    if (p.childDetail) {
      const x = p.child.loops > 1 ? ` (x${p.child.loops} worker)` : '';
      console.log(`     ${p.childDetail}${x}`);
    }
  }
  console.log(`  ${p.buffers}`);
  console.log(`  ${p.exec}`);
}

/** Chạy query thường 3 lần (sau 1 lượt làm nóng), trả mảng ms + trung bình. */
async function timeIt() {
  for (let i = 0; i < 3; i++) await q(SQL, [CUSTOMER_ID]); // làm nóng cache
  const ms = [];
  for (let i = 0; i < 3; i++) ms.push((await q(SQL, [CUSTOMER_ID])).ms);
  return { ms, avg: ms.reduce((a, b) => a + b, 0) / ms.length };
}

const f = (x, d = 1) => x.toFixed(d);

// --------------------------------------------------------------------------
await q('DROP INDEX IF EXISTS idx_orders_customer');

const { rows: c } = await q(
  'SELECT count(*) AS n FROM orders WHERE customer_id = $1', [CUSTOMER_ID],
);
const { rows: t } = await q('SELECT count(*) AS n FROM orders');
const nOrders = Number(c[0].n);
const nTotal = Number(t[0].n);

if (FULL) {
  label(`D1: plan đầy đủ · khách #${CUSTOMER_ID} có ${nOrders} đơn / ${nTotal}`);
} else {
  label('D1: quét cả bảng vs dùng index');
  console.log(`khách #${CUSTOMER_ID}: ${nOrders} đơn / ${nTotal} đơn cả bảng`);
  console.log(`=> chỉ ${f((nOrders / nTotal) * 100, 3)}% số dòng thỏa WHERE`);
  console.log('');
}

console.log('[A] CHƯA INDEX (orders chỉ có PK trên id)');
const a = await explain(SQL, [CUSTOMER_ID]);
printPlan(a);
const ta = await timeIt();
if (!FULL) console.log(`  query thường x3: ${ta.ms.map((x) => f(x)).join(' / ')} ms`);
console.log('');

const mk = await q('CREATE INDEX idx_orders_customer ON orders(customer_id)');
const an = await q('ANALYZE orders');
const { rows: sz } = await q(
  "SELECT pg_size_pretty(pg_relation_size('idx_orders_customer')) AS s",
);
if (FULL) {
  console.log(`[+] CREATE INDEX idx_orders_customer: ${f(mk.ms, 0)} ms · ANALYZE ${f(an.ms, 0)} ms · index ${sz[0].s}`);
} else {
  console.log(`[+] CREATE INDEX idx_orders_customer: ${f(mk.ms, 0)} ms`);
  console.log(`    ANALYZE: ${f(an.ms, 0)} ms · index nặng ${sz[0].s}`);
  console.log('');
}

console.log('[B] SAU KHI CÓ INDEX');
const b = await explain(SQL, [CUSTOMER_ID]);
printPlan(b);
const tb = await timeIt();
if (!FULL) console.log(`  query thường x3: ${tb.ms.map((x) => f(x)).join(' / ')} ms`);
console.log('');

// Tên node quét THẬT do planner chọn (không hardcode — plan có thể đổi).
const scanB = b.child ? b.child.name.split(' on ')[0] : b.top.name.split(' on ')[0];

if (FULL) {
  console.log(`=> EXPLAIN ${f(a.execMs, 2)} ms -> ${f(b.execMs, 2)} ms · buffers ${a.bufTotal} -> ${b.bufTotal} trang · ${scanB} thay cho Seq Scan`);
} else {
  label('bảng so sánh');
  const row = (k, x, y) => console.log(`${k.padEnd(12)}|${x.padStart(11)} |${y.padStart(9)}`);
  row('', 'chưa index', 'có index');
  row('EXPLAIN ms', f(a.execMs, 2), f(b.execMs, 2));
  row('query ms', f(ta.avg, 2), f(tb.avg, 2));
  row('buffers', String(a.bufTotal), String(b.bufTotal));
  console.log(`=> nhanh hơn ${f(ta.avg / tb.avg)}x, chạm ít hơn ${f(a.bufTotal / b.bufTotal)}x trang`);
  console.log(`=> chưa index: lọc bỏ ~500k dòng để lấy ${nOrders} dòng`);
  console.log(`=> có index: PG chọn ${scanB} — vẫn là`);
  console.log('   dùng index, chỉ khác cách gom dòng rải rác');
  console.log(`=> index KHÔNG miễn phí: ${sz[0].s} + mọi lệnh ghi`);
  console.log('   phải cập nhật thêm index');
}

await pool.end();
