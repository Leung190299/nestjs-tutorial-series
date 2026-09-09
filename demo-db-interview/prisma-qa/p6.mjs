// P6 (ep92) — Query chậm → tối ưu: đi từ LOG Prisma tới INDEX ĐÚNG, đo từng bước.
//
//   cd demo-db-interview/prisma-qa && node p6.mjs
//   (stdout = đúng nội dung ảnh; stderr = plan ĐẦY ĐỦ + SQL đầy đủ để chép vào report)
//
// Query nghiệp vụ: "20 đơn `paid` mới nhất của khách ở Đà Nẵng"
//   p.order.findMany({ where:{status:'paid', customer:{city:'Da Nang'}},
//                      orderBy:{createdAt:'desc'}, take:20 })
//
// BA BƯỚC (đúng quy trình của câu hỏi phỏng vấn):
//   [1] BẬT LOG -> lấy câu SQL Prisma THẬT SỰ gửi xuống (không đoán từ TypeScript).
//   [2] EXPLAIN (ANALYZE, BUFFERS) CHÍNH câu SQL đó -> node nào tốn nhất.
//   [3] Tạo index theo HÌNH DẠNG query mà plan chỉ ra, ANALYZE, đo lại.
//
// BỐN TRẠNG THÁI INDEX được đo, không phải hai — vì "tạo index" chưa chắc là "được dùng":
//   [A] không index                        (điểm xuất phát)
//   [B] orders(status)                     index ĐƠN, đoán theo cột WHERE
//   [C] orders(status, created_at DESC)    index TỔ HỢP khớp WHERE + ORDER BY
//   [D] [C] + customers(city)              thêm index cho vế JOIN
// Fact sheet đã CẢNH BÁO trước: `status` chỉ có 4 giá trị (paid ≈ 1/3 bảng) nên index đơn
// trên `status` có thể bị planner BỎ QUA. Script không đoán: nó in tên node THẬT của
// từng trạng thái, kể cả khi kết quả là "index tạo ra rồi mà không ai dùng".
//
// CÁCH CHỌN "NODE TỐN NHẤT" — luật máy móc, không chỉ tay:
//   trong các node LÁ của plan (node không có node con), lấy node có `rows × loops`
//   LỚN NHẤT = node CHẠM NHIỀU DÒNG NHẤT. Dùng `rows × loops` chứ không dùng ms vì ms
//   dao động theo máy, còn số dòng chạm là con số bất biến giữa các lần chạy.
//
// GHI/XÓA: script chỉ tạo & xóa INDEX (DDL), KHÔNG đụng một dòng dữ liệu nào.
// Bước 0 DROP mọi index của bài này -> chạy lại bao nhiêu lần cũng ra cùng kịch bản.
// Cuối script: verify `orders` vẫn 500.000 dòng + liệt kê index còn lại trên 2 bảng.
import { PrismaClient } from '@prisma/client';

const CITY = 'Da Nang';
const STATUS = 'paid';
const TAKE = 20;
const RUNS = 3; // số lượt lấy trung bình mỗi trạng thái (chưa kể 1 lượt làm nóng)

// index của RIÊNG bài này (idx_orders_customer là của D1 — KHÔNG đụng tới)
const IDX_STATUS = 'idx_orders_status';
const IDX_COMBO = 'idx_orders_status_created';
const IDX_CITY = 'idx_customers_city';

const p = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

// --- lấy SQL THẬT Prisma gửi xuống ----------------------------------------
let phase = 'warm';
const events = [];
p.$on('query', (e) => events.push({ phase, query: e.query, params: e.params }));
// Sự kiện 'query' bắn SAU khi promise resolve — nhường một nhịp event loop trước khi
// đổi pha, nếu không câu cuối của pha trước rơi nhầm sang pha sau (bẫy từ P1).
const drain = () => new Promise((r) => setTimeout(r, 100));
const lastOf = (ph) => events.filter((e) => e.phase === ph).at(-1);

// --- query nghiệp vụ -------------------------------------------------------
const businessQuery = () =>
  p.order.findMany({
    where: { status: STATUS, customer: { city: CITY } },
    orderBy: { createdAt: 'desc' },
    take: TAKE,
  });

