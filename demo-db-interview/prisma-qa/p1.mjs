// P1 (ep87) — N+1 trong ORM: 21 query vs 2 query, đo bằng chính log của Prisma.
//
//   cd demo-db-interview/prisma-qa && node p1.mjs
//
// Kịch bản: cần 20 khách đầu (orderBy id asc, take 20) KÈM đơn hàng của họ.
//   [A] N+1     : customer.findMany({take:20}) rồi vòng lặp 20 lần order.findMany
//   [B] include : customer.findMany({take:20, include:{orders:true}})
//
// CÁCH ĐẾM (quan trọng nhất của câu này): KHÔNG đếm bằng mắt, KHÔNG hardcode.
// Client bật `log:[{emit:'event',level:'query'}]`, mọi câu Prisma gửi xuống Postgres
// đều bắn một sự kiện 'query' — handler `$on('query')` nhét vào giỏ theo PHA đang chạy.
// Trước khi đo có một lượt WARM-UP: query mồi để Prisma mở kết nối và bắn hết những
// câu hạ tầng lúc khởi tạo; số sự kiện của pha warm-up bị LOẠI khỏi phép đếm và
// được in ra để người xem biết đã loại bao nhiêu.
//
// Ở Prisma 6.19.3, `relationLoadStrategy` còn là Preview (schema demo KHÔNG bật
// `relationJoins`) nên `include` dùng chiến lược `query`: 1 query cha + 1 query con,
// ghép ở tầng ứng dụng. Kỳ vọng là 2 — nhưng script vẫn ĐẾM rồi mới đặt nhãn.
//
// Script CHỈ ĐỌC: không ghi, không migrate, không đụng schema.
import { PrismaClient } from '@prisma/client';

const TAKE = 20;

const p = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

// --- bộ đếm query THẬT -----------------------------------------------------
let phase = 'warm';
const events = []; // { phase, query, duration }
p.$on('query', (e) => events.push({ phase, query: e.query, duration: e.duration }));

// Sự kiện 'query' được bắn ngay sau khi promise resolve, không phải TRƯỚC nó.
// Nhường một nhịp event loop để log của pha vừa xong về đủ rồi mới đổi pha —
// nếu không, câu cuối của pha A có thể bị tính sang pha B.
const drain = () => new Promise((r) => setTimeout(r, 100));

// Câu hạ tầng (BEGIN/COMMIT/SET/SELECT 1...) không phải query nghiệp vụ.
const INFRA = /^\s*(BEGIN|COMMIT|ROLLBACK|SET\b|DEALLOCATE|SELECT 1\b)/i;
const bucket = (ph) => events.filter((e) => e.phase === ph);
const business = (ph) => bucket(ph).filter((e) => !INFRA.test(e.query));

// --- nhánh A: N+1 ----------------------------------------------------------
async function nPlusOne() {
  const t0 = performance.now();
  const customers = await p.customer.findMany({ take: TAKE, orderBy: { id: 'asc' } });
  const orders = [];
  for (const c of customers) {
    orders.push(...(await p.order.findMany({ where: { customerId: c.id } })));
  }
  return { ms: performance.now() - t0, orders };
}

// --- nhánh B: include ------------------------------------------------------
async function withInclude() {
  const t0 = performance.now();
  const customers = await p.customer.findMany({
    take: TAKE, orderBy: { id: 'asc' }, include: { orders: true },
  });
  const orders = customers.flatMap((c) => c.orders);
  return { ms: performance.now() - t0, orders };
}

/** Checksum tính TRONG JS trên dữ liệu ĐÃ VỀ TỚI NODE (không nhờ SQL count/sum). */
function checksum(orders) {
  let sum = 0;
  for (const o of orders) sum += Number(o.total);
  return { rows: orders.length, sum };
}

const f = (x, d = 2) => x.toFixed(d);
const row = (k, x, y) => console.log(`${k.padEnd(13)}|${String(x).padStart(12)} |${String(y).padStart(11)}`);
const label = (t) => console.log(`== ${t} ==`);

/**
 * In một câu SQL Prisma sinh ra, rút gọn cho vừa khung ảnh dọc.
 * Rút gọn theo ĐÚNG 3 luật máy móc (không sửa tay, không viết lại câu):
 *   1. bỏ tiền tố schema `"public".`
 *   2. thay danh sách cột giữa SELECT và FROM bằng `...` (dài, không phải điểm nhấn)
 *   3. bỏ dấu nháy kép quanh tên bảng/cột
 * Mệnh đề WHERE — thứ phân biệt hai nhánh — giữ NGUYÊN VĂN.
 * Câu đầy đủ chưa rút gọn được chép vào report.
 */
