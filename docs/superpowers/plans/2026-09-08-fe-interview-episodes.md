# Series "Phỏng vấn Frontend — React & Vue" — Plan sản xuất lô 1 (12 ngang + 12 Shorts)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 pipeline trước, rồi MỖI CÂU = 1 task (ngang + Shorts cùng task), tuần tự. Global Constraints plan `2026-09-03-flutter-miniapp-episodes.md` vẫn hiệu lực cho bản ngang.

**Goal:** 24 video lô 1: 12 bản ngang ep45–ep56 (~150–180s) + 12 Shorts sr1..sr6/sv1..sv6 (<60s), từ demo `demo-fe-interview/` (tag `fe-qa-batch-1`) + fact sheets.

## Điều chỉnh & quy ước

- Nguồn sự thật: fact sheets `.superpowers/sdd/fe-interview-research.md` + `vue-interview-research.md`; hành vi ví dụ theo README demo-fe-interview + report task 2/3/4 (V1 bản fix "đứng im rồi lộ giá trị ngầm"; R5 số đếm từ production preview; R3/V5 cùng bẫy).
- Mapping: R1→ep45/sr1, R2→ep46/sr2, R3→ep47/sr3, R4→ep48/sr4, R5→ep49/sr5, R6→ep50/sr6, V1→ep51/sv1, V2→ep52/sv2, V3→ep53/sv3, V4→ep54/sv4, V5→ep55/sv5, V6→ep56/sv6. Kịch bản: `tts/scripts/ep45.json` + `tts/scripts/sr1.json`...
- Bản ngang: 6–8 scene, 3 nhịp (title câu hỏi → code demo + browser scene ảnh bẫy → concept "trả lời như đi phỏng vấn" chốt 2-3 câu + bẫy); 150–180s (~22–28 câu); code scene byte-match code tại tag `fe-qa-batch-1` (git show fe-qa-batch-1:demo-fe-interview/...); browser scene dùng ảnh feqa (url 'localhost:5197 — React QA' hoặc 'localhost:5196 — Vue QA'). Title public "Phỏng vấn FE #N: <câu hỏi>".
- Shorts: 4–5 scene (vtitle → vcode 1-2 → vshot → vanswer), <60s (~10–13 câu ngắn); kịch bản RIÊNG nén thủ công; vcode ≤40 ký tự/dòng ≤14 dòng — TRÍCH/RÚT từ code demo (được phép rút gọn vì vcode không cam kết byte-match, nhưng không được sai kỹ thuật); step đầu vcode LUÔN sentence:0.
- Thumbnail chỉ bản ngang (variant shot, ảnh feqa; ảnh có CHỮ bằng chứng → compose dọc PIL như ep41); seriesTag "Phỏng vấn Frontend 🇻🇳"; badge "PV FE #N".
- Ẩn dụ series: PHÒNG PHỎNG VẤN — "người phỏng vấn hỏi, ta demo rồi chốt"; không vay ẩn dụ series cũ.
- So sánh React↔Vue trung lập; R3/V5 nhắc chéo nhau ("bẫy y hệt bên kia — xem video kia của series").
- Mỗi câu NGẮN — đừng độn; giữ giọng đối thoại phỏng vấn (câu hỏi đọc như interviewer, câu chốt như candidate mẫu).

## Task 0 (BẮT BUỘC TRƯỚC): fix VShotScene + ảnh dọc

Finding final review demo: ảnh vert 420×840 (1:2) vs khung 1080×1920 (9:16) — `objectFit: cover` crop ~11% dọc mất tiêu đề; caption đè 90px đáy.
- Sửa `VShotScene.tsx`: `objectFit: 'contain'` + nền theme.bg (letterbox 2 bên chấp nhận — ảnh 420×840 hiển thị trọn) HOẶC giữ cover + `objectPosition: 'top'` — CHỌN sau khi render thử cả 2 với ảnh thật r3-vert, xem frame, quyết cách đẹp hơn, ghi report.
- Chụp BỔ SUNG ảnh dọc trạng thái "before" cho r3/v5 (`r3-vert-before.png`, `v5-vert-before.png`) và `v1-vert-frozen.png` — dùng CDP như demo phase (build+preview+click, cổng 5197/5196).
- Smoke render 1 ShortTEST tạm với vshot ảnh thật → xem frame → xóa test. Commit.

## Checklist mỗi câu (Task 1–12, mỗi task 1 câu = 2 video)

1. Đọc fact sheet mục câu đó + README demo (hàng của câu trong bảng) + code tại tag + ảnh feqa của câu.
2. Viết kịch bản NGANG epXX.json (validator pass) → Root.tsx entry + Thumb → render + still → verify 3-4 frame.
3. Viết kịch bản SHORTS s<id>.json (<60s — kiểm tổng timing ≤1800 frames; validator pass) → Root.tsx mục shorts → render Short<ID> → verify 2-3 frame (khung dọc, vshot đẹp).
4. Commit 1 lần/câu: `feat: câu R3 — ep47 (ngang) + sr3 (Shorts): vì sao list cần key`.

## Task 13 (sau 12 câu): SEO + chờ lệnh đăng

docs/seo-youtube.md mục "Phỏng vấn FE #1..#12" (bản ngang: title/desc/chapters/tags/pinned; mục phụ "Shorts" ghi caption ngắn mỗi Short + hashtag #shorts + dòng "Video đầy đủ: [LINK-EPXX]"); README gốc mục series; playlist đích "Phỏng vấn Frontend 🇻🇳" tạo khi đăng; Shorts đăng cùng lệnh (mô tả link video dài tương ứng). Commit + merge + push. KHÔNG đăng — chờ lệnh.
