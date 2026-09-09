# Lô 3 Phỏng vấn Backend — Giai đoạn 1: fact sheet + demo-be-interview + ảnh terminal + tag be-qa-batch-3

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 (research) và Task 1–2 (scaffold + tool ảnh) TRƯỚC, rồi mỗi câu = 1 task tuần tự, cuối cùng Task 15. Mọi implementer TỰ LÀM foreground, KHÔNG spawn agent con/background.

**Goal:** Fact sheet backend có nguồn + `demo-be-interview/` (node-qa 6 script + nest-qa app cổng 3998) với 12 demo verified in bằng chứng thật, ảnh terminal chuẩn hóa trong `video/public/screens/beqa/`, tag `be-qa-batch-3`.

**Architecture:** Demo chạy THẬT in output có nhãn; output thô lưu vào report từng câu; ảnh "terminal" KHÔNG chụp cửa sổ thật mà RENDER từ đúng output đã bắt được qua template HTML terminal-style + Chrome headless (chữ to, 2 khổ: dọc 620×1281 cho vshot/thumb + ngang 1280×800 cho browser scene) — trung thực (text thật) và đồng nhất mọi ảnh. Scene ngang ưu tiên TerminalScene (nhận text, khỏi cần ảnh) — browser scene chỉ dùng khi cần 2 khung so sánh.

**Tech Stack:** Node bản trên máy (`node -v` ghi fact sheet) · autocannon (dev dep node-qa) · Nest CLI bản hiện tại (pin fact sheet) · Chrome headless (đã dùng từ series StyleX) · curl.

## Global Constraints

- 12 câu B1–B6/S1–S6 = ep69–ep80 theo bảng spec `docs/superpowers/specs/2026-09-09-be-interview-batch3-design.md`.
- Cổng nest-qa **3998** (CẤM 3000; 5195–5199 của reviewer/demo cũ cũng tránh). Không gọi mạng ngoài; file 1GB (B4) sinh cục bộ + gitignore.
- Số đo phải THẬT (chạy nhiều lần, ghi dải vào report); output demo có NHÃN rõ (khối `== ... ==`) để ảnh tự kể chuyện.
- Ảnh: `video/public/screens/beqa/{id}-{state}.png` (dọc, mặc định cho vshot/thumb) + `{id}-{state}-wide.png` (ngang, khi tập cần browser scene 2 khung). Text trong ảnh phải ĐÚNG NGUYÊN VĂN output đã chạy (tool nhận file .txt).
- Report từng câu `.superpowers/sdd/{id}-report.md` + append `progress.md` mỗi task; KHÔNG commit `.superpowers/`, KHÔNG commit file 1GB.
- Verify = chạy lệnh thật + đọc output + Read ảnh render; server Nest chạy foreground khi test rồi tắt (không nền qua lượt).

---

### Task 0: Fact sheet backend `.superpowers/sdd/be-interview-research.md`

- [ ] Mỗi câu B1–B6/S1–S6: câu hỏi; trả lời chuẩn 3 câu tiếng Việt; bẫy; cơ chế đúng thuật ngữ docs; link nguồn XÁC MINH bằng WebFetch: nodejs.org guides (event-loop-timers-and-nexttick, dont-block-the-event-loop, backpressuring-in-streams), api docs (worker_threads, cluster, stream, esm/packages), MDN (Promise.all/allSettled), docs.nestjs.com (providers, faq/request-lifecycle, guards, pipes, interceptors, exception-filters, middleware). Ghi version: `node -v`, `npm view @nestjs/core version`, autocannon version.
- [ ] Mục "Cặp chéo": B3↔#18(RN chia lô)↔#24(Flutter Isolate) — 1 đoạn; S2↔series NestJS cũ ep05–08 (đã có video riêng về lifecycle — lô này góc PHỎNG VẤN, trả lời ngắn).
- [ ] Claim docs không xác nhận → đánh dấu ❓ "đo thực nghiệm". Append progress.md "Task 0 lô 3 DONE".

### Task 1: Scaffold `node-qa` + tool render ảnh terminal

