# Series Phỏng vấn — Lô 3: Backend Node.js & NestJS (câu #25–#36)

Ngày: 2026-09-09. Trạng thái: đã duyệt ("duyệt — làm luôn").
Fact sheet: `.superpowers/sdd/be-interview-research.md` (viết ở Task 0 plan demo — CHƯA tồn tại khi duyệt spec).

## Mục tiêu

Lô 3 của series phỏng vấn, tiếp số công khai **Phỏng vấn FE #25–#36** (đăng nối
playlist "Phỏng vấn Frontend 🇻🇳" PLYvXt5cUP0yE mặc định; khi ra lệnh đăng user có
thể chọn tách playlist "Phỏng vấn Backend 🇻🇳" riêng — quyết lúc đăng, không ảnh
hưởng sản xuất): 12 câu hỏi backend — 6 Node.js core (B1–B6) + 6 NestJS (S1–S6).
Mỗi câu = 1 video ngang 16:9 2–3 phút (ep69–ep80) + 1 Shorts dọc <60s
(sb1–sb6 cho Node, ss1–ss6 cho NestJS). Tổng 24 video.

Công thức 3 nhịp giữ nguyên: **Câu hỏi → Demo CHẠY THẬT in bằng chứng ra
terminal (số đo thật) → Trả lời chuẩn như đi phỏng vấn** (chốt 2–3 câu + bẫy).

## Danh sách 12 câu (đã duyệt)

| id | ep | Câu hỏi | Bằng chứng terminal | Cặp chéo |
|---|---|---|---|---|
| B1 | ep69 | Event loop Node: thứ tự chạy, microtask vs macrotask | in thứ tự log thật (sync → nextTick → promise → timer → immediate) | |
| B2 | ep70 | Non-blocking I/O — vì sao 1 thread phục vụ nghìn request | server sync vs async + autocannon đo req/s thật | |
| B3 | ep71 | CPU-bound chặn event loop → worker_threads vs cluster | hash nặng: đo lag/req treo vs worker giải phóng | ↔#18 (RN chia lô) ↔#24 (Flutter Isolate) |
| B4 | ep72 | Stream & backpressure — đọc file lớn | readFile vs pipe: đo RSS (RAM) thật với file 1GB sinh cục bộ | |
| B5 | ep73 | Promise.all vs await tuần tự (+ bẫy allSettled/fail-fast) | 3 tác vụ 300ms: tổng ~900ms vs ~300ms đo thật | |
| B6 | ep74 | CommonJS vs ESM trong Node hiện nay | require vs import chạy thật, gotcha __dirname/exports | |
| S1 | ep75 | DI/IoC là gì, vì sao NestJS xây quanh nó | inject service + swap useValue in ra 2 kết quả | |
| S2 | ep76 | Request lifecycle Nest: middleware→guard→interceptor→pipe→handler→filter | 1 request in đủ chuỗi log đúng thứ tự | nhắc series NestJS cũ ep05–08 |
| S3 | ep77 | Guard vs Middleware — auth đặt ở đâu | curl 401/403/200 ba trường hợp thật | |
| S4 | ep78 | Pipe + DTO validation (class-validator) | curl body sai → 400 message chi tiết; body đúng → 201 | |
| S5 | ep79 | Interceptor — transform response + đo thời gian | response bọc chuẩn + header X-Response-Time thật | |
| S6 | ep80 | Exception filter — chuẩn hóa error toàn app | lỗi thô 500 stack vs JSON {code,message,path} | |

Shorts: B1..B6 → sb1..sb6, S1..S6 → ss1..ss6. Cặp chéo nhắc 2 chiều như lô trước.

## Demo — `demo-be-interview/`

```
demo-be-interview/
├── node-qa/   # Node thuần (không framework): mỗi câu 1 file b1.mjs..b6.mjs (b6 kèm b6-cjs.cjs)
│              # chạy `node bX.mjs` in bằng chứng có nhãn rõ ràng, format đẹp để chụp
└── nest-qa/   # 1 app NestJS mới (Nest CLI bản hiện tại), cổng 3998 (CẤM 3000)
               # mỗi câu 1 module/route s1..s6; bằng chứng = log server + curl output
```

- Node version: dùng bản đã cài trên máy (ghi version vào fact sheet + đọc trong video).
- Bằng chứng phải NHÌN THẤY TRÊN ẢNH terminal: mỗi demo in khối kết quả có nhãn
  (ví dụ "== ĐO: sync 912ms · async 309ms =="), số đo thật ghi report từng câu.
- File 1GB (B4) sinh cục bộ bằng script, gitignore, KHÔNG commit; autocannon (B2)
  cài dev trong node-qa. Không gọi mạng ngoài.
- Chụp terminal: cửa sổ Terminal.app/iTerm cỡ cố định ~1280×800, nền tối, chữ to
  (≥16pt) — thống nhất mọi ảnh; lưu `video/public/screens/beqa/{b1..b6,s1..s6}-*.png`
  (mỗi câu 1–2 ảnh: bug/chậm và fix/nhanh nếu có 2 trạng thái). Cách chụp cụ thể
  (script capture hoặc cắt từ screencapture) quyết ở plan demo.
- Tag `be-qa-batch-3` đóng băng khi demo xong.

## Pipeline video

- Ngang: khuôn 6 scene title → concept → code → terminal/browser (ảnh beqa) →
  concept → outro; scene `terminal` + `browser` ĐÃ CÓ từ series NestJS/StyleX —
  ưu tiên dùng lại, chỉ chỉnh nếu ảnh beqa không hợp khung (quyết ở plan).
- Shorts khuôn 4 scene vtitle → vcode → vshot → vanswer; vtitle thêm 2 framework
  mới: `node` (nền #339933 chữ trắng, label "Node.js") và `nestjs` (nền #E0234E
  chữ trắng, label "NestJS") — validator + VTitleScene mở rộng như lô 2.
- Ảnh terminal khung NGANG → vshot dọc phải compose bản dọc PIL 620×1281
  (tiền lệ lô 1 web); thumbnail bản ngang variant shot dùng ảnh compose/gốc tuỳ đẹp.
- Mọi luật tích lũy giữ nguyên: code ≤22 dòng byte-match tag `be-qa-batch-3`
  (TS cho cả 2 app; b*.mjs là JS), step cuối chạm dòng cuối, ≤200 ký tự/câu,
  ngang 150–180s, Shorts ≤1800 frames, verify frame end−1.5s, chapters SEO sinh
  bằng script từ timing, mp4 đúng tên out/epXX.mp4 + out/sbX.mp4|ssX.mp4.

## SEO & đăng

`docs/seo-youtube.md` thêm mục "Phỏng vấn FE #25..#36" + bảng "Shorts lô 3"
(placeholder [LINK-EP69..80] + [LINK-SHORT-25..36]); title public
"Phỏng vấn FE #N: <câu hỏi>". Đăng CHỈ khi có lệnh; script pattern
yt_upload_feqa2.py (sanitize <>, cap 6/lượt, nối playlist — hỏi user
playlist chung hay tách khi ra lệnh đăng).

## Rủi ro

- Ảnh terminal khó đọc trên video → chuẩn hóa cỡ chữ/khung ngay từ ảnh đầu,
  smoke render TerminalScene với ảnh thật trước khi chụp hàng loạt.
- Số đo autocannon/RSS dao động → kịch bản nói "trên máy tôi", số bất biến ưu
  tiên (thứ tự log, số request treo, chênh lệch bậc).
- Nest CLI scaffold đổi template → pin version ghi fact sheet; cổng 3998.
