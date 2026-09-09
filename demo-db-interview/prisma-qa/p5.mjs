// P5 (ep91) — Connection pool: pool 2 vs pool 20 vs pool cạn (P2024).
//
//   cd demo-db-interview/prisma-qa && node p5.mjs
//   (stdout = đúng nội dung ảnh; stderr = message lỗi ĐẦY ĐỦ để chép vào report)
//
// 3 nhánh, mỗi nhánh MỘT PrismaClient RIÊNG (pool chỉ cấu hình được lúc tạo client,
// qua query param trên URL — nên không thể đổi pool của một client đang chạy):
//   [A] ?connection_limit=2&pool_timeout=10  -> 20 query chia thành 10 lượt ≈ 3s
//   [B] ?connection_limit=20                 -> 20 query 1 lượt      ≈ 0.3s
//   [C] ?connection_limit=1&pool_timeout=1   -> ÉP LỖI P2024
// Mỗi client đều `$disconnect()` trong `finally` của riêng nó (`withClient`), nếu không
// thì connection của nhánh trước còn treo và làm sai số đo cao điểm của nhánh sau.
//
// TẢI: 20 × `SELECT 1 AS ok FROM pg_sleep(0.3)` bắn qua `Promise.all` + `$queryRaw`.
// ⚠️ ĐO THẬT: `SELECT pg_sleep(0.3)` TRƠN (như plan viết) KHÔNG chạy được qua $queryRaw —
// Prisma 6.19.3 ném P2010 `Failed to deserialize column of type 'void'`. pg_sleep trả
// `void`, Prisma không giải mã được cột đó. Hai cách vá đều đo được: `pg_sleep(0.3)::text`
// hoặc gọi trong FROM — chọn `SELECT 1 AS ok FROM pg_sleep(0.3)` vì đọc rõ ý "1 dòng".
//
// CÁCH ĐO SỐ KẾT NỐI THẬT (không tin con số cấu hình, đo con số Postgres thấy):
//   - Mỗi client mang `application_name` riêng trên URL (`p5A`/`p5B`/`p5C`) —
//     Prisma 6 hỗ trợ tham số này và Postgres ghi đúng vào `pg_stat_activity`.
//   - Một client GIÁM SÁT thứ 4 (`application_name=p5mon`, `connection_limit=1`) poll
//     40ms/lần: `SELECT count(*) FROM pg_stat_activity WHERE datname='dbqa'
//     AND application_name='p5A'`. Lọc theo application_name nên client giám sát
//     KHÔNG tự đếm mình, và cũng không đếm lẫn connection của psql / sql-qa nếu còn mở.
//   - Lấy MAX các mẫu poll = "kết nối cao điểm".
//
// Script này KHÔNG GHI GÌ (chỉ SELECT + pg_sleep). Cuối cùng in `order.count()` để chứng
// minh 500.000 đơn còn nguyên.
import { PrismaClient } from '@prisma/client';

const BASE = 'postgres://dbqa:dbqa@localhost:5433/dbqa';
const N = 20; // số query song song
const SLEEP = 0.3; // giây mỗi query
const LOAD = `SELECT 1 AS ok FROM pg_sleep(${SLEEP})`;
const POLL_MS = 40;

const url = (app, params) => `${BASE}?application_name=${app}&${params}`;
const mk = (app, params) =>
  new PrismaClient({ datasources: { db: { url: url(app, params) } } });

/** Tạo client, chạy fn, LUÔN $disconnect() — kể cả khi fn ném lỗi. */
async function withClient(app, params, fn) {
  const c = mk(app, params);
  try {
    return await fn(c);
  } finally {
    await c.$disconnect();
  }
}

// --- client GIÁM SÁT: sống suốt script, tên riêng nên không lẫn vào số đo ---
const mon = mk('p5mon', 'connection_limit=1');
const conns = async (app) => {
  const r = await mon.$queryRaw`
    SELECT count(*)::int AS n FROM pg_stat_activity
    WHERE datname = 'dbqa' AND application_name = ${app}`;
  return r[0].n;
};

/** Poll số kết nối của `app` cho tới khi stop(); trả về MAX đo được. */
function watch(app) {
  let peak = 0;
  let on = true;
  (async () => {
    while (on) {
      try {
        peak = Math.max(peak, await conns(app));
      } catch {
        /* poll lỗi thì bỏ mẫu đó, không làm chết nhánh đang đo */
      }
      await new Promise((r) => setTimeout(r, POLL_MS));
    }
  })();
  return () => {
    on = false;
    return peak;
  };
}

/**
 * Bắn N query song song trên `c`, đo tổng ms + kết nối cao điểm + phân loại lỗi.
 * `allSettled` (KHÔNG `all`) vì nhánh C phải đếm được bao nhiêu OK / bao nhiêu P2024:
 * `Promise.all` sẽ ném ở lỗi đầu tiên và bỏ mất phần còn lại.
 */
async function burst(app, c) {
  const stop = watch(app);
  const t0 = performance.now();
  const rs = await Promise.allSettled(
    Array.from({ length: N }, () => c.$queryRawUnsafe(LOAD)),
  );
  const ms = Math.round(performance.now() - t0);
  await new Promise((r) => setTimeout(r, POLL_MS * 2)); // để poll kịp mẫu cuối
  const peak = stop();
  const ok = rs.filter((r) => r.status === 'fulfilled').length;
  const errs = rs.filter((r) => r.status === 'rejected').map((r) => r.reason);
  return { ms, peak, ok, errs };
}

