# demo-be-interview — Lô 3 Phỏng vấn Backend (Node.js & NestJS, ep69–ep80)

Demo CHẠY THẬT cho 12 câu phỏng vấn backend (B1–B6 Node core, S1–S6 NestJS).
Mỗi demo in khối output có nhãn `== ... ==`; output nguyên văn được render thành
ảnh terminal chuẩn hóa trong `video/public/screens/beqa/` bằng `tools/term-shot.mjs`.
Số đo thật ghi trong report từng câu tại `.superpowers/sdd/{id}-report.md` (không commit).

**Tag đóng băng demo: `be-qa-batch-3`** — code ≤22 dòng trên video byte-match tag này.

## node-qa — Node thuần (B1–B6)

- Node **v22.21.1** (bản trên máy, đọc trong video) · `"type": "module"` · devDep duy nhất: autocannon 8.0.0.
- Cài: `cd demo-be-interview/node-qa && npm install`.
- Chạy từng câu (đều trong `node-qa/`):

| Lệnh | Ghi chú |
|---|---|
| `node b1.mjs` | Thứ tự event loop, 2 khối (ngoài I/O + trong `fs.readFile`). |
| `node b2.mjs` | Tự spawn `b2-server.mjs` (cổng **3997**, process con), autocannon 10 conn × 5s vào `/sync` và `/async`, tự kill server. |
| `node b3.mjs` | Đồng hồ tick 100ms đo maxGap: pbkdf2Sync ×200 trên main vs cùng khối lượng qua `b3-worker.mjs` (worker_threads). |
| `node b4-make.mjs` rồi `node b4.mjs readfile` và `node b4.mjs stream` | `big.bin` 1 GiB sinh cục bộ (gitignored — sinh lại được, xóa sau khi đo). |
| `node b5.mjs` | Tuần tự vs Promise.all vs fail-fast vs allSettled (fakeApi 300ms). |
| `node b6-cjs.cjs` rồi `node b6.mjs` | CJS vs ESM cùng 4 mục (phụ trợ: `b6-data.json`, `b6-tla-test.cjs`, `b6-sync.mjs`). |

## nest-qa — app NestJS (S1–S6)

- `@nestjs/core` **12.0.1** · cổng **3998** (CẤM 3000) · class-validator 0.15.1 + class-transformer 0.5.1.
- Cài: `cd demo-be-interview/nest-qa && npm install --legacy-peer-deps` (bug arborist npm 10.9.4 — bắt buộc cờ này).
- Chạy: `npm run build && npm run start` (foreground; xong tắt bằng Ctrl+C, kiểm `lsof -i :3998` trống).
- Curl từng câu:

| Câu | Lệnh curl |
|---|---|
| S1 | `curl -s localhost:3998/s1` · `curl -s localhost:3998/s1/again` · `curl -s localhost:3998/s1-mock` |
| S2 | `curl -s 'localhost:3998/s2?msg=hello'` · `curl -s localhost:3998/s2/boom` (bằng chứng = log server) |
| S3 | `curl -i localhost:3998/s3/admin` (401) · thêm `-H "x-token: lee:user"` (403) · `-H "x-token: lee:admin"` (200) · `curl -i localhost:3998/s3/public` |
| S4 | `curl -i -X POST localhost:3998/s4 -H "Content-Type: application/json" -d '{"ten":123,"soLuong":0,"email":"abc"}'` (400) · body đúng → 201 |
| S5 | `curl -i localhost:3998/s5` (bọc + header) · `curl -i localhost:3998/s5/raw` (đối chứng trần) |
| S6 | `curl -i localhost:3998/s6/boom` (filter chuẩn hóa) · `-H 'x-raw: 1'` (cờ DEMO tự chế → hành vi mặc định Nest) · `curl -i localhost:3998/s6/known` (404 giữ nguyên) |

## tools/term-shot — render ảnh terminal từ output thật

```
node tools/term-shot.mjs <input.txt> <out.png> [--wide] [--title "b1 · event loop"]
```

- Mặc định khổ DỌC 620×1281 (chữ 18px, dùng cho vshot/thumbnail); `--wide` → 1280×800 (chữ 16px, browser scene).
- Text giữ nguyên byte (escape HTML); dòng bắt đầu `==` tô vàng, `OK`/`FAIL` xanh/đỏ. Chụp bằng Chrome headless.

## Bảng 12 câu

