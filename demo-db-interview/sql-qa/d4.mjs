// D4 (ep84) — Isolation: READ COMMITTED vs REPEATABLE READ trên CÙNG một câu SELECT.
//
//   node d4.mjs
//
// Hai phiên SONG SONG, mỗi phiên một `pg.Client` RIÊNG (KHÔNG dùng pool chung —
// pool có thể trả về connection khác nhau giữa các câu, làm hỏng hẳn khái niệm
// "transaction của phiên A"). Điều phối bằng await tuần tự: mỗi bước chỉ chạy sau
// khi bước trước đã trả lời xong, nên KHÔNG cần sleep và không có chỗ nào flaky.
//
// Vòng 1 (mặc định = READ COMMITTED): A đọc → B ghi+COMMIT → A đọc LẠI.
// Vòng 2 (REPEATABLE READ):           y hệt, chỉ đổi mức isolation ở BEGIN của A.
//
// Script GHI dữ liệu (B cộng 1000 vào orders.total của 1 dòng), nên nó LƯU total
// gốc ở đầu và KHÔI PHỤC ở cuối (kể cả khi lỗi) — chạy lại bao nhiêu lần cũng ra
// cùng một pattern.
import pg from 'pg';
import { CONNECTION_STRING } from './db.mjs';

const ORDER_ID = 1;
const BUMP = 1000;

const SQL_READ = 'SELECT total FROM orders WHERE id = $1';
const SQL_BUMP = 'UPDATE orders SET total = total + $2 WHERE id = $1 RETURNING total';

/** Đọc total hiện tại (ngoài transaction). */
async function readTotal(client) {
  const { rows } = await client.query(SQL_READ, [ORDER_ID]);
  if (rows.length === 0) throw new Error(`không có orders id=${ORDER_ID}`);
  return Number(rows[0].total);
}

/**
 * Một vòng diễn: A mở transaction ở mức `beginSql`, đọc 2 lần, ở giữa B ghi + COMMIT.
 * Trả về các giá trị ĐỌC ĐƯỢC THẬT (không kỳ vọng, không hardcode).
 */
async function round(no, a, b, beginSql, isoLabel) {
  console.log(`-- VÒNG ${no}: ${isoLabel} --`);

  await a.query(beginSql);
  console.log(`[phiên A] ${beginSql}`);

  // Chứng minh mức isolation THẬT đang dùng, hỏi chính server chứ không tin chuỗi trên.
  const { rows: iso } = await a.query('SHOW transaction_isolation');
  const actualIso = iso[0].transaction_isolation;
  console.log(`  SHOW transaction_isolation -> ${actualIso}`);

  const first = await readTotal(a);
  console.log(`[phiên A] SELECT total (lần 1) -> ${first}`);

  const { rows: upd } = await b.query(SQL_BUMP, [ORDER_ID, BUMP]);
  const bValue = Number(upd[0].total);
  console.log(`[phiên B] UPDATE total = total+${BUMP}`);
  await b.query('COMMIT');
  console.log(`[phiên B] COMMIT xong -> ${bValue}`);

  const second = await readTotal(a);
  console.log(`[phiên A] SELECT total (lần 2) -> ${second}`);

  await a.query('COMMIT');
  console.log('[phiên A] COMMIT');

  const changed = first !== second;
  console.log(changed
    ? `=> lần 1 ${first} != lần 2 ${second}: ĐỔI`
    : `=> lần 1 ${first} == lần 2 ${second}: GIỮ`);
  console.log('');

  return { iso: actualIso, first, second, changed, bValue };
}

// --------------------------------------------------------------------------
const a = new pg.Client({ connectionString: CONNECTION_STRING });
const b = new pg.Client({ connectionString: CONNECTION_STRING });
await a.connect();
await b.connect();

// B mở sẵn transaction cho vòng 1 (mỗi vòng B sẽ BEGIN lại sau khi COMMIT).
const original = await readTotal(a);
const { rows: dft } = await a.query('SHOW default_transaction_isolation');

let r1;
let r2;
try {
  console.log(`== D4: cùng câu SELECT, 2 kết quả ==`);
  console.log(`orders id=${ORDER_ID} · total gốc ${original}`);
  console.log(`default_transaction_isolation: ${dft[0].default_transaction_isolation}`);
  console.log('');

  await b.query('BEGIN');
  r1 = await round(1, a, b, 'BEGIN', 'READ COMMITTED (mặc định)');

  await b.query('BEGIN');
  r2 = await round(2, a, b, 'BEGIN ISOLATION LEVEL REPEATABLE READ', 'REPEATABLE READ');
} finally {
  // KHÔI PHỤC: đưa total về đúng giá trị gốc để chạy lại vẫn ra cùng pattern.
  await b.query('UPDATE orders SET total = $2 WHERE id = $1', [ORDER_ID, original]);
  const back = await readTotal(b);
  console.log('== khôi phục ==');
  console.log(`total id=${ORDER_ID} -> ${original} · đọc lại ${back}`
    + (back === original ? ' · OK' : ' · HỎNG!'));
  console.log('');
}

console.log('== tổng kết 2 vòng ==');
for (const [n, r] of [[1, r1], [2, r2]]) {
  console.log(`vòng ${n} ${r.iso.padEnd(15)}: ${r.first} -> ${r.second} ${r.changed ? 'ĐỔI' : 'GIỮ'}`);
}
console.log('');
console.log('=> READ COMMITTED: mỗi CÂU LỆNH chụp ảnh mới nên');
console.log('   thấy ngay dữ liệu phiên khác vừa commit');
console.log('=> REPEATABLE READ: chụp ảnh MỘT LẦN ở câu đầu');
console.log('   của transaction, đọc lại vẫn ra giá trị cũ');
console.log('=> cùng 1 câu SELECT, 2 kết quả: khác ở mức');
console.log('   isolation, không ở dữ liệu');

await a.end();
await b.end();