/** Chạy query RUNS lượt (sau 1 lượt làm nóng), trả ms TRUNG BÌNH + số dòng. */
async function measure() {
  await businessQuery(); // làm nóng: không tính giờ
  let total = 0;
  let rows = [];
  for (let i = 0; i < RUNS; i++) {
    const t0 = performance.now();
    rows = await businessQuery();
    total += performance.now() - t0;
  }
  return { ms: total / RUNS, n: rows.length };
}

// --- EXPLAIN trên CHÍNH câu SQL đó -----------------------------------------
/** Thay `$1..$n` bằng giá trị thật — EXPLAIN không nhận prepared param. */
function inline(sql, params) {
  const vs = JSON.parse(params);
  return sql.replace(/\$(\d+)/g, (_, i) => {
    const v = vs[Number(i) - 1];
    return typeof v === 'string' ? `'${v.replaceAll("'", "''")}'` : String(v);
  });
}

/**
 * Chạy EXPLAIN (ANALYZE, BUFFERS) và trích:
 *   - `exec`     : Execution Time (ms) do Postgres tự báo
 *   - `buffers`  : shared hit+read ở node gốc = tổng số trang đã chạm
 *   - `worst`    : node LÁ chạm nhiều dòng nhất (rows × loops) — xem luật ở đầu file
 *   - `scan`     : node LÁ quét bảng `orders` (để nói "quét kiểu gì") — lấy từ plan thật
 */
async function explain(sql, params) {
  const out = await p.$queryRawUnsafe(`EXPLAIN (ANALYZE, BUFFERS) ${inline(sql, params)}`);
  const text = out.map((r) => r['QUERY PLAN']).join('\n');

  // parse từng dòng node: bắt indent + tên + (actual time=a..b rows=r loops=l)
  const nodes = [];
  for (const line of text.split('\n')) {
    const m = line.match(
      /^(\s*)(?:->\s+)?(.+?)\s+\(cost=[^)]*\)\s+\(actual time=[\d.]+\.\.([\d.]+) rows=(\d+) loops=(\d+)\)/,
    );
    if (!m) continue;
    nodes.push({
      indent: m[1].length,
      name: m[2].trim(),
      ms: Number(m[3]),
      rows: Number(m[4]),
      loops: Number(m[5]),
    });
  }
  // LÁ = node mà node kế tiếp KHÔNG thụt sâu hơn (không có con)
  const leaves = nodes.filter((n, i) => !nodes[i + 1] || nodes[i + 1].indent <= n.indent);
  const touched = (n) => n.rows * n.loops;
  const worst = leaves.reduce((a, b) => (touched(b) > touched(a) ? b : a), leaves[0]);
  const scan = leaves.find((n) => / orders\b/.test(n.name)) ?? worst;

  const exec = Number(text.match(/Execution Time: ([\d.]+) ms/)?.[1] ?? NaN);
  const bm = text.match(/Buffers: shared (?:hit=(\d+))?\s*(?:read=(\d+))?/);
  const buffers = bm ? Number(bm[1] ?? 0) + Number(bm[2] ?? 0) : NaN;
  return { text, exec, buffers, worst, touched: touched(worst), scan };
}

// --- DDL: chỉ index, không đụng dữ liệu ------------------------------------
const drops = [
  `DROP INDEX IF EXISTS ${IDX_COMBO}`,
  `DROP INDEX IF EXISTS ${IDX_STATUS}`,
  `DROP INDEX IF EXISTS ${IDX_CITY}`,
];
async function ddl(sql) {
  const t0 = performance.now();
  await p.$executeRawUnsafe(sql);
  return performance.now() - t0;
}
const analyze = (t) => ddl(`ANALYZE ${t}`);

// --- in ấn (cùng nhà với p1/p2/p3/p5) --------------------------------------
const label = (t) => console.log(`== ${t} ==`);
const f = (x, d = 2) => x.toFixed(d);

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

