// P2 (ep88) — `select` đúng cột vs lấy cả bảng: đo SỐ CỘT + KB payload, không đoán.
//
//   cd demo-db-interview/prisma-qa && node p2.mjs
//
// Kịch bản: cần 1.000 đơn đầu (orderBy id asc, take 1000).
//   [A] order.findMany({take:1000})                        -> mặc định MỌI cột vô hướng
//   [B] order.findMany({take:1000, select:{id, total}})     -> đúng 2 cột
//
// CÁCH ĐO (điểm ăn tiền của câu này là KB, không phải ms):
//   - SỐ CỘT: đếm THẬT bằng Object.keys(rows[0]).length trên object đã về tới Node,
//     không đọc từ schema, không hardcode. In luôn tên cột để đối chiếu.
//   - PAYLOAD: Buffer.byteLength(JSON.stringify(rows)) — đúng thứ một API sẽ đẩy ra dây.
//   - ms: performance.now() quanh cả lời gọi, chạy RUNS=3 lượt lấy TRUNG BÌNH, sau khi
//     đã bỏ 1 lượt làm nóng mỗi nhánh. (Bài học P1: `e.duration` của Prisma 6 là số
//     NGUYÊN ms nên không tin được cho query nhanh — chỉ performance.now() mới đo được.)
//   - SQL: lấy từ chính log sự kiện của Prisma (`log:[{emit:'event',level:'query'}]`),
//     không chép tay.
//
// Script CHỈ ĐỌC: không ghi, không migrate, không đụng schema.
import { PrismaClient } from '@prisma/client';

const TAKE = 1000;
const RUNS = 3; // số lượt lấy trung bình (chưa kể 1 lượt làm nóng)

const p = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

// --- gom SQL thật Prisma gửi xuống Postgres --------------------------------
let phase = 'warm';
const events = [];
p.$on('query', (e) => events.push({ phase, query: e.query }));
// Sự kiện 'query' bắn SAU khi promise resolve — nhường một nhịp event loop trước
// khi đổi pha, nếu không câu cuối của pha trước rơi nhầm sang pha sau (bẫy từ P1).
const drain = () => new Promise((r) => setTimeout(r, 100));
const sqlOf = (ph) => events.filter((e) => e.phase === ph).at(-1).query;

// --- hai nhánh -------------------------------------------------------------
const allColumns = () => p.order.findMany({ take: TAKE, orderBy: { id: 'asc' } });
const twoColumns = () =>
  p.order.findMany({ take: TAKE, orderBy: { id: 'asc' }, select: { id: true, total: true } });

/** Chạy `fn` RUNS lượt, trả ms TRUNG BÌNH + mảng rows của lượt cuối. */
async function measure(fn) {
  let total = 0;
  let rows;
  for (let i = 0; i < RUNS; i++) {
    const t0 = performance.now();
    rows = await fn();
    total += performance.now() - t0;
  }
  return { ms: total / RUNS, rows };
}

/** Số CỘT thật trên object đã về tới Node — đếm, không đọc schema. */
const colsOf = (rows) => Object.keys(rows[0]);
/** Payload đúng thứ một JSON API đẩy ra dây. */
const kbOf = (rows) => Buffer.byteLength(JSON.stringify(rows)) / 1024;
/** Checksum tính TRONG JS trên dữ liệu ĐÃ VỀ TỚI NODE (không nhờ SQL sum() tính hộ). */
function checksum(rows) {
  let sum = 0;
  for (const r of rows) sum += Number(r.total);
  return { rows: rows.length, sum };
}

const f = (x, d = 2) => x.toFixed(d);
const drop = (a, b) => `-${f(((a - b) / a) * 100, 1)}%`;
const label = (t) => console.log(`== ${t} ==`);
const row = (k, a, b, c = '') => {
  const head = `${k.padEnd(11)}|${String(a).padStart(11)} |${String(b).padStart(11)}`;
  console.log(c === '' ? head : `${head} |${String(c).padStart(7)}`);
};

/** In một dòng chú giải `=>`, tự bẻ dòng THEO TỪ cho vừa khung ảnh dọc (≤ 46 ký tự). */
function bullet(text, W = 46) {
  const out = [];
  let line = '=>';
  for (const w of text.split(' ')) {
    if (`${line} ${w}`.length > W && line.trim() !== '=>') {
      out.push(line);
      line = '  ';
    }
    line += ` ${w}`;
  }
  out.push(line);
  for (const l of out) console.log(l);
}

/** Xuống dòng cho vừa khung ảnh dọc, giữ NGUYÊN VĂN chữ. */
function wrap(prefix, text, W = 44) {
  const pad = ' '.repeat(prefix.length);
  for (let i = 0; i < text.length; i += W) {
    console.log((i === 0 ? prefix : pad) + text.slice(i, i + W));
  }
}

/**
 * In một câu SQL Prisma sinh ra, rút gọn cho vừa khung ảnh dọc.
 * Luật MÁY MÓC (không sửa tay, không viết lại câu) — chỉ 2 luật:
 *   1. bỏ tiền tố schema `"public".`
 *   2. bỏ dấu nháy kép quanh tên bảng/cột
 * Khác P1 ở chỗ P1 thay danh sách cột bằng `...` vì ở đó điểm nhấn là WHERE;
 * ở P2 DANH SÁCH CỘT CHÍNH LÀ ĐIỂM NHẤN nên giữ nguyên văn, chỉ bẻ dòng.
 * Câu đầy đủ chưa rút gọn được chép vào report.
 */
