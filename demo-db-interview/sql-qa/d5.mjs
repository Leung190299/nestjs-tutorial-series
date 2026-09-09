// D5 (ep85) — Deadlock THẬT: hai transaction giữ khóa dòng CHÉO nhau.
//
//   node d5.mjs
//
// Hai phiên, mỗi phiên một `pg.Client` RIÊNG (KHÔNG dùng pool chung — pool có thể
// trả về connection khác nhau giữa các câu, làm hỏng hẳn khái niệm "transaction
// của phiên A"). Kịch bản kinh điển trong docs `explicit-locking`:
//
//   [A] BEGIN; UPDATE id=1   -> A giữ khóa dòng 1
//   [B] BEGIN; UPDATE id=2   -> B giữ khóa dòng 2
//   [A] UPDATE id=2          -> CHẶN, chờ khóa của B   (gửi đi, KHÔNG await)
//   [B] UPDATE id=1          -> CHẶN, chờ khóa của A   (gửi đi, KHÔNG await)
//   => vòng chờ khép kín. Postgres đợi hết `deadlock_timeout` rồi kiểm tra đồ thị
//      chờ, phát hiện chu trình và HỦY một phiên với SQLSTATE 40P01.
//
// Điều phối: hai câu bị chặn được gửi bằng Promise KHÔNG await, mọi mốc thời gian
// đều in ra (t=...) tính từ lúc câu chặn đầu tiên rời khỏi client. Chỉ có ĐÚNG MỘT
// chỗ chờ nhân tạo — 200ms để chắc chắn câu của A đã tới server và vào hàng đợi
// khóa trước khi B gửi câu của mình — và mốc đó cũng được IN RA, không sleep chùa.
//
// Script GHI dữ liệu (mỗi phiên +1 vào orders.total), nên nó LƯU total gốc của cả
// hai dòng ở đầu và KHÔI PHỤC trong `finally` — chạy lại bao nhiêu lần cũng ra
// cùng một pattern, và không để sót transaction treo (ROLLBACK cả hai phiên).
import pg from 'pg';
import { CONNECTION_STRING } from './db.mjs';

const ROW_A = 1; // dòng phiên A khóa trước
const ROW_B = 2; // dòng phiên B khóa trước
const SETTLE_MS = 200; // chờ cho câu bị chặn của A chắc chắn vào hàng đợi khóa
const WRAP = 39; // bề rộng phần nội dung khi xuống dòng (khung ảnh dọc)

const SQL_BUMP = 'UPDATE orders SET total = total + 1 WHERE id = $1';
const SQL_READ = 'SELECT total FROM orders WHERE id = $1';
const SQL_SET = 'UPDATE orders SET total = $2 WHERE id = $1';

const now = () => performance.now();
const fmt = (ms) => `${Math.round(ms)}ms`;

async function readTotal(client, id) {
  const { rows } = await client.query(SQL_READ, [id]);
  if (rows.length === 0) throw new Error(`không có orders id=${id}`);
  return Number(rows[0].total);
}

/** In một trường của object lỗi NGUYÊN VĂN, xuống dòng có thụt lề cho vừa khung dọc. */
function field(name, value) {
  const head = `${name.padEnd(7)}: `;
  const pad = ' '.repeat(head.length);
  const lines = [];
  for (const para of String(value ?? '(không có)').split('\n')) {
    let line = '';
    for (const w of para.split(/\s+/).filter(Boolean)) {
      if (line && `${line} ${w}`.length > WRAP) {
        lines.push(line);
        line = w;
      } else line = line ? `${line} ${w}` : w;
    }
    lines.push(line);
  }
  lines.forEach((l, i) => console.log((i === 0 ? head : pad) + l));
}

/** Bọc một promise query để KHÔNG bao giờ throw — trả về kết quả đã phân loại. */
const settle = (p) => p.then(() => ({ ok: true }), (e) => ({ ok: false, e }));

// --------------------------------------------------------------------------
const a = new pg.Client({ connectionString: CONNECTION_STRING });
const b = new pg.Client({ connectionString: CONNECTION_STRING });
await a.connect();
await b.connect();

const origA = await readTotal(a, ROW_A);
const origB = await readTotal(a, ROW_B);
const { rows: dt } = await a.query('SHOW deadlock_timeout');

console.log('== D5: deadlock detected ==');
console.log(`orders total gốc: id=${ROW_A} ${origA} · id=${ROW_B} ${origB}`);
console.log(`SHOW deadlock_timeout -> ${dt[0].deadlock_timeout}`);
console.log('');