/**
 * In câu SQL Prisma sinh ra, rút gọn bằng LUẬT MÁY MÓC (không sửa tay chữ nào):
 *   1. bỏ tiền tố schema `"public".`   2. bỏ dấu nháy kép quanh tên bảng/cột
 *   3. thay DANH SÁCH CỘT giữa SELECT và FROM bằng `...`
 * Luật 3 hợp lệ ở câu này vì điểm nhấn là WHERE + ORDER BY (khác P2, nơi danh sách cột
 * MỚI là điểm nhấn nên phải giữ). Câu ĐẦY ĐỦ được in ra stderr và chép vào report.
 */
function showSql(sql, W = 49) {
  const one = sql
    .replace(/\s+/g, ' ')
    .trim()
    .replaceAll('"public".', '')
    .replaceAll('"', '')
    .replace(/^SELECT .*? FROM /, 'SELECT ... FROM ');
  let cur = '';
  for (const w of one.split(' ')) {
    if (cur && `${cur} ${w}`.length > W) {
      console.log(cur);
      cur = '';
    }
    cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) console.log(cur);
}

/** Cắt tên node cho vừa khung ảnh dọc — chỉ cắt HIỂN THỊ, report giữ nguyên văn. */
const short = (s, W = 43) => (s.length > W ? `${s.slice(0, W - 1)}…` : s);

/**
 * Bỏ đuôi ` on <bảng> [alias]` của tên node — luật máy móc, vì khối đã nói rõ
 * đang xét node quét bảng nào. Tên NGUYÊN VĂN nằm trong plan đầy đủ ở stderr/report.
 */
const strip = (s) => s.replace(/ on \w+( \w+)?$/, '');

/** Bẻ dòng theo TỪ, giữ NGUYÊN VĂN chữ; dòng tiếp theo thụt bằng thụt của dòng đầu. */
function wrapWords(text, W = 49) {
  const pad = ' '.repeat(text.match(/^\s*/)[0].length);
  let cur = '';
  for (const w of text.trim().split(/\s+/)) {
    if (cur && `${cur} ${w}`.length > W) {
      console.log(cur);
      cur = `${pad}${w}`;
    } else cur = cur ? `${cur} ${w}` : `${pad}${w}`;
  }
  if (cur) console.log(cur);
}

