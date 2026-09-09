// P3 (ep89) — `$transaction`: nửa vời vs rollback sạch.
//
//   cd demo-db-interview/prisma-qa && node p3.mjs
//
// Nghiệp vụ 2 bước, DÙNG CHUNG một hàm `twoSteps()` cho cả hai nhánh:
//   b1. customer.create({ name:'P3 demo', city:'Hue' })
//   b2. order.create({ customerId: <id vừa tạo>, total: 2147483648, ... })  <- CỐ TÌNH LỖI
// 2147483648 = int4 max (2147483647) + 1 → bước 2 chắc chắn hỏng, mọi lần chạy.
//
//   [A] gọi thẳng `p` (2 lệnh rời)                 -> b1 đã ghi, b2 lỗi = DỮ LIỆU NỬA VỜI
//   [B] `p.$transaction(async tx => twoSteps(tx))` -> b2 lỗi = ROLLBACK cả b1
//
// Vì sao dạng INTERACTIVE chứ không phải `$transaction([...])`: bước 2 cần `id` do bước 1
// sinh ra. Dạng mảng nhận các PrismaPromise DỰNG SẴN nên không thể tham chiếu kết quả của
// thao tác trước — kịch bản này bắt buộc dùng dạng callback.
//
// CÁCH ĐO (không hardcode số nào):
//   - count: `customer.count()` / `order.count()` thật, gọi TRƯỚC và SAU từng nhánh.
//   - lỗi: bắt object lỗi thật, in `name` + `code` + `message` (rút gọn bằng luật máy móc
//     nêu trong `shortErr`); message đầy đủ chép vào report.
//   - BEGIN/ROLLBACK: lấy từ log sự kiện `log:[{emit:'event',level:'query'}]` + `$on('query')`
//     gom theo pha, `drain()` 100ms giữa hai pha (sự kiện bắn SAU khi promise resolve —
//     bẫy đã gặp ở P1/P2). Không chép tay câu nào.
//
// ⚠️ ĐÂY LÀ SCRIPT CÓ GHI DỮ LIỆU. Khối `finally` xóa mọi customer tên 'P3 demo' (kể cả rác
// của một lần chạy trước bị crash) rồi in lại count để chứng minh DB về đúng 5000/500000.
import { PrismaClient } from '@prisma/client';

const MARK = 'P3 demo';
const CITY = 'Hue';
const INT4_MAX = 2147483647;
const BAD_TOTAL = INT4_MAX + 1; // 2147483648 — vượt int4 đúng 1 đơn vị

const p = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

// --- gom SQL thật Prisma gửi xuống Postgres, theo pha ----------------------
let phase = 'off';
const events = [];
p.$on('query', (e) => {
  if (phase !== 'off') events.push({ phase, query: e.query });
});
const drain = () => new Promise((r) => setTimeout(r, 100));

/** Rút một câu SQL về "ĐỘNG TỪ + bảng" bằng luật máy móc, để 4-5 câu vừa 1 dòng ảnh. */
function brief(q) {
  const s = q.replace(/\s+/g, ' ').trim();
  if (/^(BEGIN|COMMIT|ROLLBACK)\b/i.test(s)) return s.split(' ')[0].toUpperCase();
  const m = s.match(/^(\w+)(?: INTO| FROM)? "public"\."(\w+)"/);
  return m ? `${m[1]} ${m[2]}` : s.slice(0, 24);
}
const sqlOf = (ph) => events.filter((e) => e.phase === ph).map((e) => brief(e.query));

// --- NGHIỆP VỤ: một hàm duy nhất, hai nhánh chỉ khác CÁI VỎ ----------------
/** @param client `p` (không transaction) hoặc `tx` (trong transaction) */
async function twoSteps(client, out) {
  const c = await client.customer.create({ data: { name: MARK, city: CITY } });
  out.id = c.id; // bước 1 đã xong — ghi lại id để chứng minh nó có thật
  await client.order.create({
    data: { customerId: c.id, total: BAD_TOTAL, status: 'paid', createdAt: new Date() },
  });
  out.ok = true;
}

// --- in ấn (cùng nhà với p1/p2) -------------------------------------------
const label = (t) => console.log(`== ${t} ==`);
const line = (k, a, b, c) =>
  console.log(
    `${k.padEnd(10)}|${String(a).padStart(7)} |${String(b).padStart(6)} |${String(c).padStart(7)}`,
  );

/** In một dòng chú giải `=>`, tự bẻ dòng THEO TỪ cho vừa khung ảnh dọc. */
function bullet(text, W = 47) {
  const out = [];
  let cur = '=>';
  for (const w of text.split(' ')) {
    if (`${cur} ${w}`.length > W && cur.trim() !== '=>') {
      out.push(cur);
      cur = '  ';
    }
    cur += ` ${w}`;
  }
  out.push(cur);
  for (const l of out) console.log(l);
}

/** Bẻ dòng theo TỪ, giữ NGUYÊN VĂN chữ; `pad` thụt các dòng NỐI (không thụt dòng đầu). */
function wrapWords(text, W = 47, pad = '') {
  let cur = '';
  let first = true;
  for (const w of text.split(' ')) {
    if (cur && `${first ? '' : pad}${cur} ${w}`.length > W) {
      console.log((first ? '' : pad) + cur);
      first = false;
      cur = '';
    }
    cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) console.log((first ? '' : pad) + cur);
}

