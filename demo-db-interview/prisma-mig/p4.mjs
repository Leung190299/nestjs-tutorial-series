// P4 / ep90 — MIGRATION AN TOÀN: thêm cột NOT NULL vào bảng ĐÃ CÓ DATA.
//
//   cd demo-db-interview/prisma-mig && node p4.mjs
//
// Script diễn lại TOÀN BỘ câu chuyện từ số 0, mỗi lần chạy đều gọi `prisma migrate dev`
// THẬT (không mock, không hardcode output) rồi in ra bản rút gọn vừa khung ảnh dọc.
//
// ══ AN TOÀN — đọc trước khi sửa ══════════════════════════════════════════════
// `customers`/`orders` trong DB `dbqa` được tạo bằng SQL thuần (sql-qa/seed.mjs), KHÔNG
// nằm trong lịch sử migration nào. Nếu trỏ `prisma migrate dev` vào `dbqa`, Prisma sẽ
// coi 2 bảng đó là DRIFT và ĐÒI RESET DATABASE -> mất 505.000 dòng seed, phá D1–D6 và
// P1–P3/P5/P6. Vì vậy P4 dùng DATABASE RIÊNG `dbqa_mig` trong CÙNG container `dbqa-pg`.
// Hàm assertMigDb() dưới đây CHẶN CỨNG: URL không kết thúc bằng `/dbqa_mig` là thoát ngay.
// Cuối script tự đếm lại `orders`/`customers` của `dbqa` và in ra làm bằng chứng.
//
// ══ VÌ SAO CHẠY TRONG SANDBOX `.p4-run/` ═════════════════════════════════════
// Script phải sinh migration MỚI mỗi lần chạy (đó là thứ cần chứng minh), nên nó KHÔNG
// được ghi vào `prisma/migrations/` đang commit trong repo. Nó làm việc trong `.p4-run/`
// (gitignore). `prisma/migrations/` trong repo là bản chụp của LẦN CHẠY CHÍNH THỨC —
// chính lần in ra ảnh `dbqa/p4-migration.png` — để video byte-match được. Nội dung SQL
// hai bên giống nhau từng chữ; chỉ TIMESTAMP trong tên thư mục là khác (Prisma đặt tên
// theo giờ chạy).
import {execFileSync} from 'node:child_process';
import {mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SANDBOX = join(ROOT, '.p4-run');
const SCHEMA = join(SANDBOX, 'schema.prisma');
const MIGRATIONS = join(SANDBOX, 'migrations');
// Trần ký tự khi bọc dòng lỗi nguyên văn. Khung dọc 620px, chữ 18px mono => ~50 ký tự
// (đo thực nghiệm ở P3: 48 ký tự × 38 dòng vừa khít). 48 để còn biên an toàn.
const WRAP = 48;
const colExistsSql =
  "SELECT EXISTS (SELECT 1 FROM information_schema.columns" +
  " WHERE table_name='notes' AND column_name='channel')";

// ─── chặn cứng: chỉ được chạy trên dbqa_mig ──────────────────────────────────
const DB_URL = readEnvUrl();
assertMigDb(DB_URL);

const out = [];
const p = (s = '') => out.push(s);

// ─── schema 4 trạng thái: khác nhau ĐÚNG một dòng `channel` ───────────────────
const schemaFor = (channel) => `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Note {
  id      Int    @id @default(autoincrement())
  body    String${channel ? `\n  channel ${channel}` : ''}

  @@map("notes")
}
`;

// SQL backfill VIẾT TAY, nhét vào migration rỗng do --create-only sinh ra.
const BACKFILL_SQL = `-- Bước 2/3 của luật "nullable -> backfill -> siết NOT NULL".
-- File này do \`prisma migrate dev --create-only --name backfill_channel\` sinh ra RỖNG
-- ("-- This is an empty migration."), câu UPDATE dưới đây là VIẾT TAY.
-- Backfill phải nằm TRONG lịch sử migration, không phải script chạy tay: nhờ vậy
-- \`prisma migrate deploy\` trên production cũng chạy đúng thứ tự nullable -> backfill -> NOT NULL.
-- Bảng 1.000 dòng nên UPDATE một phát là xong; bảng chục triệu dòng phải backfill THEO LÔ
-- (WHERE id BETWEEN ... LIMIT ...) để không khóa bảng quá lâu.
UPDATE "notes" SET "channel" = 'web';
`;

// ═══ dựng lại từ số 0 ════════════════════════════════════════════════════════
rmSync(SANDBOX, {recursive: true, force: true});
mkdirSync(SANDBOX, {recursive: true});
// Xóa sạch schema public của dbqa_mig (kể cả bảng _prisma_migrations) để mỗi lần chạy
// đều bắt đầu từ DB trắng — an toàn vì dbqa_mig là DB dùng một lần cho riêng câu P4.
psql('dbqa_mig', 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;');

p('== P4: thêm cột NOT NULL trên bảng có data ==');
p('DB RIÊNG dbqa_mig · KHÔNG phải dbqa (500k đơn)');

// ─── migration 0: tạo bảng notes + seed 1.000 dòng ───────────────────────────
writeFileSync(SCHEMA, schemaFor(null)); // chưa có cột channel
const r0 = migrate(['--name', 'init']);
if (r0.code !== 0) die(`migration init thất bại:\n${r0.text}`);
const m0 = applied(r0.text);
psql('dbqa_mig', "INSERT INTO notes (body) SELECT 'note ' || g FROM generate_series(1,1000) g");
const seeded = Number(psql1('dbqa_mig', 'SELECT count(*) FROM notes'));
p(`notes = { id, body } · seed ${seeded} dòng`);
p(`m0 ${m0}`);
p();

// ═══ PHA 1 (SAI): channel String — NOT NULL, không default ═══════════════════
writeFileSync(SCHEMA, schemaFor('String'));
const r1 = migrate(['--name', 'add_channel']);
p('== PHA 1 (SAI) channel String, không default ==');
p('$ npx prisma migrate dev --name add_channel');
if (r1.code === 0) die('PHA 1 LẼ RA PHẢI THẤT BẠI mà lại thành công — kịch bản sai:\n' + r1.text);
errBlock(r1.text).forEach(p);
// Chứng minh CLI chặn TRƯỚC khi chạy SQL: không sinh file, cột chưa tồn tại.
const files1 = migDirs().length;
const hasCol = psql1('dbqa_mig', colExistsSql) === 't';
p(`exit=${r1.code} · ${files1 === 1 && !hasCol ? 'KHÔNG sinh migration · cột chưa có' : 'CÓ THAY ĐỔI SÓT LẠI!'}`);
p('=> chặn TRƯỚC khi chạy SQL, không hỏi reset');
p();

// ═══ PHA 2 (ĐÚNG): nullable -> backfill -> siết NOT NULL ═════════════════════
p('== PHA 2 (ĐÚNG) 3 bước ==');

// (a) nullable
writeFileSync(SCHEMA, schemaFor('String?'));
const r2a = migrate(['--name', 'add_channel_nullable']);
if (r2a.code !== 0) die(`bước 1 (nullable) thất bại:\n${r2a.text}`);
const m1 = applied(r2a.text);
p(`1 schema channel String?  -> migrate dev ${ok(r2a)}`);
p(`  ${m1}`);
p(`  ${sql(m1)}`);

// (b) backfill — migration rỗng do --create-only, SQL viết tay
const r2b1 = migrate(['--create-only', '--name', 'backfill_channel']);
if (r2b1.code !== 0) die(`--create-only thất bại:\n${r2b1.text}`);
const m2 = createdOnly(r2b1.text);
writeFileSync(join(MIGRATIONS, m2, 'migration.sql'), BACKFILL_SQL);
const r2b2 = migrate([]); // không --name: chỉ áp dụng migration đang chờ
if (r2b2.code !== 0) die(`áp dụng backfill thất bại:\n${r2b2.text}`);
p(`2 --create-only + VIẾT TAY UPDATE -> dev ${ok(r2b2)}`);
p(`  ${m2}`);
p(`  ${sql(m2)}`);

// (c) siết NOT NULL
writeFileSync(SCHEMA, schemaFor('String'));
const r2c = migrate(['--name', 'channel_required']);
if (r2c.code !== 0) die(`bước 3 (siết NOT NULL) thất bại:\n${r2c.text}`);
const m3 = applied(r2c.text);
p(`3 schema channel String   -> migrate dev ${ok(r2c)}`);
p(`  ${m3}`);
p(`  ${sql(m3)}`);
p();

// ═══ kết quả cuối — đọc từ information_schema, không tin lời CLI ═════════════
const [type, nullable] = psql1(
  'dbqa_mig',
  "SELECT data_type || '|' || is_nullable FROM information_schema.columns" +
    " WHERE table_name='notes' AND column_name='channel'",
).split('|');
const total = Number(psql1('dbqa_mig', 'SELECT count(*) FROM notes'));
const web = Number(psql1('dbqa_mig', "SELECT count(*) FROM notes WHERE channel='web'"));
p('== kết quả cuối ==');
p(`channel ${type} is_nullable=${nullable} · ${web}/${total} 'web'`);
p('=> migrate dev sinh SQL từ DIFF schema; NOT NULL');
p('   không default trên bảng có data = BẤT KHẢ THI');
p('=> 3 bước: nullable -> backfill -> siết NOT NULL');
p('=> production: migrate deploy, KHÔNG dev');

// ═══ bằng chứng an toàn: DB CHÍNH `dbqa` không hề bị chạm ════════════════════
const orders = Number(psql1('dbqa', 'SELECT count(*) FROM orders'));
const customers = Number(psql1('dbqa', 'SELECT count(*) FROM customers'));
const safe = orders === 500000 && customers === 5000;
// KHÔNG chèn dòng trống trước nhãn này: output đang đúng 38 dòng = trần khung ảnh dọc.
p('== an toàn: DB chính dbqa còn nguyên ==');
p(`orders=${orders} · customers=${customers} ${safe ? 'OK' : 'FAIL'}`);

console.log(out.join('\n'));
if (!safe) process.exitCode = 1;

// ═══ helpers ═════════════════════════════════════════════════════════════════

function readEnvUrl() {
  const m = readFileSync(join(ROOT, '.env'), 'utf8').match(/^DATABASE_URL="(.+)"$/m);
  if (!m) die('không đọc được DATABASE_URL trong .env');
  return m[1];
}

// CHẶN CỨNG — lá chắn cuối cho 505.000 dòng seed trong `dbqa`.
function assertMigDb(url) {
  if (!/\/dbqa_mig(\?|$)/.test(url)) {
    die(
      `DATABASE_URL phải trỏ DB RIÊNG dbqa_mig, đang là:\n  ${url}\n` +
        'Chạy migrate trên dbqa sẽ bị coi là drift và ĐÒI RESET -> mất 505k dòng seed.',
    );
  }
}

// Gọi prisma CLI THẬT. stdin = 'ignore' để nếu CLI có hỏi tương tác (y/n, "reset?") thì
// nó chết ngay chứ KHÔNG treo — và cũng không có đường nào trả lời "yes" cho reset.
function migrate(args) {
  let text = '';
  let code = 0;
  try {
    text = execFileSync('npx', ['prisma', 'migrate', 'dev', '--schema', SCHEMA, '--skip-generate', ...args], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 120_000,
      env: {...process.env, DATABASE_URL: DB_URL},
    });
  } catch (e) {
    code = e.status ?? 1;
    text = `${e.stdout ?? ''}${e.stderr ?? ''}`;
  }
  return {code, text: stripNoise(text)};
}

// Bỏ khung "Update available 6.19.3 -> 8.0.0-rc.13" và rác điều khiển terminal.
function stripNoise(t) {
  return t
    .replace(/\u001b\[[0-9;]*[A-Za-z]/g, '')
    .split('\n')
    .filter((l) => !/^[┌│└]/.test(l))
    .join('\n');
}

function applied(t) {
  return match(t, /Applying migration `([^`]+)`/, 'tên migration đã áp dụng');
}
function createdOnly(t) {
  return match(t, /without applying it (\S+)/, 'tên migration --create-only');
}

function match(t, re, what) {
  const m = t.match(re);
  if (!m) die(`không đọc được ${what} từ output:\n${t}`);
  return m[1];
}

function ok(r) {
  return r.code === 0 && /in sync with your schema/.test(r.text) ? 'OK' : 'FAIL';
}

function migDirs() {
  return existsSync(MIGRATIONS) ? readdirSync(MIGRATIONS).filter((f) => /^\d/.test(f)) : [];
}

// Câu SQL của migration, rút gọn bằng LUẬT MÁY MÓC (không viết lại chữ nào):
// bỏ block comment /* Warnings ... */ -> bỏ dòng `-- ...` và dòng rỗng -> bỏ dấu " ->
// gộp khoảng trắng -> bỏ tiền tố `ALTER TABLE notes ` (tên bảng đã nói ở dòng trên) ->
// nối nhiều câu bằng ' | '. Bản ĐẦY ĐỦ (kể cả khối Warnings) nằm trong report.
function sql(name) {
  return readFileSync(join(MIGRATIONS, name, 'migration.sql'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('--'))
    .join(' ')
    .replaceAll('"', '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^ALTER TABLE notes /, '')
    .replace(/;\s*(?=\S)/g, '; | ');
}

// Khối lỗi PHA 1, NGUYÊN VĂN. Chỉ 2 phép rút gọn, cả 2 đều máy móc:
//   (1) bỏ dòng rỗng và dòng cuối "Then run prisma migrate dev to apply it and verify it works."
//       (câu hướng dẫn bước sau, không phải câu chốt của lỗi);
//   (2) bọc dòng dài ở WRAP ký tự, dòng tiếp giữ thụt lề gốc + 2.
function errBlock(t) {
  const start = t.split('\n').findIndex((l) => l.startsWith('Error:'));
  if (start < 0) die(`không thấy khối Error: trong output:\n${t}`);
  return t
    .split('\n')
    .slice(start)
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l) => l && !l.startsWith('Then run prisma migrate dev to apply it'))
    .flatMap((l) => wrap(l, WRAP));
}

function wrap(line, width) {
  const indent = line.match(/^\s*/)[0];
  const cont = indent + '  ';
  const words = line.trim().split(/\s+/);
  const lines = [];
  let cur = indent;
  for (const w of words) {
    const pad = cur.trim() ? ' ' : '';
    if (cur.length + pad.length + w.length > width && cur.trim()) {
      lines.push(cur);
      cur = cont + w;
    } else cur += pad + w;
  }
  if (cur.trim()) lines.push(cur);
  return lines;
}

function psql(db, sqlText) {
  return execFileSync('docker', ['exec', 'dbqa-pg', 'psql', '-U', 'dbqa', '-d', db, '-v', 'ON_ERROR_STOP=1', '-c', sqlText], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 60_000,
  });
}

function psql1(db, sqlText) {
  return execFileSync('docker', ['exec', 'dbqa-pg', 'psql', '-U', 'dbqa', '-d', db, '-tAc', sqlText], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 60_000,
  }).trim();
}

function die(msg) {
  console.error(`p4 LỖI: ${msg}`);
  process.exit(1);
}