// ==========================================================================
try {
  // ---- bước 0: về trạng thái sạch ----------------------------------------
  for (const d of drops) await p.$executeRawUnsafe(d);
  await analyze('orders');
  await analyze('customers');

  const nOrders = await p.order.count();
  const nPaid = await p.order.count({ where: { status: STATUS } });
  const nCity = await p.customer.count({ where: { city: CITY } });
  const nCust = await p.customer.count();

  // ---- [A] chưa có index -------------------------------------------------
  phase = 'A';
  const a = await measure();
  await drain();
  const ev = lastOf('A'); // SQL thật + params thật, lấy từ log
  const ea = await explain(ev.query, ev.params);

  // ---- [B] index ĐƠN orders(status) --------------------------------------
  const msB = await ddl(`CREATE INDEX ${IDX_STATUS} ON orders(status)`);
  await analyze('orders');
  phase = 'B';
  const b = await measure();
  await drain();
  const eb = await explain(ev.query, ev.params);

  // ---- [C] index TỔ HỢP orders(status, created_at DESC) ------------------
  await p.$executeRawUnsafe(`DROP INDEX ${IDX_STATUS}`);
  const msC = await ddl(
    `CREATE INDEX ${IDX_COMBO} ON orders(status, created_at DESC)`,
  );
  await analyze('orders');
  phase = 'C';
  const c = await measure();
  await drain();
  const ec = await explain(ev.query, ev.params);

  // ---- [D] thêm customers(city) ------------------------------------------
  const msD = await ddl(`CREATE INDEX ${IDX_CITY} ON customers(city)`);
  await analyze('customers');
  phase = 'D';
  const d = await measure();
  await drain();
  const ed = await explain(ev.query, ev.params);
  phase = 'done';

  // ---- dọn: giữ index THẬT SỰ được dùng, bỏ index vô ích -----------------
  const cityUsed = ed.text.includes(IDX_CITY);
  if (!cityUsed) await p.$executeRawUnsafe(`DROP INDEX ${IDX_CITY}`);

  // ---- plan đầy đủ -> stderr (chép vào report, không lên ảnh) ------------
  console.error(`--- SQL Prisma sinh ra (nguyên văn) ---\n${ev.query}\nparams: ${ev.params}`);
  for (const [tag, e, note] of [
    ['A chưa index', ea, '-'],
    [`B ${IDX_STATUS}`, eb, `CREATE ${Math.round(msB)}ms`],
    [`C ${IDX_COMBO}`, ec, `CREATE ${Math.round(msC)}ms`],
    [`D + ${IDX_CITY}`, ed, `CREATE ${Math.round(msD)}ms`],
  ]) {
    console.error(`--- PLAN [${tag}] (${note}) ---\n${e.text}`);
  }

  // ---- output (= nội dung ảnh) -------------------------------------------
  const bIgnored = !eb.text.includes(IDX_STATUS);
  const sameAsC = ed.scan.name === ec.scan.name && ed.touched === ec.touched;

  label('P6: từ log chậm tới index đúng');
  console.log(`${TAKE} đơn '${STATUS}' mới nhất của khách ở ${CITY}`);
  console.log(
    `orders ${nOrders} · ${STATUS} ${nPaid} · ${CITY} ${nCity} khách`,
  );
  console.log('');

  console.log('[1] SQL Prisma 6.19.3 sinh ra (log, cột -> ...):');
  showSql(ev.query);
  console.log(`params: ${ev.params}`);
  console.log('');

  console.log('[2] EXPLAIN câu đó — node chạm nhiều dòng nhất:');
  console.log(`  ${short(ea.worst.name, 47)} · ${ea.touched} dòng`);
  console.log(`  Execution Time ${f(ea.exec, 3)}ms · buffers ${ea.buffers}`);
  console.log('');

  console.log('[3] ĐO 4 trạng thái index (node từ plan THẬT):');
  for (const [tag, def, e, m, node] of [
    ['A', 'chưa index', ea, a, strip(ea.scan.name)],
    [
      'B',
      `orders(status)${bIgnored ? ' — index BỊ BỎ QUA' : ''}`,
      eb,
      b,
      strip(eb.scan.name),
    ],
    ['C', 'orders(status, created_at DESC)', ec, c, strip(ec.scan.name)],
    [
      'D',
      '[C] + customers(city)',
      ed,
      d,
      sameAsC ? 'plan y hệt [C]' : strip(ed.scan.name),
    ],
  ]) {
    console.log(`[${tag}] ${def}`);
    wrapWords(`    ${f(m.ms).padStart(6)}ms · ${e.touched} dòng · ${node}`);
  }
  console.log('');

  bullet(
    bIgnored
      ? `[B] index TẠO RA MÀ PLANNER KHÔNG THÈM DÙNG vì lọc ${Math.round((nPaid / nOrders) * 100)}% bảng; [D] cũng vậy, đã DROP`
      : `[B] planner CÓ dùng ${IDX_STATUS} — khác dự đoán, ghi đúng sự thật`,
  );
  bullet(
    `[C] index tổ hợp khớp WHERE + ORDER BY mới ăn: ${f(a.ms / c.ms, 1)}x nhanh, chạm ${Math.round(ea.touched / ec.touched)}x ít dòng`,
  );
  bullet(
    'quy trình: bật log lấy SQL thật -> EXPLAIN câu THẬT -> index đúng cột theo plan (xem thêm #37/D1)',
  );

  // ---- verify + trạng thái index cuối cùng -------------------------------
  const after = await p.order.count();
  console.log(`orders=${after} ${after === 500000 ? 'OK' : 'FAIL'}`);
  const idx = await p.$queryRawUnsafe(
    `SELECT indexname FROM pg_indexes WHERE tablename IN ('orders','customers') ORDER BY indexname`,
  );
  wrapWords(`index còn lại: ${idx.map((r) => r.indexname).join(', ')}`);
  if (after !== 500000) process.exitCode = 1;
} finally {
  await p.$disconnect();
}
