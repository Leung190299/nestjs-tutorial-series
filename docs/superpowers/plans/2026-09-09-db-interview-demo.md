# Lô 4 Phỏng vấn DB — Giai đoạn 1: fact sheet + demo-db-interview + ảnh terminal + tag db-qa-batch-4

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 (research) + Task 1 (hạ tầng Postgres & seed) + Task 2 (prisma-qa) TRƯỚC, rồi mỗi câu 1 task tuần tự, cuối cùng Task 15. Mọi implementer TỰ LÀM foreground, KHÔNG spawn agent con/background.

**Goal:** Fact sheet DB có nguồn + `demo-db-interview/` (Postgres Docker cổng 5433 + sql-qa 6 script + prisma-qa 6 script) với 12 demo verified in bằng chứng thật, ảnh terminal trong `video/public/screens/dbqa/`, tag `db-qa-batch-4`.

**Architecture:** Một container Postgres duy nhất (`dbqa-pg`, compose trong demo-db-interview) + một bộ dữ liệu seed dùng chung cho cả 12 câu. Mỗi câu là 1 script Node in khối bằng chứng có nhãn; ảnh render từ output thật bằng `demo-be-interview/tools/term-shot.mjs` (tái dùng nguyên).

**Tech Stack:** PostgreSQL 17 (docker, colima ĐÃ CHẠY sẵn) · node-postgres (`pg`) · Prisma · Node v22.21.1 · term-shot (lô 3).

## Global Constraints

- 12 câu D1–D6/P1–P6 = ep81–ep92 theo bảng spec `docs/superpowers/specs/2026-09-09-db-interview-batch4-design.md`.
- Postgres cổng **5433** (CẤM 5432), container tên **`dbqa-pg`**, DB `dbqa`, user `dbqa`, password `dbqa`.
- ⚠️ MÁY CÓ CONTAINER KHÁC ĐANG CHẠY (`wp-ai-chatbot-rag-wordpress-1`, cổng 8080) của project khác: TUYỆT ĐỐI không stop/rm/prune container hay volume nào ngoài `dbqa-pg`; chỉ dùng `docker compose -f demo-db-interview/docker-compose.yml` với project name riêng.
- Không tắt colima khi xong (máy đang dùng cho việc khác); giữ container `dbqa-pg` CHẠY xuyên suốt các task demo (Task 15 mới quyết dọn).
- Số đo phải THẬT, chạy ≥3 lần ghi dải vào report; ưu tiên con số bất biến (plan node, số query, rows) khi ms dao động.
- Ảnh: `video/public/screens/dbqa/{id}-{state}.png` (dọc 620×1281 mặc định; `-wide` khi bảng plan rộng) — render TỪ output thật; text trong ảnh phải khớp report NGUYÊN VĂN kể cả dòng chú giải (bài học lô 3: đưa cả dòng `=>` vào report).
- Report từng câu `.superpowers/sdd/{id}-report.md` + append `progress.md`; KHÔNG commit `.superpowers/`, KHÔNG commit dump dữ liệu.

---

### Task 0: Fact sheet DB `.superpowers/sdd/db-interview-research.md`

- [ ] 12 câu D1–D6/P1–P6: câu hỏi; trả lời chuẩn 3 câu tiếng Việt; bẫy; cơ chế + quote docs; nguồn XÁC MINH bằng WebFetch: postgresql.org/docs/current (indexes-intro, using-explain, transaction-iso, explicit-locking, queries-limit, performance-tips), prisma.io/docs (relation queries/include, select, transactions, migrate, connection pool, query logging). Ghi version: `docker run postgres:17-alpine postgres --version` hoặc từ container sau Task 1, `npm view prisma version`, `npm view pg version`.
- [ ] Mục "Cặp chéo": D3↔P1 (N+1 ở tầng SQL vs tầng ORM — 1 đoạn), D1↔P6 (index cứu query chậm).
- [ ] Điểm ❓ đánh dấu rõ (ví dụ: số ms cụ thể, hành vi lock cụ thể của Postgres 17, thông báo deadlock nguyên văn) → "đo thực nghiệm". Append progress.md.

