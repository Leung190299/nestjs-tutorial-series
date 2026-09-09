# demo-db-interview — 12 demo chạy thật cho lô 4 "Phỏng vấn Database"

Bộ demo đứng sau **12 tập ep81–ep92** (Phỏng vấn FE #37–#48): 6 câu SQL/PostgreSQL
(`D1–D6`) + 6 câu Prisma/thực chiến (`P1–P6`). Mỗi script chạy THẬT trên PostgreSQL 17.11
trong Docker rồi in một khối bằng chứng có nhãn `== ... ==`; ảnh terminal trong
`video/public/screens/dbqa/` render nguyên văn từ output đó.

Trạng thái đóng băng: tag **`db-qa-batch-4`**.

```
demo-db-interview/
├── docker-compose.yml    # postgres:17-alpine · container dbqa-pg · cổng 5433
├── sql-qa/               # db.mjs + seed.mjs + d1.mjs … d6.mjs   (node-postgres)
├── prisma-qa/            # p1.mjs p2.mjs p3.mjs p5.mjs p6.mjs    (Prisma trên DB dbqa)
└── prisma-mig/           # p4.mjs + prisma/migrations/           (DB RIÊNG dbqa_mig)
```

---

## 0. Yêu cầu

- Docker đang chạy (máy này dùng **colima**).
- Node v22.21.1 (bất kỳ Node 20+ đều được).
- ⚠️ **Máy này CHỈ có binary `docker-compose`, KHÔNG có plugin `docker compose`.**
  Mọi lệnh dưới đây viết đúng theo binary đó. (`docker compose version` trả về
  `docker: unknown command: docker compose`.) Header comment trong `docker-compose.yml`
  viết `docker compose` — đọc là `docker-compose` trên máy này.

## 1. Bật Postgres

```bash
# chạy từ gốc repo
docker-compose -p dbqa -f demo-db-interview/docker-compose.yml up -d

# đợi healthy rồi kiểm tra
docker ps --filter name=dbqa-pg
docker exec dbqa-pg psql -U dbqa -d dbqa -c "select version();"
```

- Project name `-p dbqa` là **bắt buộc** — máy còn container của project khác
  (`wp-ai-chatbot-rag-*`, cổng 8080/3306) không được đụng tới.
- Cổng **5433** (không phải 5432) để không đụng Postgres nào cài sẵn.
- DB / user / password đều là `dbqa`.

## 2. Seed dữ liệu dùng chung (chạy MỘT lần)

```bash
cd demo-db-interview/sql-qa
npm install                 # dependency duy nhất: pg
node seed.mjs               # in "== seed xong: N khách, M đơn, mất X ms =="
```

Sinh **5.000 `customers` + 500.000 `orders`**, KHÔNG tạo index nào ngoài PK
(D1 mới là câu tạo index đầu tiên). Kiểm nhanh:

```bash
docker exec dbqa-pg psql -U dbqa -d dbqa -c "select count(*) from orders;"   # 500000
```

## 3. Chạy 6 câu SQL (D1–D6)

```bash
cd demo-db-interview/sql-qa
node d1.mjs            # + `node d1.mjs --full` cho ảnh ngang (plan đầy đủ)
node d2.mjs            # `--read` = khối đọc plan · `--plan` = plan đầy đủ
node d3.mjs
node d4.mjs
node d5.mjs
node d6.mjs
```

Mọi script **chạy lại được vô hạn lần**: d1 tự `DROP INDEX` ở đầu, d4/d5 tự khôi phục
giá trị `total` đã sửa, d6 chỉ đọc.

## 4. Chạy 5 câu Prisma trên DB `dbqa` (P1, P2, P3, P5, P6)

```bash
cd demo-db-interview/prisma-qa
npm install                  # ⚠️ xem ghi chú PIN prisma bên dưới
npx prisma generate
node p1.mjs
node p2.mjs
node p3.mjs
node p5.mjs
node p6.mjs
```

`.env` (đã commit, chỉ là demo cục bộ): `DATABASE_URL="postgres://dbqa:dbqa@localhost:5433/dbqa"`.

### ⚠️ PIN `prisma@6.19.3` — KHÔNG cài `prisma` trơn

`npm i prisma` sẽ kéo về **bản RC 8**, gây crash npm. `package.json` đã pin
`prisma` + `@prisma/client` ở `^6.19.3`; nếu phải cài lại thì ghi rõ version:

```bash
npm i prisma@6.19.3 @prisma/client@6.19.3
```

## 5. Chạy P4 — migration (DB RIÊNG `dbqa_mig`)

```bash
# tạo DB riêng nếu chưa có
docker exec dbqa-pg psql -U dbqa -d dbqa -c "CREATE DATABASE dbqa_mig;"

cd demo-db-interview/prisma-mig
npm install
node p4.mjs
```

### 🚨 Vì sao P4 phải có DB riêng

`customers`/`orders` được tạo bằng SQL thuần (`sql-qa/seed.mjs`), **không nằm trong lịch
sử migration nào**. Nếu trỏ `prisma migrate dev` vào `dbqa`, Prisma coi 2 bảng đó là
**drift** và ĐÒI RESET DATABASE → mất 505.000 dòng seed, phá sạch D1–D6 và P1–P3/P5/P6.

Vì vậy P4 chạy trên database **`dbqa_mig`** trong CÙNG container `dbqa-pg`. `p4.mjs` có
`assertMigDb()` chặn cứng: `DATABASE_URL` không kết thúc bằng `/dbqa_mig` là thoát ngay;
cuối script tự đếm lại `orders`/`customers` của `dbqa` và in ra làm bằng chứng an toàn.

**TUYỆT ĐỐI không chạy lệnh `prisma migrate` nào với `DATABASE_URL` trỏ `dbqa`.**

`p4.mjs` sinh migration mới mỗi lần chạy trong sandbox `.p4-run/` (gitignore);
`prisma/migrations/` đang commit là bản chụp của lần chạy chính thức — chính lần in ra
ảnh `p4-migration.png` — để video byte-match được.

---

## 6. Bảng 12 câu — id ↔ ep ↔ câu hỏi ↔ file ↔ ảnh ↔ số đo chốt

Ưu tiên **con số bất biến** khi đọc lời bình; ms chỉ nói "trên máy tôi".

| id | ep | Câu hỏi | File | Ảnh (`video/public/screens/dbqa/`) | Số đo chốt (từ report) |
|---|---|---|---|---|---|
| D1 | ep81 | Index làm gì? Seq Scan vs Index Scan | `sql-qa/d1.mjs` | `d1-index.png` + `d1-index-wide.png` | 61 đơn / 500.000 (0.012%) · buffers **3604 → 63 trang = ít hơn 57.2x** · EXPLAIN 7.73–8.53 → 0.10–0.16 ms (**11.8–14.0x**) · CREATE INDEX 70–79 ms · index nặng 3496 kB · `Gather → Parallel Seq Scan` ⟶ `Bitmap Heap Scan → Bitmap Index Scan` |
| D2 | ep82 | Đọc `EXPLAIN (ANALYZE, BUFFERS)` thế nào | `sql-qa/d2.mjs` | `d2-explain.png` + `d2-explain-wide.png` | Cây `Limit → Gather Merge → Sort → Hash Join → Parallel Seq Scan ‖ Hash → Seq Scan` · `cost=7948.36..7950.70` · lệch rows: Gather Merge **1677x**, node quét chỉ **1.3x** · `loops=3` ⇒ `55366 × 3 = 166098` dòng · `Buffers: shared hit=3876` (read=0) · `Sort Method: top-N heapsort Memory: 27kB` · Execution 18.03–25.50 ms |
| D3 | ep83 | JOIN vs N+1 ở tầng SQL | `sql-qa/d3.mjs` | `d3-nplus1.png` | **51 query vs 1 query** (bất biến) · 4881 dòng · checksum `SUM(total)=12244954433` KHỚP 2 nhánh · 24.39–25.82 ms vs 15.85–16.55 ms (**chỉ 1.5–1.6x** — localhost, round-trip gần như miễn phí) |
| D4 | ep84 | Isolation: READ COMMITTED vs REPEATABLE READ | `sql-qa/d4.mjs` | `d4-isolation.png` | Vòng 1 (RC): A đọc `4518520` → `4519520` **ĐỔI** · Vòng 2 (RR): B đã commit `4520520` mà A đọc lại vẫn `4519520` **GIỮ** — con số A thấy KHÔNG còn tồn tại trong bảng · output 3 run giống nhau **từng byte** |
| D5 | ep85 | Khóa & deadlock | `sql-qa/d5.mjs` | `d5-deadlock.png` | `code=40P01` · `message = deadlock detected` (không tiền tố `ERROR:`, không tên bảng) · `hint = See server log for query details.` · thời gian tới lúc văng lỗi **999 / 1128 / 1008 ms** ≈ `deadlock_timeout = 1s` · CẢ HAI dòng đều +1 · PID/transaction id **đổi mỗi lần chạy** · nạn nhân KHÔNG được coi là đoán trước được |
| D6 | ep86 | Pagination OFFSET vs cursor | `sql-qa/d6.mjs` | `d6-pagination.png` | **Cùng một node `Index Scan using orders_pkey` ở CẢ HAI nhánh** · rows ở node quét **500000 vs 20**, vứt bỏ **499980 vs 0** · buffers **hit=4974 vs hit=4 (ít hơn 1243x)** · cursor có `Index Cond: (id > 499980)` · query thường ~21.7 ms vs ~0.38 ms (**~50–68x**), `Execution Time` chênh **bậc nghìn lần** |
| P1 | ep87 | N+1 trong ORM | `prisma-qa/p1.mjs` | `p1-nplus1.png` | **21 query vs 2 query** (bất biến; 24 query warm-up đã loại) · 1964 dòng · checksum `4873155036` KHỚP · ms 19.72–21.77 vs 13.53–19.70 (**nhiễu — ms KHÔNG phải beat của câu này**) · cặp chéo với D3 (51 vs 1) |
| P2 | ep88 | `select` đúng cột vs lấy cả bảng | `prisma-qa/p2.mjs` | `p2-select.png` | **5 cột vs 2 cột (-60%)** · payload **97.9 KB vs 26.1 KB (-73.4%)** — bất biến 3/3 · byte thật 100.271 B vs 26.679 B · ms 3.80–4.29 vs 3.14–3.83 (**chỉ -10.9…-17.4%: `select` KHÔNG tự làm query nhanh**) · checksum `2513527232` |
| P3 | ep89 | `$transaction` — nhất quán khi 1 bước lỗi | `prisma-qa/p3.mjs` | `p3-transaction.png` | [A] không tx: customers **5000 → 5001** (rác nửa vời) · [B] `$transaction`: **TRƯỚC = SAU**, không đổi · `orders` 500000 → 500000 ở cả 2 nhánh · lỗi giống hệt: `ConversionError("Unable to fit integer value '2147483648' into an INT4 …")` · log nhánh B có `BEGIN … ROLLBACK` · cuối script dọn 1 rác |
| P4 | ep90 | Migration an toàn (thêm cột NOT NULL trên bảng có data) | `prisma-mig/p4.mjs` | `p4-migration.png` | **Chạy trên `dbqa_mig`, KHÔNG phải `dbqa`** · pha 1 exit code **1**, KHÔNG hỏi reset, KHÔNG sinh file migration (`We found changes that cannot be executed … There are 1000 rows in this table`) · pha 2 = **3 migration**: nullable → backfill → `SET NOT NULL` · kết quả `channel` `is_nullable=NO`, **1000/1000 = 'web'**, 0 NULL · `dbqa` vẫn 500000 / 5000 ✅ |
| P5 | ep91 | Connection pool cạn | `prisma-qa/p5.mjs` | `p5-pool.png` | Kết nối cao điểm **2 / 20 / 1** (bất biến) · lỗi **0 / 0 / 16** · [A] pool 2 ≈ 3032–3048 ms · [B] pool 20 ≈ 357–374 ms (**8.1–8.5x**) · [C] pool 1 + `pool_timeout=1` → **4 OK / 16 `P2024`** "Timed out fetching a new connection from the connection pool" · `max_connections = 100` · ⚠️ `pool_timeout=0` là TẮT timeout |
| P6 | ep92 | Query chậm → tối ưu (case tổng hợp) | `prisma-qa/p6.mjs` | `p6-optimize.png` | Dòng chạm **166.098 → 93 = ít hơn 1786x** · buffers **3876 → 373 = 10.4x** · [A] 15.58–16.38 ms → [C] 0.64–0.74 ms (**21–26x**) · **index đơn `orders(status)` bị planner BỎ QUA** (lọc 33% bảng), chỉ index tổ hợp `orders(status, created_at DESC)` mới ăn · `customers(city)` cũng KHÔNG được dùng (plan y hệt) · `Memoize Hits: 0 Misses: 93` |

Cặp chéo: **D3 ↔ P1** (N+1 hai tầng: 51 vs 1 ở SQL, 21 vs 2 ở ORM) ·
**D1 ↔ P6** (index cứu query chậm).

## 7. Trạng thái index để lại trong DB `dbqa`

Sau khi chạy hết 12 câu, `orders` + `customers` còn đúng 4 index:

| index | định nghĩa | kích thước | của ai |
|---|---|---|---|
| `orders_pkey` | `UNIQUE btree (id)` | 11 MB | seed |
| `customers_pkey` | `UNIQUE btree (id)` | 128 kB | seed |
| `idx_orders_customer` | `btree (customer_id)` | 3496 kB | **D1 — để lại** |
| `idx_orders_status_created` | `btree (status, created_at DESC)` | 3576 kB | **P6 — để lại** (index duy nhất chứng minh được là có ích) |

Đã DROP và **không để lại**: `idx_orders_status`, `idx_customers_city` (P6 đo được là
planner không thèm dùng). Kiểm lại bất cứ lúc nào:

```bash
docker exec dbqa-pg psql -U dbqa -d dbqa \
  -c "select indexname from pg_indexes where tablename in ('orders','customers') order by 1;"
```

## 8. Dừng khi xong hẳn

Giai đoạn 2 (dựng video) có thể cần chụp lại ảnh → **giữ container `dbqa-pg` CHẠY**.
Khi thật sự xong:

```bash
docker-compose -p dbqa -f demo-db-interview/docker-compose.yml down
```

- **KHÔNG dùng `-v`** — cờ đó xoá volume `dbqa-data`, mất 500k dòng seed, muốn chụp lại
  ảnh phải seed từ đầu.
- **KHÔNG chạy `docker system prune` / `docker volume prune`** dưới bất kỳ hình thức nào:
  máy còn container của project khác (`wp-ai-chatbot-rag-wordpress-1`,
  `wp-ai-chatbot-rag-db-1`) đang chạy.
- Không tắt colima.

## 9. Tag

Toàn bộ giai đoạn demo lô 4 được đóng băng ở tag **`db-qa-batch-4`**
(`git push origin db-qa-batch-4`, KHÔNG push branch). Kịch bản video ep81–ep92 phải
byte-match code/ảnh tại đúng tag này:

```bash
git show db-qa-batch-4 --stat
git checkout db-qa-batch-4 -- demo-db-interview/
```

Report chi tiết từng câu (dải số 3–4 lần chạy, output nguyên văn, các "sự thật khó chịu"
không sửa cho đẹp): `.superpowers/sdd/{d1..d6,p1..p6}-report.md`.
