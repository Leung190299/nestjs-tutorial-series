# Series Phỏng vấn — Lô 4: Database & SQL (câu #37–#48)

Ngày: 2026-09-09. Trạng thái: đã duyệt ("duyệt — làm luôn").
Fact sheet: `.superpowers/sdd/db-interview-research.md` (viết ở Task 0 plan demo).

## Mục tiêu

Lô 4 của series phỏng vấn, tiếp số công khai **Phỏng vấn FE #37–#48**, đăng nối
playlist "Phỏng vấn Frontend 🇻🇳" PLYvXt5cUP0yE: 12 câu database — 6 SQL core trên
PostgreSQL (D1–D6) + 6 câu Prisma/thực chiến (P1–P6). Mỗi câu = 1 video ngang
16:9 2–3 phút (ep81–ep92) + 1 Shorts dọc <60s (sd1–sd6 cho SQL, sp1–sp6 cho Prisma).
Tổng 24 video.

Công thức 3 nhịp giữ nguyên: **Câu hỏi → Demo CHẠY THẬT in bằng chứng ra terminal
(số đo thật) → Trả lời chuẩn như đi phỏng vấn** (chốt 2–3 câu + bẫy).

## Danh sách 12 câu (đã duyệt)

| id | ep | Câu hỏi | Bằng chứng terminal |
|---|---|---|---|
| D1 | ep81 | Index làm gì? Seq Scan vs Index Scan | cùng query: ms trước/sau CREATE INDEX + plan đổi |
| D2 | ep82 | Đọc EXPLAIN (ANALYZE, BUFFERS) thế nào | plan thật: node, cost ước lượng vs actual time, rows, buffers |
| D3 | ep83 | JOIN vs subquery vs N+1 ở tầng SQL | 1 JOIN vs vòng lặp N query: số query + tổng ms |
| D4 | ep84 | Transaction & isolation: READ COMMITTED vs REPEATABLE READ | 2 phiên psql song song, cùng SELECT ra 2 kết quả khác nhau |
| D5 | ep85 | Khóa & deadlock | dựng deadlock thật → Postgres in "deadlock detected", hủy 1 phiên |
| D6 | ep86 | Pagination OFFSET vs cursor | OFFSET lớn vs WHERE id > cursor: ms + rows scanned |
| P1 | ep87 | N+1 trong ORM | log Prisma: 1+N câu SELECT → include còn 2 |
| P2 | ep88 | select đúng cột vs lấy cả bảng | kích thước payload + ms |
| P3 | ep89 | $transaction — nhất quán khi 1 bước lỗi | không transaction: dữ liệu nửa vời; có: rollback sạch |
| P4 | ep90 | Migration an toàn (thêm cột NOT NULL trên bảng có data) | migrate FAIL nguyên văn → cách 3 bước thành công |
| P5 | ep91 | Connection pool cạn | pool nhỏ vs lớn: thời gian chờ/timeout thật |
| P6 | ep92 | Query chậm → tối ưu (case tổng hợp) | từ log chậm → EXPLAIN → index đúng → ms mới |

Shorts: D1..D6 → sd1..sd6, P1..P6 → sp1..sp6.
Cặp chéo: D3↔P1 (N+1 hai tầng, hai chiều), D1↔P6 (index cứu query chậm),
ep87 nhắc playlist NestJS cũ nếu hợp.

## Demo — `demo-db-interview/`

```
demo-db-interview/
├── docker-compose.yml   # postgres:17-alpine, cổng 5433, volume tạm, POSTGRES_PASSWORD demo
├── sql-qa/              # seed.mjs (sinh ~500k đơn hàng) + d1.mjs..d6.mjs (pg client, in bằng chứng)
└── prisma-qa/           # schema.prisma + p1.mjs..p6.mjs (Prisma Client, log query)
```

- Postgres qua Docker (colima) cổng **5433** — KHÔNG dùng 5432 để tránh đụng cài đặt sẵn;
  container tên `beqa-pg` riêng, `docker compose down -v` khi xong mỗi phiên; dữ liệu
  seed sinh cục bộ (faker đơn giản, không mạng ngoài).
- Mỗi script in khối có nhãn `== ... ==` như lô 3; số đo chạy ≥3 lần ghi dải vào report;
  D4/D5 cần 2 phiên song song → script tự mở 2 connection và điều phối bằng delay/mốc,
  in nhãn `[phiên A]` / `[phiên B]` để ảnh tự kể chuyện.
- Ảnh: render từ output thật bằng `demo-be-interview/tools/term-shot.mjs` (tái dùng
  nguyên, đã có guard chống cắt chữ; dọc 620×1281 + `--wide` khi cần) → lưu
  `video/public/screens/dbqa/{d1..d6,p1..p6}-*.png`.
- Tag `db-qa-batch-4` đóng băng khi demo xong.

## Pipeline video

- Ngang: khuôn title → concept → code → terminal → concept → outro (tách 2 scene
  terminal khi >13 dòng — bài học lô 3). Code scene: query SQL dùng language `"sql"`,
  script JS `"javascript"`, schema Prisma `"javascript"` (prisma chưa chắc có
  highlighter — kiểm ở Task 0 pipeline, fallback `"clike"`).
- Shorts: vtitle framework MỚI `postgres` (nền #336791 chữ trắng, label "PostgreSQL")
  và `prisma` (nền #2D3748 chữ trắng, label "Prisma") — validator + VTitleScene mở rộng.
- Mọi luật tích lũy giữ nguyên: byte-match code tại tag, ≤22 dòng liên tiếp, step cuối
  chạm dòng cuối, ≤200 ký tự/câu, ngang 150–180s, Shorts ≤1800 frames, verify frame
  end−1.5s, chapters SEO sinh bằng script, mp4 đúng tên `video/out/epXX.mp4` +
  `sdX.mp4`/`spX.mp4` (render với cwd=video/).

## SEO & đăng

`docs/seo-youtube.md` mục "Phỏng vấn FE #37..#48" + bảng "Shorts lô 4"
(placeholder [LINK-EP81..92] + [LINK-SHORT-37..48]); nối playlist PLYvXt5cUP0yE.
Đăng CHỈ khi có lệnh; script = copy `yt_upload_feqa3.py` đổi EPS/SHORTS/start=37/
mốc cắt "### Shorts lô 4"/assert 48 sections.

## Rủi ro

- Docker/colima phải chạy: nếu colima không khởi động được thì DỪNG và báo user
  (không âm thầm đổi sang SQLite — mất D4/D5 isolation/deadlock).
- Seed 500k dòng tốn thời gian/ổ đĩa → seed 1 lần, tái dùng cho mọi câu; ghi thời gian
  seed vào report.
- Số ms Postgres dao động theo cache → chạy ≥3 lần, video nói "trên máy tôi", ưu tiên
  con số bất biến (plan node, số query, rows scanned).
- D4/D5 điều phối 2 phiên dễ flaky → thiết kế mốc chờ rõ ràng, chạy lại 3 lần xác nhận
  cùng kết quả trước khi chụp.