### Task 1: Hạ tầng Postgres + seed dùng chung

**Files:** Create `demo-db-interview/docker-compose.yml`, `demo-db-interview/sql-qa/{package.json,.gitignore,db.mjs,seed.mjs}`.

**Interfaces — Produces:**
- compose service `db` image `postgres:17-alpine`, container_name `dbqa-pg`, ports `5433:5432`, env POSTGRES_USER/PASSWORD/DB = `dbqa`, healthcheck `pg_isready`.
- `sql-qa/db.mjs` export `pool` (pg.Pool tới `postgres://dbqa:dbqa@localhost:5433/dbqa`), `q(sql, params)` trả `{rows, ms}` (đo bằng `performance.now()`), `label(text)` in `== text ==`.
- Schema seed: `customers(id serial pk, name text, city text)` 5.000 dòng; `orders(id serial pk, customer_id int refs customers, total int, status text, created_at timestamptz)` **500.000 dòng**; KHÔNG tạo index nào ngoài PK (D1 sẽ tạo).

- [ ] **Step 1:** Viết docker-compose.yml + `docker compose -p dbqa -f demo-db-interview/docker-compose.yml up -d` → đợi healthy → `docker exec dbqa-pg psql -U dbqa -d dbqa -c "select version();"` in ra bản Postgres (ghi report).
- [ ] **Step 2:** `sql-qa/package.json` ("type":"module", dep `pg`), npm install; viết db.mjs theo Interfaces.
- [ ] **Step 3:** seed.mjs: tạo bảng + sinh dữ liệu bằng `generate_series` phía SQL (nhanh hơn insert từ Node), ví dụ `INSERT INTO orders SELECT g, (random()*4999)::int+1, (random()*5000000)::int, (ARRAY['new','paid','shipped','done'])[(random()*3)::int+1], now() - (random()*365)::int * interval '1 day' FROM generate_series(1,500000) g;` + `ANALYZE`. In `== seed xong: N khách, M đơn, mất X ms ==`.
- [ ] **Step 4:** Chạy seed, verify `SELECT count(*) FROM orders` = 500000; ghi thời gian seed vào report; xác nhận `docker ps` vẫn thấy container WordPress của project khác còn nguyên.
- [ ] **Step 5:** Commit `feat: hạ tầng demo-db-interview — Postgres 5433 + seed 500k đơn`.

### Task 2: Scaffold `prisma-qa`

**Files:** Create `demo-db-interview/prisma-qa/{package.json,.gitignore,prisma/schema.prisma,.env}`.

**Interfaces — Produces:** Prisma Client trên cùng DB (`DATABASE_URL="postgres://dbqa:dbqa@localhost:5433/dbqa"` trong `.env` — file này COMMIT được vì chỉ là demo cục bộ), models `Customer` + `Order` map đúng bảng đã seed (`@@map("customers")`/`("orders")`, `@map` từng cột snake_case), quan hệ `Customer.orders`/`Order.customer`.

- [ ] `npm init -y` + `npm i prisma @prisma/client` + `npx prisma init --datasource-provider postgresql`; viết schema map bảng có sẵn (hoặc `npx prisma db pull` rồi chỉnh tên model), `npx prisma generate`.
- [ ] Smoke `node -e "import('@prisma/client').then(async m=>{const p=new m.PrismaClient();console.log(await p.order.count());await p.$disconnect()})"` → in 500000.
- [ ] Commit `feat: scaffold prisma-qa (Prisma trên DB dbqa)`.

### Task 3 (D1/ep81): Index — Seq Scan vs Index Scan