function showSql(tag, e, maxLines = 2) {
  const one = e.query.replace(/\s+/g, ' ').trim()
    .replaceAll('"public".', '')
    .replace(/^SELECT .*? FROM /, 'SELECT ... FROM ')
    .replaceAll('"', '');
  const W = 43; // 3 ký tự nhãn + 1 + 43 = 47, dưới trần ~50 ký tự của khung dọc
  const lines = [];
  for (let i = 0; i < one.length && lines.length < maxLines; i += W) lines.push(one.slice(i, i + W));
  if (one.length > W * maxLines) lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, W - 1)}…`;
  console.log(`${tag} ${lines[0]}`);
  for (const l of lines.slice(1)) console.log(`${' '.repeat(tag.length)} ${l}`);
}

// --------------------------------------------------------------------------
// WARM-UP: query mồi — mở kết nối + bắn hết query khởi tạo/hạ tầng. Không tính.
await p.customer.findMany({ take: 1 });
await drain();
const warmCount = bucket('warm').length;

// Làm nóng cache cả hai nhánh (vẫn trong pha 'warm', vẫn không tính) để chênh ms
// đến từ SỐ LƯỢT ĐI–VỀ chứ không phải lần đọc đĩa đầu tiên.
await nPlusOne();
await withInclude();
await drain();
const warmTotal = bucket('warm').length;

phase = 'A';
const a = await nPlusOne();
await drain();
phase = 'B';
const b = await withInclude();
await drain();
phase = 'done';

const qa = business('A');
const qb = business('B');
const infraA = bucket('A').length - qa.length;
const infraB = bucket('B').length - qb.length;
const ka = checksum(a.orders);
const kb = checksum(b.orders);

label(`P1: ${qa.length} query vs ${qb.length} query`);
console.log(`${TAKE} khách đầu + đơn của họ · Prisma 6.19.3`);
console.log(`=> warm-up: ${warmTotal} query bị LOẠI khỏi phép đếm`);
console.log(`   (${warmCount} lúc khởi tạo + ${warmTotal - warmCount} lượt làm nóng)`);
console.log('');

console.log('[A] N+1: findMany(20) + 20 lần order.findMany');
console.log(`  SỐ QUERY THẬT: ${qa.length} · TỔNG ${f(a.ms)} ms`);
console.log('');
console.log('[B] include: { orders: true }');
console.log(`  SỐ QUERY THẬT: ${qb.length} · TỔNG ${f(b.ms)} ms`);
if (infraA || infraB) console.log(`  (đã loại ${infraA + infraB} câu hạ tầng)`);
console.log('');

label('SQL Prisma sinh ra (bỏ cột, giữ WHERE)');
console.log('A#2 = 1 trong 20 lượt · B#2 = query con');
showSql('A#2', qa[1]);
showSql('B#2', qb[qb.length - 1], 3);
console.log('');

label('cùng dữ liệu? checksum trong JS');
row('', 'N+1 (A)', 'include(B)');
row('dòng đơn', ka.rows, kb.rows);
row('tổng total', ka.sum, kb.sum);
const same = ka.rows === kb.rows && ka.sum === kb.sum;
console.log(same
  ? '=> KHỚP TỪNG SỐ: một tập dữ liệu, hai cách gọi'
  : '=> LỆCH! hai nhánh KHÔNG cùng dữ liệu');
console.log('');

label('bảng so sánh');
row('', 'N+1 (A)', 'include(B)');
row('số query', qa.length, qb.length);
row('tổng ms', f(a.ms), f(b.ms));
console.log(`=> ORM giấu query: code trông như 1 vòng for,`);
console.log(`   bật log mới thấy ${qa.length} lượt đi-về thật`);
console.log(`=> include gộp còn ${qb.length} query (cha + con) và`);
console.log('   KHÔNG tăng theo số khách — 200 khách vẫn 2');
console.log(`=> cùng bệnh câu #43/D3 ở tầng SQL (51 vs 1):`);
console.log('   ORM chỉ làm nó VÔ HÌNH, không làm nó biến mất');

await p.$disconnect();