try {
  await a.query('BEGIN');
  await a.query(SQL_BUMP, [ROW_A]);
  console.log(`[A] BEGIN; UPDATE id=${ROW_A} (+1) · giữ khóa dòng ${ROW_A}`);

  await b.query('BEGIN');
  await b.query(SQL_BUMP, [ROW_B]);
  console.log(`[B] BEGIN; UPDATE id=${ROW_B} (+1) · giữ khóa dòng ${ROW_B}`);

  // Từ đây là hai câu BỊ CHẶN — gửi đi rồi mới in mốc, không await ngay.
  const t0 = now();
  const waitA = settle(a.query(SQL_BUMP, [ROW_B]));
  console.log(`[A] UPDATE id=${ROW_B} gửi đi, không await (t=${fmt(now() - t0)})`);

  console.log(`    chờ ${SETTLE_MS}ms cho A chắc chắn vào hàng chờ khóa`);
  await new Promise((r) => setTimeout(r, SETTLE_MS));

  const waitB = settle(b.query(SQL_BUMP, [ROW_A]));
  console.log(`[B] UPDATE id=${ROW_A} gửi đi (t=${fmt(now() - t0)}) -> chờ chéo`);

  const [resA, resB] = await Promise.all([waitA, waitB]);
  const elapsed = now() - t0;
  console.log('');

  let victim = null;
  let survivor = null;
  if (!resA.ok && resB.ok) [victim, survivor] = ['A', 'B'];
  else if (resA.ok && !resB.ok) [victim, survivor] = ['B', 'A'];

  if (!victim) {
    // Không phải kịch bản mong đợi — in SỰ THẬT thay vì giả vờ thành công.
    console.log(`-- sau ${fmt(elapsed)}: KHÔNG có deadlock đúng 1 nạn nhân --`);
    console.log(`[A] ok=${resA.ok} · [B] ok=${resB.ok}`);
    if (!resA.ok) field('A.error', resA.e.message);
    if (!resB.ok) field('B.error', resB.e.message);
  } else {
    const err = victim === 'A' ? resA.e : resB.e;
    console.log(`-- sau ${fmt(elapsed)} Postgres phát hiện deadlock --`);
    console.log(`[${victim}] BỊ HỦY · [${survivor}] chạy tiếp`);
    field('code', err.code);
    field('message', err.message);
    field('detail', err.detail);
    field('hint', err.hint);

    // Phiên bị hủy đang ở trạng thái transaction hỏng: phải ROLLBACK cho sạch khóa.
    await (victim === 'A' ? a : b).query('ROLLBACK');
    await (survivor === 'A' ? a : b).query('COMMIT');
    console.log('');
    console.log(`[${victim}] ROLLBACK · [${survivor}] COMMIT OK`);

    const nowA = await readTotal(a, ROW_A);
    const nowB = await readTotal(a, ROW_B);
    const delta = (o, n) => (n === o ? 'không đổi' : `${n > o ? '+' : ''}${n - o}`);
    console.log('-- trạng thái 2 dòng --');
    console.log(`id=${ROW_A} ${origA} -> ${nowA} (${delta(origA, nowA)})`);
    console.log(`id=${ROW_B} ${origB} -> ${nowB} (${delta(origB, nowB)})`);
  }
} finally {
  // Dọn sạch: phiên nào còn transaction treo cũng bị ROLLBACK, rồi trả 2 dòng về gốc.
  for (const c of [a, b]) {
    try {
      await c.query('ROLLBACK');
    } catch {
      /* ngoài transaction: Postgres chỉ cảnh báo, bỏ qua */
    }
  }
  await a.query(SQL_SET, [ROW_A, origA]);
  await a.query(SQL_SET, [ROW_B, origB]);
  const backA = await readTotal(b, ROW_A);
  const backB = await readTotal(b, ROW_B);
  console.log('');
  console.log('== khôi phục ==');
  console.log(`id=${ROW_A} -> ${backA} · id=${ROW_B} -> ${backB}`
    + (backA === origA && backB === origB ? ' · OK' : ' · HỎNG!'));
}

console.log('');
console.log('=> deadlock = 2 giao dịch giữ khóa chéo, mỗi');
console.log('   bên chờ đúng dòng bên kia đang giữ');
console.log('=> Postgres tự phát hiện sau deadlock_timeout');
console.log('   rồi hủy MỘT nạn nhân, phiên kia chạy tiếp');
console.log('=> tránh: khóa theo THỨ TỰ nhất quán (id tăng');
console.log('   dần) + transaction ngắn + retry khi 40P01');

await a.end();
await b.end();