`sql-qa/d1.mjs`: query `SELECT * FROM orders WHERE customer_id = $1` (chọn customer có ~100 đơn).
- Nhánh A (chưa index): `EXPLAIN (ANALYZE, BUFFERS)` in node đầu (`Seq Scan on orders`), actual time, rows, buffers; chạy query 3 lần lấy ms trung bình.
- `CREATE INDEX idx_orders_customer ON orders(customer_id);` + `ANALYZE orders;` (in thời gian tạo index).
- Nhánh B: cùng EXPLAIN → `Index Scan using idx_orders_customer`, ms mới.
- In `== D1: Seq Scan vs Index Scan ==` + bảng so ms + 2 dòng plan.
- [ ] Chạy 3 lần (DROP INDEX ở đầu script để lặp lại được), report dải ms, render `dbqa/d1-index.png` (+`-wide` nếu plan dài), Read ảnh, commit `feat: câu D1 — index Seq Scan vs Index Scan`.

### Task 4 (D2/ep82): Đọc EXPLAIN ANALYZE

`sql-qa/d2.mjs`: 1 query JOIN + WHERE + ORDER BY LIMIT; in plan ĐẦY ĐỦ (dùng `-wide`), rồi in phần "đọc plan" do script tự trích: node ngoài cùng, `cost=` ước lượng vs `actual time=`, `rows=` ước lượng vs thật (chênh bao nhiêu lần), `Buffers: shared hit/read`, `Execution Time`. In `== D2: đọc plan như thế nào ==`.
- [ ] Chạy 3 lần, report, render `dbqa/d2-explain-wide.png` + bản dọc rút gọn `d2-explain.png`, Read cả 2, commit `feat: câu D2 — đọc EXPLAIN ANALYZE`.

### Task 5 (D3/ep83): JOIN vs N+1 ở tầng SQL

`sql-qa/d3.mjs`: lấy 50 khách + đơn của họ.
- Nhánh A (N+1): 1 query lấy 50 khách rồi vòng lặp 50 query `WHERE customer_id=$1` — đếm số query + tổng ms.
- Nhánh B: 1 query JOIN duy nhất — số query 1 + ms.
- In `== D3: 51 query vs 1 query ==` + kết quả 2 nhánh GIỐNG NHAU (in checksum: tổng số dòng + tổng total) để chứng minh cùng dữ liệu.
- [ ] Chạy 3 lần, report, render `dbqa/d3-nplus1.png`, Read, commit `feat: câu D3 — JOIN vs N+1`.

### Task 6 (D4/ep84): Isolation READ COMMITTED vs REPEATABLE READ

`sql-qa/d4.mjs`: 2 client `pg` riêng (A đọc, B ghi), điều phối bằng await/delay có mốc rõ:
- Vòng 1 (READ COMMITTED): A `BEGIN` → `SELECT total FROM orders WHERE id=1` (giá trị X) → B `UPDATE orders SET total=total+1000 WHERE id=1; COMMIT` → A `SELECT` lại → **thấy giá trị mới** (non-repeatable read) → A `ROLLBACK`.
- Vòng 2 (REPEATABLE READ): lặp lại y hệt với `BEGIN ISOLATION LEVEL REPEATABLE READ` → A đọc lần 2 **vẫn thấy giá trị cũ**.
- In nhãn `[phiên A]`/`[phiên B]` từng bước + `== D4: cùng câu SELECT, 2 kết quả ==`; cuối in tóm tắt 2 vòng.
- [ ] Chạy 3 lần xác nhận ổn định, report, render `dbqa/d4-isolation.png`, Read, commit `feat: câu D4 — isolation level`.

### Task 7 (D5/ep85): Deadlock thật

`sql-qa/d5.mjs`: 2 client. A: `BEGIN; UPDATE orders SET total=total+1 WHERE id=1;` B: `BEGIN; UPDATE orders SET total=total+1 WHERE id=2;` rồi A update id=2 (chờ), B update id=1 → Postgres phát hiện deadlock, hủy 1 phiên với lỗi `deadlock detected` (in NGUYÊN VĂN message + detail + hint), phiên còn lại commit thành công. In `== D5: deadlock detected ==` + ai bị hủy + trạng thái cuối của 2 dòng.
- [ ] Chạy 3 lần (ghi nhận phiên bị hủy có thể đổi — đó là sự thật, ghi report), render `dbqa/d5-deadlock.png`, Read, commit `feat: câu D5 — khóa và deadlock`.