/**
 * Rút gọn message lỗi cho vừa ảnh — LUẬT MÁY MÓC, không viết lại chữ nào:
 *   1. gộp mọi khoảng trắng/xuống dòng thành 1 dấu cách;
 *   2. giữ nguyên dòng `Invalid `...` invocation:` và câu `Error occurred ...` nếu có;
 *   3. nếu message có lõi `ConversionError("…")` thì chỉ giữ lõi đó, bỏ vỏ
 *      `ConnectorError { user_facing_error: None, kind: ... transient: false }`.
 * Message ĐẦY ĐỦ (chưa rút gọn) được chép vào report.
 */
function shortErr(e) {
  const one = e.message.replace(/\s+/g, ' ').trim();
  const head = one.match(/^Invalid `[^`]+` invocation:/);
  const conv = one.match(/ConversionError\("[^"]*"\)/);
  const parts = [];
  if (head) parts.push(head[0]);
  if (/Error occurred during query execution:/.test(one)) {
    parts.push('Error occurred during query execution:');
  }
  if (conv) parts.push(conv[0]);
  else parts.push(head ? one.slice(head[0].length).trim() : one);
  return parts;
}

// ==========================================================================
let delCount = -1;
try {
  const before = { c: await p.customer.count(), o: await p.order.count() };

  // ---- [A] KHÔNG transaction: hai lệnh rời ------------------------------
  phase = 'A';
  const outA = { id: null, ok: false };
  let errA = null;
  try {
    await twoSteps(p, outA);
  } catch (e) {
    errA = e;
  }
  await drain();
  phase = 'off';
  const midA = { c: await p.customer.count(), o: await p.order.count() };

  // ---- [B] $transaction interactive -------------------------------------
  phase = 'B';
  const outB = { id: null, ok: false };
  let errB = null;
  try {
    await p.$transaction(async (tx) => twoSteps(tx, outB));
  } catch (e) {
    errB = e;
  }
  await drain();
  phase = 'off';
  const midB = { c: await p.customer.count(), o: await p.order.count() };

  // ---- in kết quả -------------------------------------------------------
  label('P3: nửa vời vs rollback sạch');
  console.log('b1 customer.create · b2 order.create(customerId)');
  console.log(`b2 lỗi: total ${BAD_TOTAL} > int4 max ${INT4_MAX}`);
  console.log('');

  console.log('[A] KHÔNG transaction — 2 lệnh rời');
  console.log(`  customers TRƯỚC ${before.c} · b1 tạo id=${outA.id}`);
  console.log(`  b2 ${errA ? 'FAIL' : 'OK?!'} · customers SAU ${midA.c} <- TĂNG 1`);
  bullet('khách có thật, đơn thì không: NỬA VỜI');
  console.log('');

  console.log('[B] $transaction(async tx => ...) interactive');
  console.log(`  customers TRƯỚC ${midA.c} · b1 tạo id=${outB.id}`);
  console.log(`  b2 ${errB ? 'FAIL' : 'OK?!'} · customers SAU ${midB.c} <- KHÔNG ĐỔI`);
  bullet('bước 1 bị ROLLBACK theo: KHÔNG để lại rác');
  console.log('');

  label('lỗi b2 (rút gọn: bỏ vỏ ConnectorError)');
  for (const part of shortErr(errA)) wrapWords(part);
  console.log(`${errA?.name} · mã: ${errA?.code ?? 'không có'}`);
  bullet(
    `[B] lỗi ${errB?.message === errA?.message ? 'Y HỆT' : 'KHÁC'}` +
      (/ToSql/.test(errA?.message ?? '') ? ' · chặn ở driver (kind:ToSql)' : ''),
  );
  console.log('');

  label('Prisma gửi gì xuống DB (log query)');
  wrapWords(`A ${sqlOf('A').join(' | ')}`, 47, '  ');
  wrapWords(`B ${sqlOf('B').join(' | ')}`, 47, '  ');
  console.log('');

  line('nhánh', 'trước', 'sau', 'rác?');
  line('[A] rời', before.c, midA.c, errA ? 'CÓ' : '-');
  line('[B] tx', midA.c, midB.c, midB.c === midA.c ? 'KHÔNG' : 'CÓ');
  console.log(`orders ${before.o} -> ${midB.o} ở CẢ hai nhánh`);
  bullet(
    `transaction = tất cả hoặc không gì; chỉ [B] có ${sqlOf('B')[0]}...${sqlOf('B').at(-1)} trong log`,
  );
  bullet('bẫy: 2 lệnh trong 1 hàm KHÔNG phải transaction; Promise.all cũng không');
} finally {
  // ---- DỌN: bắt buộc, kể cả khi trên kia ném lỗi -------------------------
  label('dọn');
  delCount = (await p.customer.deleteMany({ where: { name: MARK } })).count;
  const end = { c: await p.customer.count(), o: await p.order.count() };
  const clean = end.c === 5000 && end.o === 500000;
  console.log(
    `xóa ${delCount} rác · customers=${end.c} orders=${end.o} ${clean ? 'SẠCH' : 'CÒN RÁC!'}`,
  );
  await p.$disconnect();
}