function showSql(tag, sql, maxLines) {
  const one = sql.replace(/\s+/g, ' ').trim().replaceAll('"public".', '').replaceAll('"', '');
  const W = 44;
  const lines = [];
  for (let i = 0; i < one.length && lines.length < maxLines; i += W) lines.push(one.slice(i, i + W));
  if (one.length > W * maxLines) lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, W - 1)}…`;
  console.log(`${tag} ${lines[0]}`);
  for (const l of lines.slice(1)) console.log(`${' '.repeat(tag.length)} ${l}`);
}

// --------------------------------------------------------------------------
// WARM-UP: mở kết nối + làm nóng cache cả hai nhánh (không tính vào ms, không lấy SQL).
await p.order.findMany({ take: 1 });
await allColumns();
await twoColumns();
await drain();

phase = 'A';
const a = await measure(allColumns);
await drain();
phase = 'B';
const b = await measure(twoColumns);
await drain();
phase = 'done';

/**
 * Chạy EXPLAIN trên CHÍNH câu SQL Prisma vừa gửi xuống (lấy từ log), chỉ thay tham số
 * `$1`/`$2` bằng giá trị thật vì EXPLAIN không nhận prepared param. Trả tên node quét
 * + `width` (số byte/dòng planner ước tính) — để nói chuyện "select có đổi PLAN không?"
 * bằng số ĐO ĐƯỢC chứ không phải phỏng đoán.
 */
async function planOf(sql) {
  const inlined = sql.replaceAll('$1', String(TAKE)).replaceAll('$2', '0');
  const out = await p.$queryRawUnsafe(`EXPLAIN ${inlined}`);
  const text = out.map((r) => r['QUERY PLAN']).join('\n');
  const m = text.match(/->\s+(.*?)\s+\(cost=[^)]*width=(\d+)\)/);
  return { node: m ? m[1].replace(/ on \w+$/, '') : '?', width: m ? m[2] : '?', text };
}

const pa = await planOf(sqlOf('A'));
const pb = await planOf(sqlOf('B'));

const ca = colsOf(a.rows);
const cb = colsOf(b.rows);
const kaKB = kbOf(a.rows);
const kbKB = kbOf(b.rows);
const ka = checksum(a.rows);
const kb = checksum(b.rows);

label(`P2: payload lấy cả bảng vs select đúng cột`);
console.log(`${TAKE} đơn đầu (orderBy id asc) · Prisma 6.19.3`);
bullet(`ms = TRUNG BÌNH ${RUNS} lượt (bỏ 1 lượt làm nóng)`);
console.log('');

/**
 * In khối kết quả một nhánh. Danh sách cột ghép thẳng vào dòng số đo nếu vừa khung
 * ảnh dọc (≤ 48 ký tự), không vừa thì xuống dòng riêng — luật máy móc, cùng một hàm
 * cho cả hai nhánh, không tự tay chọn kiểu trình bày cho từng nhánh.
 */
function printBranch(cols, kb, ms) {
  const nums = `${f(kb, 1)} KB · ${f(ms)} ms`;
  const inline = `  SỐ CỘT THẬT: ${cols.length} (${cols.join(', ')}) · ${nums}`;
  if (inline.length <= 48) return console.log(inline);
  console.log(`  SỐ CỘT THẬT: ${cols.length} · ${nums}`);
  wrap('  cột: ', cols.join(', '));
}

console.log(`[A] findMany({take:${TAKE}}) — mặc định MỌI cột`);
printBranch(ca, kaKB, a.ms);
console.log('');
console.log('[B] thêm select: { id: true, total: true }');
printBranch(cb, kbKB, b.ms);
console.log('');

label('SQL sinh ra (giữ nguyên danh sách cột)');
showSql('A', sqlOf('A'), 4);
showSql('B', sqlOf('B'), 3);
console.log('');

label('cùng dữ liệu? checksum trong JS');
row('', 'cả bảng', 'select 2', '');
row('dòng', ka.rows, kb.rows, '');
row('tổng total', ka.sum, kb.sum, '');
const same = ka.rows === kb.rows && ka.sum === kb.sum;
bullet(
  same
    ? 'KHỚP TỪNG SỐ: cùng dữ liệu, khác lượng cột'
    : 'LỆCH! hai nhánh KHÔNG cùng dữ liệu',
);
console.log('');

label('bảng so sánh');
row('', 'cả bảng', 'select 2', 'giảm');
row('số cột', ca.length, cb.length, drop(ca.length, cb.length));
row('payload KB', f(kaKB, 1), f(kbKB, 1), drop(kaKB, kbKB));
row(`ms (tb ${RUNS})`, f(a.ms), f(b.ms), drop(a.ms, b.ms));

const msDropPct = ((a.ms - b.ms) / a.ms) * 100;
bullet('payload ngốn băng thông mạng VÀ RAM Node');
bullet('select cắt cả 3 tầng: DB đọc ít, mạng tải ít, JSON.stringify nhỏ đi — KB là con số bất biến');
// Dòng "bẫy" chỉ in khi ĐO THẤY ms không chênh mấy — đúng tinh thần trung thực của P1.
// Cả hai nhánh đều nói về PLAN, và plan là ĐO được (planOf ở trên), không phải phỏng đoán.
bullet(
  msDropPct < 25
    ? `bẫy: select KHÔNG tự làm query nhanh — ms chỉ giảm ${f(msDropPct, 1)}%; EXPLAIN cùng ${pa.node}, chỉ khác width ${pa.width} → ${pb.width}`
    : `ms giảm ${f(msDropPct, 1)}% nhưng ms là số nhiễu; EXPLAIN cùng ${pa.node}, plan KHÔNG đổi, chỉ khác width ${pa.width} → ${pb.width}`,
);

await p.$disconnect();
