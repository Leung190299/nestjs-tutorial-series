# Lô 4 Phỏng vấn DB — Giai đoạn 2: sản xuất 24 video (12 ngang ep81–ep92 + 12 Shorts)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 pipeline trước, rồi MỖI CÂU = 1 task (ngang + Shorts cùng task), tuần tự. Implementer TỰ LÀM foreground, KHÔNG spawn agent con/background.

**Goal:** 24 video lô 4: 12 ngang ep81–ep92 (~150–180s) + 12 Shorts sd1..sd6/sp1..sp6 (<60s), từ demo `demo-db-interview/` (tag `db-qa-batch-4`) + fact sheet + 12 report.

## Điều chỉnh & quy ước

- Nguồn sự thật: `.superpowers/sdd/db-interview-research.md` + report `.superpowers/sdd/{d1..d6,p1..p6}-report.md`. SỐ đọc đúng report/ảnh; report ghi "không claim X" thì kịch bản không nói X. Các BEAT VÀNG bắt buộc lên video: D1 index bị bỏ khi lọc 80% bảng · D2 lệch 1677× là do LIMIT chứ không phải thống kê cũ · D3 `loops=50` (Postgres cũng tra 50 lần nhưng bên trong DB) · D4 phiên A đọc giá trị KHÔNG CÒN TỒN TẠI · D5 sau deadlock CẢ HAI dòng đều +1 + `hint` bảo đọc log server · D6 hai nhánh cùng node, khác `Index Cond` · P1 include dùng `IN (...)` không phải JOIN · P2 `select` không làm query nhanh hơn (cùng plan, `width` 25→8) · P3 sequence vẫn tiêu 1 giá trị dù ROLLBACK · P4 Error từ chối SINH file vs Warning trong file · P5 `pg_sleep` trơn ném P2010 (bẫy dễ nhầm lỗi pool) · P6 index sai cột thì planner không thèm dùng.
- Mapping: D1→ep81/sd1 … D6→ep86/sd6, P1→ep87/sp1 … P6→ep92/sp6. Kịch bản `tts/scripts/ep81.json` + `sd1.json`...
- Bản ngang 6–8 scene: title → concept → code (byte-match `git show db-qa-batch-4:demo-db-interview/...`; SQL dùng language `"sql"`, script `.mjs` dùng `"javascript"`, schema.prisma dùng `"javascript"` — kiểm ở Task 0) → **terminal** (schema `{title, commands:[{cmd, output, sentence}]}`, output NGUYÊN VĂN từ report, TRẦN ~13 dòng/scene ~70 ký tự/dòng → tách 2 scene terminal thay vì nhồi) → concept trả lời phỏng vấn → outro. 150–180s, ≤200 ký tự/câu. Title public "Phỏng vấn FE #N: <câu hỏi>" (N=37..48).
- Shorts: vtitle framework MỚI `postgres`/`prisma` (Task 0) → vcode (≤40 ký tự/dòng ≤14 dòng, step đầu sentence:0, step cuối chạm dòng cuối) → vshot (ảnh `screens/dbqa/*.png` đã dọc 620×1281) → vanswer. ≤1800 frames.
- Cặp chéo 2 chiều: ep81↔ep92 (D1↔P6 index), ep83↔ep87 (D3↔P1 N+1); ep87 nhắc thêm câu #43 (ep83) đúng như ảnh p1 đã in.
- Thumbnail: variant shot ảnh dbqa dọc trực tiếp, badge "PV FE #37".."#48", seriesTag "Phỏng vấn Frontend 🇻🇳", subtitle "Phỏng vấn Frontend · Câu N/48".
- ⚠️ RENDER: chạy remotion với **cwd=video/** — mp4 phải ở `video/out/epXX.mp4` + `video/out/sdX.mp4|spX.mp4`, thumb `video/out/thumbs/epXX-thumb.png`. Verify vị trí sau render.
- generate.py có thể exit 134 SAU khi ghi timing — kiểm file timing là được; chạy 2 lệnh generate riêng.

## Task 0 (BẮT BUỘC TRƯỚC): pipeline badge postgres/prisma

- `tts/generate.py`: enum vtitle framework thêm `'postgres'`, `'prisma'` (đang có react|vue|rn|flutter|node|nestjs).
- `VTitleScene.tsx`: `postgres: {label:'PostgreSQL', emoji:'🐘', color:'#336791', text:'#ffffff'}`, `prisma: {label:'Prisma', emoji:'▲', color:'#2D3748', text:'#ffffff'}`.
- Kiểm language `"sql"` render đẹp trong CodeScene (prism-react-renderer) — nếu không có highlighter cho sql thì fallback `"clike"`, ghi kết luận vào report Task 0.
- Smoke: script test 2 vtitle + 1 vcode SQL + 1 vshot ảnh d5-deadlock → generate → still → Read → XÓA test sạch. Commit `feat: pipeline lô 4 — vtitle framework postgres/prisma`.

## Checklist mỗi câu (Task 1–12)

1. Đọc fact sheet mục câu + report câu + README demo + code tại tag + ảnh dbqa của câu.
2. Kịch bản NGANG epXX.json (validator pass; output terminal trích NGUYÊN VĂN report — so từng ký tự bằng script) → Root.tsx entry + Thumb → render (cwd=video/) + still thumb → verify 4 frame (title, code step cuối, terminal, concept cuối — Appear lấy end−1.5s).
3. Kịch bản SHORTS sdX/spX.json (<60s, ≤1800 frames; vượt thì rút lời) → Root.tsx shorts → render → verify 2 frame.
4. Commit 1 lần/câu: `feat: câu D1 — ep81 (ngang) + sd1 (Shorts): index Seq Scan vs Index Scan`.

## Task 13 (sau 12 câu): SEO + chờ lệnh đăng

`docs/seo-youtube.md` mục "Phỏng vấn FE #37..#48" NGAY SAU bảng "Shorts lô 3" (format lô 3: heading (M:SS) thật, Tiêu đề ≤100, Mô tả + ⏱️ CHAPTERS SINH BẰNG SCRIPT từ timing JSON + verify script độc lập, links 📦 tag db-qa-batch-4 / ⏮️⏭️ / 📱 [LINK-SHORT-37..48] / 🔁 cặp chéo / ▶️ playlist PLYvXt5cUP0yE + series khác, hashtag #postgresql|#prisma #sql #phongvan #backend, Comment ghim, Thumbnail, ~15 Tags) + bảng "### Shorts lô 4 (12 video)". Placeholder CHỈ [LINK-EP81..92]+[LINK-SHORT-37..48]. README gốc mục lô 4. Commit. KHÔNG merge/push/đăng — chờ final review.