// --- in ấn (cùng nhà với p1/p2/p3) ----------------------------------------
const label = (t) => console.log(`== ${t} ==`);

/** In dòng chú giải `=>`, tự bẻ theo TỪ cho vừa khung ảnh dọc. */
function bullet(text, W = 49) {
  let cur = '=>';
  for (const w of text.split(' ')) {
    if (`${cur} ${w}`.length > W && cur.trim() !== '=>') {
      console.log(cur);
      cur = '  ';
    }
    cur += ` ${w}`;
  }
  console.log(cur);
}

/** Bẻ dòng theo TỪ, giữ NGUYÊN VĂN từng chữ. */
function wrapWords(text, W = 49) {
  let cur = '';
  for (const w of text.split(/\s+/)) {
    if (cur && `${cur} ${w}`.length > W) {
      console.log(cur);
      cur = '';
    }
    cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) console.log(cur);
}

/**
 * Lấy PHẦN LÕI của message lỗi Prisma bằng luật máy móc (không viết lại chữ nào):
 * Prisma dựng message nhiều khối cách nhau bằng dòng trống
 * (`Invalid `prisma.$queryRaw()` invocation:` … rồi câu lỗi thật) → lấy khối CUỐI.
 * Message ĐẦY ĐỦ được in ra stderr và chép nguyên văn vào report.
 */
const coreMsg = (e) =>
  e.message.split(/\n\s*\n/).at(-1).replace(/\s+/g, ' ').trim();

const row = (a, b, c, d) =>
  console.log(
    `${a.padEnd(9)}|${String(b).padStart(6)} |${String(c).padStart(6)} | ${d}`,
  );

// ==========================================================================
try {
  const maxConn = (await mon.$queryRaw`SHOW max_connections`)[0].max_connections;

  const A = await withClient('p5A', 'connection_limit=2&pool_timeout=10', (c) =>
    burst('p5A', c),
  );
  const B = await withClient('p5B', 'connection_limit=20', (c) => burst('p5B', c));
  const C = await withClient('p5C', 'connection_limit=1&pool_timeout=1', (c) =>
    burst('p5C', c),
  );

  // message lỗi ĐẦY ĐỦ -> stderr (không lên ảnh, dùng để chép vào report)
  for (const e of C.errs.slice(0, 1)) {
    console.error('--- [C] lỗi đầy đủ ---');
    console.error(`name=${e.name} code=${e.code} clientVersion=${e.clientVersion}`);
    console.error(e.message);
    console.error('--- hết ---');
  }
  console.error(`[C] tổng lỗi ${C.errs.length}, mã: ${[...new Set(C.errs.map((e) => e.code))].join(',')}`);

  const p2024 = C.errs.filter((e) => e.code === 'P2024');
  const other = C.errs.filter((e) => e.code !== 'P2024');

  // ---- output (= nội dung ảnh) -------------------------------------------
  label('P5: pool 2 vs pool 20 vs pool cạn');
  console.log(`${N} query song song qua $queryRawUnsafe:`);
  console.log(`  ${LOAD}`);
  console.log('đo kết nối: pg_stat_activity theo');
  console.log('application_name (client giám sát tên riêng)');
  console.log('');

  console.log('[A] connection_limit=2 pool_timeout=10');
  console.log(`  ${A.ms}ms · cao điểm ${A.peak} kết nối · lỗi ${A.errs.length}`);
  bullet(`${N} query chia ${Math.ceil(N / 2)} lượt: ${Math.ceil(N / 2)} x ${SLEEP}s`);
  console.log('');

  console.log('[B] connection_limit=20');
  console.log(`  ${B.ms}ms · cao điểm ${B.peak} kết nối · lỗi ${B.errs.length}`);
  bullet(`cùng ${N} query, 1 lượt: nhanh hơn ${(A.ms / B.ms).toFixed(1)}x`);
  console.log('');

  console.log('[C] connection_limit=1 pool_timeout=1 (ép lỗi)');
  console.log(`  ${C.ms}ms · cao điểm ${C.peak} · OK ${C.ok} / lỗi ${C.errs.length}`);
  console.log(`${p2024[0]?.code ?? 'KHÔNG RA P2024'} ${p2024[0]?.name ?? ''}`.trim());
  if (p2024[0]) wrapWords(coreMsg(p2024[0]));
  if (other.length) console.log(`(còn ${other.length} lỗi mã khác: ${other[0].code})`);
  console.log('');

  row('pool', 'ms', 'k.nối', 'lỗi');
  row('[A] 2', A.ms, A.peak, A.errs.length ? `${A.errs.length}x` : '-');
  row('[B] 20', B.ms, B.peak, B.errs.length ? `${B.errs.length}x` : '-');
  row('[C] 1', C.ms, C.peak, p2024.length ? `${p2024.length}x P2024` : '-');
  console.log(`SHOW max_connections = ${maxConn}`);
  bullet(
    'pool là HÀNG ĐỢI trước DB: pool nhỏ biến query song song thành nhiều lượt tuần tự',
  );
  bullet(
    `tăng pool KHÔNG miễn phí: trần thật là max_connections=${maxConn}; 10 instance x pool 20 = 200 > ${maxConn}`,
  );
  bullet(
    'P2024 = xếp hàng quá lâu, KHÔNG phải DB chết; pool_timeout là timeout XIN connection',
  );

  const orders = await mon.order.count();
  console.log(`orders=${orders} ${orders === 500000 ? 'OK' : 'FAIL'}`);
  if (orders !== 500000) process.exitCode = 1;
} finally {
  await mon.$disconnect();
}