### Task 8 (D6/ep86): OFFSET vs cursor

`sql-qa/d6.mjs`: trang cuối của 500k dòng, `ORDER BY id`.
- A: `SELECT ... ORDER BY id LIMIT 20 OFFSET 499980` — EXPLAIN ANALYZE (rows scanned lớn) + ms.
- B: cursor `SELECT ... WHERE id > $lastId ORDER BY id LIMIT 20` — ms + plan.
- In `== D6: OFFSET 499980 vs cursor ==` + bảng ms/rows + 1 dòng bẫy "cursor cần cột sắp xếp ổn định & unique".
- [ ] Chạy 3 lần, report, render `dbqa/d6-pagination.png`, Read, commit `feat: câu D6 — OFFSET vs cursor`.

### Task 9 (P1/ep87): N+1 trong Prisma

`prisma-qa/p1.mjs`: `new PrismaClient({log:[{emit:'event',level:'query'}]})`, đếm số query qua `p.$on('query', ...)`.
- Nhánh A: `findMany({take:20})` khách rồi vòng lặp `order.findMany({where:{customerId}})` → đếm **21 query** + ms.
- Nhánh B: `customer.findMany({take:20, include:{orders:true}})` → đếm query thật (Prisma dùng 2 query) + ms.
- In `== P1: 21 query vs 2 query ==` + checksum số đơn 2 nhánh bằng nhau.
- [ ] Chạy 3 lần, report (số query là con số BẤT BIẾN — ms phụ), render `dbqa/p1-nplus1.png`, Read, commit `feat: câu P1 — N+1 trong Prisma`.

### Task 10 (P2/ep88): select đúng cột

`prisma-qa/p2.mjs`: `findMany({take:1000})` (mọi cột) vs `findMany({take:1000, select:{id:true,total:true}})`.
- In: kích thước payload `Buffer.byteLength(JSON.stringify(rows))` KB của 2 nhánh + ms + số cột. `== P2: payload 2 cách ==`.
- [ ] 3 lần, report, render `dbqa/p2-select.png`, Read, commit `feat: câu P2 — select đúng cột`.

### Task 11 (P3/ep89): $transaction

`prisma-qa/p3.mjs`: thao tác 2 bước (tạo customer + tạo order tham chiếu), bước 2 CỐ TÌNH lỗi (total vượt kiểu int hoặc customerId sai FK).
- Nhánh A không transaction: bước 1 đã ghi → in count customers TĂNG 1 (dữ liệu nửa vời).
- Nhánh B `$transaction([...])`: lỗi → in count customers KHÔNG đổi (rollback), in nguyên văn lỗi Prisma.
- In `== P3: nửa vời vs rollback sạch ==` + số đếm trước/sau từng nhánh. Dọn dữ liệu rác của nhánh A ở cuối script (in dòng dọn).
- [ ] 3 lần, report, render `dbqa/p3-transaction.png`, Read, commit `feat: câu P3 — $transaction rollback`.

### Task 12 (P4/ep90): Migration an toàn

`prisma-qa/p4.md` (kịch bản lệnh) + thao tác thật trên bảng phụ `notes` (KHÔNG đụng orders/customers để các câu khác không hỏng):
- Tạo bảng `notes` có sẵn 1.000 dòng; sửa schema thêm cột `channel String` (NOT NULL, không default) → `npx prisma migrate dev` FAIL → in NGUYÊN VĂN lỗi.
- Cách 3 bước: thêm cột nullable → backfill `UPDATE notes SET channel='web'` → set NOT NULL (migration thứ 2) → thành công, in kết quả.
- In `== P4: cột NOT NULL trên bảng có data ==` (script `p4.mjs` gói lệnh + in output, hoặc chạy tay và lưu output nguyên văn — ưu tiên script cho lặp lại được).
- [ ] Chạy đủ 2 pha, report (kể cả tên file migration sinh ra), render `dbqa/p4-migration.png`, Read, commit `feat: câu P4 — migration an toàn`.