**Files:** Create `demo-be-interview/node-qa/{package.json,.gitignore}`, `demo-be-interview/tools/term-shot.mjs` + `demo-be-interview/tools/term-template.html`.

**Interfaces — Produces:** `node tools/term-shot.mjs <input.txt> <out.png> [--wide] [--title "b1 · event loop"]` — render text vào khung terminal giả (nền #0d1117, monospace ≥17px dọc / ≥15px ngang, thanh title có chấm đỏ-vàng-xanh + nhãn title), khổ dọc 620×1281 mặc định, `--wide` 1280×800; dùng Chrome headless `--screenshot` + CDP setDeviceMetricsOverride như series StyleX. Text giữ nguyên byte (escape HTML), hỗ trợ tô màu dòng bắt đầu `==` (vàng) và `OK`/`FAIL` (xanh/đỏ).

- [ ] `node-qa/package.json` (`"type": "module"`, devDep autocannon), npm install; `.gitignore`: node_modules, big.bin.
- [ ] Viết term-template.html + term-shot.mjs (đọc txt → inject → chụp). Smoke: tạo sample.txt vài dòng có `==` label → render dọc + ngang → Read 2 ảnh xác nhận chữ to rõ, khung đẹp → xóa sample.
- [ ] Smoke TerminalScene: xem tts/scripts cũ dùng scene terminal thế nào (grep ep05–ep12), still 1 frame composition cũ nếu nhanh — chỉ cần xác nhận schema nhận lines/text để các task sau viết đúng. Ghi schema vào report task.
- [ ] Commit `feat: scaffold node-qa + tool term-shot (render ảnh terminal từ output thật)`.

### Task 2: Scaffold `nest-qa` (cổng 3998)

- [ ] `cd demo-be-interview && npx @nestjs/cli@latest new nest-qa --package-manager npm --skip-git` (pin version report). main.ts listen 3998. Xóa controller mẫu thừa, giữ AppModule trống sạch.
- [ ] Chạy `npm run start` foreground, curl `http://localhost:3998` xác nhận sống, tắt server. Commit `feat: scaffold nest-qa (NestJS, cổng 3998)`.

### Task 3 (B1/ep69): Event loop — thứ tự log

`node-qa/b1.mjs`: in nhãn `== B1: thứ tự event loop ==` rồi đoạn code kinh điển: log sync → setTimeout 0 → setImmediate → process.nextTick → Promise.then → log cuối sync; in kèm chú thích từng dòng khi nó chạy (`[1] sync`, `[2] nextTick`...). Chạy 3 lần xác nhận thứ tự ổn định (setTimeout vs setImmediate ngoài I/O cycle có thể đảo — nếu đảo thật thì ĐÓ là beat dạy, ghi report + thêm biến thể trong `fs.readFile` callback để thấy immediate thắng — theo docs). Ảnh: `b1-order.png` (+`-wide` nếu cần 2 cột so sánh 2 ngữ cảnh).

- [ ] Implement, chạy, lưu output thật vào report, render ảnh, Read xác nhận, commit `feat: câu B1 — thứ tự event loop`.

### Task 4 (B2/ep70): Non-blocking I/O + autocannon

`node-qa/b2-server.mjs`: http server 2 route `/sync` (đọc file ~5MB bằng readFileSync + pbkdf2Sync nhẹ để mô phỏng chờ) và `/async` (readFile promise). `node-qa/b2.mjs`: chạy autocannon 2 đợt (10 conn, 5s) vào từng route qua API autocannon, in `== B2: req/s sync vs async ==` + bảng req/s, latency avg/max thật. Server chạy foreground trong cùng process test (spawn con trong b2.mjs được — process con của demo, KHÔNG phải background agent; kill khi xong). Ảnh: `b2-bench.png`.

- [ ] Implement, đo (ghi dải 3 lần chạy), render, Read, commit `feat: câu B2 — non-blocking I/O + autocannon`.

### Task 5 (B3/ep71): CPU-bound — worker_threads

`node-qa/b3.mjs`: đồng hồ tick 100ms in gap như N6 lô 2 (đo maxGap); nhánh 1 `pbkdf2Sync` ×N (~1–2s) trên main → gap lớn; nhánh 2 cùng khối lượng qua `worker_threads` (Worker chạy pbkdf2 rồi postMessage) → gap nhỏ; in `== B3: main thread vs worker ==` + maxGap + tổng ms + kết quả hash khớp. Ảnh: `b3-blocked.png`, `b3-worker.png` (hoặc 1 ảnh 2 khối). Nhắc cluster trong fact sheet (kể miệng — demo worker đủ).

- [ ] Implement, đo, render, Read, commit `feat: câu B3 — worker_threads vs main thread`.

### Task 6 (B4/ep72): Stream & backpressure — RSS

`node-qa/b4-make.mjs` sinh `big.bin` 1GB (gitignored). `node-qa/b4.mjs`: nhánh 1 `readFile` cả file rồi ghi ra `/dev/null` — in RSS trước/đỉnh/sau (`process.memoryUsage().rss`, poll 50ms); nhánh 2 `createReadStream().pipe(createWriteStream('/dev/null'))` highWaterMark mặc định — in RSS đỉnh; in `== B4: RSS readFile vs stream ==` + số MB thật + thời gian. Ảnh: `b4-rss.png`.

- [ ] Implement, đo, render, Read, commit `feat: câu B4 — stream backpressure RSS` (KHÔNG commit big.bin).

### Task 7 (B5/ep73): Promise.all vs tuần tự

`node-qa/b5.mjs`: `fakeApi(name, 300)` (setTimeout promise); nhánh 1 await 3 cái tuần tự — đo ~900ms; nhánh 2 `Promise.all` — ~300ms; nhánh 3 bẫy: 1 trong 3 reject → Promise.all fail-fast (in lỗi + 2 kết quả kia bị bỏ) vs `Promise.allSettled` in đủ 3 trạng thái. In `== B5: tuần tự 90Xms · all 30Xms · allSettled đủ 3 ==`. Ảnh: `b5-timing.png`.

- [ ] Implement, đo, render, Read, commit `feat: câu B5 — Promise.all vs tuần tự + allSettled`.

### Task 8 (B6/ep74): CommonJS vs ESM

`node-qa/b6.mjs` (ESM) + `node-qa/b6-cjs.cjs` (CJS cùng logic): mỗi file in module system đang chạy, thử `__dirname` (CJS có, ESM ReferenceError → `import.meta.url` + fileURLToPath), CJS `require` JSON ok vs ESM cần `with { type: 'json' }` (chạy thật theo Node bản máy — hành vi thế nào ghi nấy), top-level await (ESM ok, CJS SyntaxError bắt qua chạy thử). In `== B6: CJS vs ESM ==` từng mục OK/FAIL. Ảnh: `b6-compare.png` (wide 2 cột nếu đẹp hơn).

- [ ] Implement, chạy cả 2, render, Read, commit `feat: câu B6 — CommonJS vs ESM`.

### Task 9 (S1/ep75): NestJS DI/IoC

nest-qa: `src/s1/` — `PriceService` (getPrice trả 100), `S1Controller` GET /s1 inject service; provider thứ 2 đăng ký `{ provide: PriceService, useValue: { getPrice: () => 1 } }` bật qua query `?mock=1`? — KHÔNG hack: làm 2 module nhỏ (S1Module thật, S1MockModule dùng useValue) mount 2 route /s1 và /s1-mock. Bằng chứng: curl 2 route ra 2 giá trị + log constructor chạy 1 lần (singleton). Output curl + log gom vào `s1.txt` → ảnh `s1-di.png`.

- [ ] Implement, `npm run start` foreground, curl, tắt server, render, Read, commit `feat: câu S1 — DI/IoC useValue`.

### Task 10 (S2/ep76): Request lifecycle

`src/s2/`: middleware + guard (luôn true) + interceptor (before/after) + pipe (custom log) + handler + filter (route /s2/boom ném lỗi) — MỖI lớp `console.log('[2] Guard')` đánh số đúng thứ tự docs. Bằng chứng: 1 curl /s2 in chuỗi [1]→[6] + 1 curl /s2/boom thấy filter chạy cuối. Ảnh: `s2-lifecycle.png` (log server) — khối log là bằng chứng vàng của tập.

- [ ] Implement, chạy + curl, render, Read, commit `feat: câu S2 — request lifecycle`.

### Task 11 (S3/ep77): Guard vs Middleware

`src/s3/`: middleware đọc header `x-token` gắn req.user (chỉ parse, KHÔNG chặn); `RoleGuard` đọc metadata `@Roles('admin')` so req.user.role → 403 khi thiếu quyền, 401 khi không token (guard ném UnauthorizedException). 3 curl: không token → 401; token role=user vào route admin → 403; token role=admin → 200 data. Output 3 khối curl `s3.txt` → ảnh `s3-auth.png`.

- [ ] Implement, verify 3 case thật, render, Read, commit `feat: câu S3 — guard vs middleware`.

### Task 12 (S4/ep78): Pipe + DTO validation

`src/s4/`: `CreateOrderDto` (class-validator: @IsString tên, @IsInt @Min(1) số lượng, @IsEmail) + ValidationPipe (whitelist). 2 curl POST /s4: body sai (3 lỗi) → 400 message mảng chi tiết; body đúng → 201 echo. Cài class-validator/class-transformer. Ảnh: `s4-validate.png`.

- [ ] Implement, verify, render, Read, commit `feat: câu S4 — ValidationPipe DTO`.

### Task 13 (S5/ep79): Interceptor

`src/s5/`: `WrapInterceptor` (map data → `{ok:true,data,tookMs}` + set header X-Response-Time) trên GET /s5 (handler delay 120ms giả lập). curl -i thấy header + body bọc; thêm route /s5/raw không interceptor để so. Ảnh: `s5-intercept.png`.

- [ ] Implement, verify, render, Read, commit `feat: câu S5 — interceptor transform + timing`.

### Task 14 (S6/ep80): Exception filter

`src/s6/`: route /s6/boom ném `new Error('db exploded')` — mặc định 500 `{"statusCode":500,"message":"Internal server error"}`; `AllExceptionsFilter` (catch-all, trả `{code,message,path,timestamp}` + log stack server-side) gắn qua APP_FILTER; route /s6/known ném HttpException 404 custom. curl 3 case trước/sau filter (trước = route /s6/raw-boom ở controller không nằm trong scope filter? — filter APP_FILTER là global: thay bằng chụp 2 giai đoạn KHÔNG được vì phải chạy 2 build... TRUNG THỰC: dùng filter có cờ bypass qua header `x-raw: 1` để cùng server show cả 2 hành vi, ghi rõ trong video "cờ demo"). Ảnh: `s6-filter.png`.

- [ ] Implement, verify cả 3 case, render, Read, commit `feat: câu S6 — exception filter chuẩn hóa lỗi`.

### Task 15: Tag + README + smoke render scene

- [ ] Inventory `video/public/screens/beqa/`: đủ ảnh 12 câu (mỗi câu ≥1 dọc; wide nếu có), Read từng ảnh chữ rõ.
- [ ] Smoke render pipeline: composition tạm dùng TerminalScene với text output B1 thật (theo schema đã ghi ở Task 1) + 1 VShotScene với `s2-lifecycle.png` → still → Read xác nhận đẹp → XÓA composition tạm.
- [ ] `git tag be-qa-batch-3` (tree sạch) + push tag. README demo-be-interview (bảng 12 câu ↔ file ↔ ảnh ↔ số đo chốt từ reports) + append progress.md "demo phase lô 3 COMPLETE". Commit `docs: README demo-be-interview + hoàn tất giai đoạn demo lô 3`.

## Self-review

- Spec coverage: 12 câu = Task 3–14 ✓; fact sheet ✓; tool ảnh + chuẩn khổ dọc/ngang ✓ (Task 1); cổng 3998 ✓; tag + smoke ✓ (Task 15).
- Placeholder: S6 đã chốt cách demo 2 hành vi (cờ bypass, khai trung thực); B1 chốt xử lý setTimeout/setImmediate đảo.
- Consistency: tên ảnh beqa/{id}-{state}.png thống nhất; term-shot interface dùng ở mọi task câu.