| id | ep | Câu hỏi | File demo | Ảnh | Số đo chốt (report) |
|---|---|---|---|---|---|
| B1 | ep69 | Event loop: thứ tự chạy, microtask vs macrotask | `node-qa/b1.mjs` | `beqa/b1-order.png` | .mjs: sync → promise → nextTick (ESM đảo promise/nextTick, 12/12 lần); timer vs immediate ngoài I/O ĐẢO thật (4/5 immediate trước); trong I/O immediate thắng 5/5 |
| B2 | ep70 | Non-blocking I/O — 1 thread phục vụ nghìn request | `node-qa/b2.mjs` + `b2-server.mjs` | `beqa/b2-bench.png` | /sync 101.4–104.2 req/s (lat.max 345–496ms) vs /async 308.2–322.6 req/s (lat.max 117–121ms) — gấp 3.0–3.1× |
| B3 | ep71 | CPU-bound chặn event loop → worker_threads | `node-qa/b3.mjs` + `b3-worker.mjs` | `beqa/b3-worker.png` | main maxGap 1858–1921ms (đồng hồ đứng) vs worker 102ms cả 3 lần; spawn 26–45ms; hash 2 nhánh khớp |
| B4 | ep72 | Stream & backpressure — đọc file 1GB | `node-qa/b4.mjs` + `b4-make.mjs` | `beqa/b4-rss.png` | RSS đỉnh readFile 1071 MB vs stream 97 MB; highWaterMark thật 65536 bytes; readFile 203ms / stream 315ms |
| B5 | ep73 | Promise.all vs await tuần tự (+ bẫy fail-fast) | `node-qa/b5.mjs` | `beqa/b5-timing.png` | tuần tự 906–907ms vs all 302–303ms (3×); fail-fast nổ 103ms, 2 promise kia vẫn settle ~302ms; allSettled 302ms đủ 3 trạng thái |
| B6 | ep74 | CommonJS vs ESM trong Node hiện nay | `node-qa/b6.mjs` + `b6-cjs.cjs` | `beqa/b6-compare.png` | deterministic 2/2 lần: CJS có __dirname, FAIL top-level await; ESM ngược lại, JSON cần `with {type:'json'}`; require(ESM đồng bộ) OK từ Node 22.12 |
| S1 | ep75 | DI/IoC — vì sao NestJS xây quanh nó | `nest-qa/src/s1/` | `beqa/s1-di.png` | /s1 → price 100, /s1-mock (useValue) → price 1; constructor service chạy ĐÚNG 1 lần lúc boot (singleton) |
| S2 | ep76 | Request lifecycle: middleware→guard→interceptor→pipe→handler→filter | `nest-qa/src/s2/` | `beqa/s2-lifecycle.png` | 1 request in đủ [1]→[5] đúng thứ tự docs; /s2/boom: KHÔNG có [5], lỗi rơi thẳng xuống [F] filter |
| S3 | ep77 | Guard vs Middleware — auth đặt ở đâu | `nest-qa/src/s3/` | `beqa/s3-auth.png` | 3 case thật: không token 401 · role=user 403 (Nest mặc định) · role=admin 200; middleware chỉ gắn req.user, không chặn |
| S4 | ep78 | Pipe + DTO validation (class-validator) | `nest-qa/src/s4/` | `beqa/s4-validate.png` | body sai 3 field → 400 mảng đúng 3 message; whitelist gọt field lạ `hack`; body đúng → 201 echo |
| S5 | ep79 | Interceptor — transform response + đo thời gian | `nest-qa/src/s5/` | `beqa/s5-intercept.png` | body bọc `{ok,data,tookMs:121}` + header `X-Response-Time: 121ms` (handler delay 120ms); /s5/raw trần không header |
| S6 | ep80 | Exception filter — chuẩn hóa error toàn app | `nest-qa/src/s6/` | `beqa/s6-filter.png` | mặc định 500 `Internal server error` (qua cờ demo x-raw) vs filter `{code,message,path,timestamp}`; /s6/known giữ 404 + message; stack chỉ log server-side |

## Ghi chú

- Mọi số đo là "trên máy tôi" — dải nhiều lần chạy ghi trong report từng câu; số bất biến (thứ tự log, mã HTTP, chênh lệch bậc) ưu tiên khi lên video.
- `x-raw: 1` (S6) là cờ demo TỰ CHẾ để 1 server show cả hành vi trước/sau filter — không phải tính năng Nest, video khai rõ.
- Tag `be-qa-batch-3` đóng băng toàn bộ demo sau khi 12 câu verified + smoke render pipeline (TerminalScene + VShotScene) đạt.