### Task 13 (P5/ep91): Connection pool cạn

`prisma-qa/p5.mjs`: URL với `?connection_limit=2&pool_timeout=10` vs `?connection_limit=20`; bắn 20 query song song mỗi query `SELECT pg_sleep(0.3)` (qua `$queryRaw`).
- In tổng thời gian 2 cấu hình (pool 2 ≈ 10 lượt × 0.3s ≈ 3s; pool 20 ≈ 0.3s) + số kết nối thực tế `SELECT count(*) FROM pg_stat_activity WHERE datname='dbqa'` lúc cao điểm.
- In `== P5: pool 2 vs pool 20 ==`. Nếu ép pool cạn tới mức timeout thì in nguyên văn lỗi P2024 (tùy hành vi thật — ghi report).
- [ ] 3 lần, report, render `dbqa/p5-pool.png`, Read, commit `feat: câu P5 — connection pool`.

### Task 14 (P6/ep92): Query chậm → tối ưu (case tổng hợp)

`prisma-qa/p6.mjs`: query thực tế "đơn của khách ở 1 thành phố, trạng thái paid, mới nhất 20" bằng Prisma (`where:{status, customer:{city}}, orderBy:{createdAt:'desc'}, take:20`).
- Bước 1: bật log query, in SQL Prisma sinh ra + ms (chậm).
- Bước 2: `EXPLAIN ANALYZE` chính SQL đó qua `pg` (in node chậm nhất).
- Bước 3: tạo index đúng (`CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC)` + index `customers(city)`), `ANALYZE`, chạy lại → ms mới + plan mới.
- In `== P6: từ log chậm tới index đúng ==` + bảng trước/sau.
- [ ] 3 lần (DROP INDEX đầu script để lặp), report, render `dbqa/p6-optimize.png`, Read, commit `feat: câu P6 — query chậm tới index đúng`.

### Task 15: Tag + README + smoke render

- [ ] Inventory `video/public/screens/dbqa/`: đủ ảnh 12 câu, Read từng ảnh (chữ rõ, nhãn `==` vàng, không tràn).
- [ ] Smoke: composition TẠM `DbSmoke` (ngang, TerminalScene với output D1 thật) + `DbSmokeShort` (dọc, VShotScene ảnh `d5-deadlock.png`) → `npx remotion still` (cwd=video/) → Read → XÓA composition (git diff Root.tsx rỗng).
- [ ] `git status` sạch → `git tag db-qa-batch-4` + `git push origin db-qa-batch-4` (KHÔNG push branch).
- [ ] `demo-db-interview/README.md`: cách bật container (`docker compose -p dbqa ... up -d`), seed, chạy từng script, bảng 12 câu ↔ ep ↔ file ↔ ảnh ↔ số đo chốt (từ reports), lưu ý cổng 5433 + KHÔNG đụng container khác; ghi chú tag.
- [ ] Quyết dọn: giữ container `dbqa-pg` CHẠY (giai đoạn 2 cần chụp lại nếu sửa) — ghi rõ trong README cách dừng khi xong hẳn: `docker compose -p dbqa -f demo-db-interview/docker-compose.yml down` (KHÔNG `-v` để giữ data, KHÔNG `docker prune`).
- [ ] Append progress.md + commit `docs: README demo-db-interview + hoàn tất giai đoạn demo lô 4`.

## Self-review

- Spec coverage: 12 câu = Task 3–14 ✓; fact sheet Task 0 ✓; hạ tầng + seed Task 1 ✓; prisma Task 2 ✓; tag/smoke/README Task 15 ✓; cổng 5433 + không đụng container khác ✓ (Global Constraints).
- Placeholder: mọi task có lệnh/SQL cụ thể; P4 chốt dùng bảng phụ `notes` để không phá dữ liệu chung; P5 chốt tham số pool.
- Consistency: `db.mjs` export `pool/q/label` dùng ở mọi task sql-qa; tên ảnh `dbqa/{id}-{state}.png`; container `dbqa-pg`, project `-p dbqa` thống nhất.
