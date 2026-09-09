// D3 (ep83) — N+1 ở tầng SQL: 51 query nhỏ vs 1 câu JOIN, trên orders 500.000 dòng.
//
//   node d3.mjs
//
// Kịch bản: cần 50 khách đầu (ORDER BY id LIMIT 50) KÈM đơn hàng của họ.
//   [A] N+1  : 1 query lấy danh sách khách + vòng lặp 50 query WHERE customer_id=$1
//   [B] JOIN : đúng 1 query, DB tự ghép
//
// Script CHỈ ĐỌC: không tạo/xóa index, không ghi dữ liệu. Index `idx_orders_customer`
// (do D1 tạo) được dùng ở CẢ HAI nhánh — đây là chủ ý: so sánh phải công bằng, N+1
// cũng phải được index phục vụ, nếu không thì đang so index vs không-index chứ không
// phải N+1 vs JOIN.
//
// TRUNG THỰC: đo trên localhost nên round-trip gần như miễn phí — đó là kịch bản
// TỐT NHẤT cho N+1. Script in đúng con số đo được, không suy diễn số "production".
import { pool, q, label } from './db.mjs';

const LIMIT = 50;
const SQL_CUSTOMERS = 'SELECT id, name, city FROM customers ORDER BY id LIMIT $1';
const SQL_ORDERS_OF = 'SELECT id, customer_id, total, status, created_at FROM orders WHERE customer_id = $1';
const SQL_JOIN = `SELECT c.id AS cust_id, c.name, c.city,
       o.id, o.customer_id, o.total, o.status, o.created_at
FROM (SELECT id, name, city FROM customers ORDER BY id LIMIT $1) c
JOIN orders o ON o.customer_id = c.id`;

/** Bộ đếm query THẬT: mọi lần gửi câu lệnh xuống Postgres đều đi qua đây. */
function counter() {
  const state = { queries: 0, ms: 0, each: [] };
  return {
    state,
    async run(sql, params) {
      const r = await q(sql, params);
      state.queries += 1;
      state.ms += r.ms;
      state.each.push(r.ms);
      return r.rows;
    },
  };
}

/** [A] N+1: 1 query danh sách + N query chi tiết. Trả cả rows lẫn số đo. */
async function nPlusOne() {
  const c = counter();
  const customers = await c.run(SQL_CUSTOMERS, [LIMIT]);
  const msList = c.state.ms; // ms của riêng query danh sách
  const orders = [];
  for (const cus of customers) {
    const rows = await c.run(SQL_ORDERS_OF, [cus.id]);
    orders.push(...rows);
  }
  return { ...c.state, msList, customers, orders };
}

/** [B] JOIN: đúng 1 query lấy cùng chừng ấy dữ liệu. */
async function joined() {
  const c = counter();
  const rows = await c.run(SQL_JOIN, [LIMIT]);
  // Tách lại thành "đơn" để checksum so được với nhánh A (cùng cách tính).
  const orders = rows.map((r) => ({
    id: r.id, customer_id: r.customer_id, total: r.total,
    status: r.status, created_at: r.created_at,
  }));
  return { ...c.state, orders };
}

/** Checksum tính TRONG JS từ kết quả trả về (không nhờ SQL tính hộ). */
function checksum(orders) {
  let sum = 0;
  const custs = new Set();
  for (const o of orders) {
    sum += Number(o.total);
    custs.add(o.customer_id);
  }
  return { rows: orders.length, sum, custs: custs.size };
}

const f = (x, d = 1) => x.toFixed(d);
const row = (k, x, y) => console.log(`${k.padEnd(13)}|${String(x).padStart(12)} |${String(y).padStart(12)}`);

// --------------------------------------------------------------------------
// Làm nóng cache CẢ HAI nhánh trước khi đo, để chênh lệch đến từ SỐ LƯỢT ĐI–VỀ
// chứ không phải từ lần đọc đĩa đầu tiên.
await nPlusOne();
await joined();

const a = await nPlusOne();
const b = await joined();

const ka = checksum(a.orders);
const kb = checksum(b.orders);

// Index đang có trên orders (đọc thật, không hardcode).
const { rows: idx } = await q(
  "SELECT indexname FROM pg_indexes WHERE tablename = 'orders' AND indexname <> 'orders_pkey' ORDER BY 1",
);

const small = a.each.slice(1); // 50 query chi tiết, bỏ query danh sách
const smallAvg = small.reduce((s, x) => s + x, 0) / small.length;
const smallMin = Math.min(...small);
const smallMax = Math.max(...small);

label(`D3: ${a.queries} query vs ${b.queries} query`);
console.log(`${LIMIT} khách đầu (ORDER BY id LIMIT ${LIMIT}) + đơn của họ`);
console.log(`=> ${ka.rows} dòng đơn · index: ${idx.map((r) => r.indexname).join(', ')}`);
console.log('');

console.log('[A] N+1: 1 query danh sách + 50 query chi tiết');
console.log(`  #1 SELECT ... FROM customers LIMIT 50: ${f(a.msList, 2)} ms`);
console.log(`  #2..#${a.queries} SELECT ... WHERE customer_id=$1`);
console.log(`     mỗi query nhỏ tb ${f(smallAvg, 2)} ms (${f(smallMin, 2)}-${f(smallMax, 2)})`);
console.log(`  SỐ QUERY THẬT: ${a.queries} · TỔNG ${f(a.ms, 2)} ms`);
console.log('');

console.log('[B] JOIN: 1 query duy nhất, DB tự ghép');
console.log(`  SỐ QUERY THẬT: ${b.queries} · TỔNG ${f(b.ms, 2)} ms`);
console.log('');

label('cùng dữ liệu? checksum tính trong JS');
row('', 'N+1 (A)', 'JOIN (B)');
row('dòng đơn', ka.rows, kb.rows);
row('tổng total', ka.sum, kb.sum);
row('khách có đơn', ka.custs, kb.custs);
const same = ka.rows === kb.rows && ka.sum === kb.sum && ka.custs === kb.custs;
console.log(same
  ? '=> KHỚP TỪNG SỐ: hai cách viết, một tập dữ liệu'
  : '=> LỆCH! hai nhánh KHÔNG cùng dữ liệu — xem lại SQL');
console.log('');

label('bảng so sánh');
row('', 'N+1 (A)', 'JOIN (B)');
row('số query', a.queries, b.queries);
row('tổng ms', f(a.ms, 2), f(b.ms, 2));
const gain = a.ms / b.ms;
console.log(`=> JOIN nhanh hơn ${f(gain)}x với 1/${a.queries} số query`);
console.log(`=> mỗi query nhỏ chỉ ${f(smallAvg, 2)} ms, nhưng ${a.queries} lượt`);
console.log('   đi-về cộng dồn mới là thứ giết hiệu năng');
console.log(`=> đo trên localhost, round-trip gần như miễn phí:`);
console.log(`   đã chênh ${f(gain)} lần — qua mạng thật còn tệ hơn`);
console.log('=> JOIN để DB làm việc nó giỏi: ghép ngay tại chỗ,');
console.log('   trả về đúng một lần');

await pool.end();
