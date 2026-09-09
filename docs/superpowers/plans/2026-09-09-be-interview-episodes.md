# Lô 3 Phỏng vấn Backend — Giai đoạn 2: sản xuất 24 video (12 ngang ep69–ep80 + 12 Shorts)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 pipeline trước, rồi MỖI CÂU = 1 task (ngang + Shorts cùng task), tuần tự. Mọi implementer TỰ LÀM foreground, KHÔNG spawn agent con/background. Luật tích lũy các plan trước (fe-interview/perf-interview episodes) vẫn hiệu lực.

**Goal:** 24 video lô 3: 12 ngang ep69–ep80 (~150–180s) + 12 Shorts sb1..sb6/ss1..ss6 (<60s), từ demo `demo-be-interview/` (tag `be-qa-batch-3`) + fact sheet + 12 report số đo.

## Điều chỉnh & quy ước

- Nguồn sự thật: `.superpowers/sdd/be-interview-research.md` + report `.superpowers/sdd/{b1..b6,s1..s6}-report.md` — SỐ ĐỌC ĐÚNG report/ảnh, report ghi "không claim X" thì kịch bản không nói X; các beat vàng đã ghi report PHẢI lên video (B1 twist ESM, B6 require(esm), S2 lỗi bỏ qua [5], B5 fail-fast vẫn chạy ngầm...).
- Mapping: B1→ep69/sb1, B2→ep70/sb2, B3→ep71/sb3, B4→ep72/sb4, B5→ep73/sb5, B6→ep74/sb6, S1→ep75/ss1, S2→ep76/ss2, S3→ep77/ss3, S4→ep78/ss4, S5→ep79/ss5, S6→ep80/ss6. Kịch bản `tts/scripts/ep69.json` + `sb1.json`...
- Bản ngang 6 scene, 3 nhịp: title câu hỏi → concept cơ chế → code (byte-match `git show be-qa-batch-3:demo-be-interview/...`; node-qa dùng language "javascript", nest-qa dùng "tsx"; ≤22 dòng liên tiếp, phần xa kể miệng — tiền lệ ep64) → **terminal scene** bằng chứng (schema `{title, commands:[{cmd, output, sentence}]}` — output NGUYÊN VĂN trích từ report, tối đa 2 commands, output ~3–6 dòng ≤70 ký tự/dòng; nếu bằng chứng cần khối dài hơn thì scene browser 1 shot với ảnh beqa `-wide`... KHÔNG có bản wide thì thêm scene terminal thứ 2 thay vì nhồi) → concept "trả lời như đi phỏng vấn" chốt 3 câu + bẫy → outro. 150–180s, ≤200 ký tự/câu. Title public "Phỏng vấn FE #N: <câu hỏi>" (N=25..36).
- Shorts khuôn vtitle → vcode → vshot → vanswer; vtitle framework "node" | "nestjs" (badge mới Task 0); vshot dùng thẳng ảnh `screens/beqa/{id}-*.png` (đã dọc 620×1281); vcode ≤40 ký tự/dòng ≤14 dòng, step đầu sentence:0, step cuối chạm dòng cuối; ≤1800 frames.
- Cặp chéo: ep71 (B3 worker) nhắc #18 + #24 hai chiều... một chiều (video cũ đã đăng, KHÔNG sửa video cũ — chỉ ep71 nhắc sang); ep76 (S2) nhắc playlist series NestJS cũ ep05–08; ep69 (B1) và ep74 (B6) nhắc nhau (ESM microtask ↔ require(esm)).
- Thumbnail chỉ bản ngang: variant shot ảnh beqa dọc TRỰC TIẾP, badge "PV FE #25".."#36", seriesTag "Phỏng vấn Frontend 🇻🇳", chọn ảnh/dòng chữ có số đắt nhất; subtitle 1 dòng "Phỏng vấn Frontend · Câu N/36".
- Luật render: verify frame GẦN CUỐI scene Appear (end−1.5s); mp4 đúng tên out/epXX.mp4 + out/sbX.mp4|ssX.mp4; concept ưu tiên ≤4 bullet; số ms nói "trên máy tôi".

## Task 0 (BẮT BUỘC TRƯỚC): pipeline badge node/nestjs

- `tts/generate.py`: enum vtitle framework thêm 'node', 'nestjs' (hiện có react|vue|rn|flutter).
- `VTitleScene.tsx`: bảng FW thêm `node: {label:'Node.js', emoji:'🟢', color:'#339933', text:'#ffffff'}`, `nestjs: {label:'NestJS', emoji:'🐈', color:'#E0234E', text:'#ffffff'}`.
- Smoke: script test 2 vtitle (node + nestjs) + 1 vshot ảnh b1-order.png → generate → still → Read badge đẹp → XÓA test sạch. Commit `feat: pipeline lô 3 — vtitle framework node/nestjs`.

## Checklist mỗi câu (Task 1–12)

1. Đọc fact sheet mục câu + report câu + README demo + code tại tag + ảnh beqa của câu.
2. Kịch bản NGANG epXX.json (validator pass; terminal scene output trích NGUYÊN VĂN report — so từng ký tự) → Root.tsx entry + Thumb → render `npx remotion render EpisodeXX out/epXX.mp4` + still thumb → verify 4 frame (title, code step cuối, terminal, concept cuối).
3. Kịch bản SHORTS sbX/ssX.json (<60s, ≤1800 frames sau generate — vượt thì rút lời) → Root.tsx shorts → render → verify 2 frame (vtitle badge + vshot).
4. Commit 1 lần/câu: `feat: câu B1 — ep69 (ngang) + sb1 (Shorts): thứ tự event loop`.

## Task 13 (sau 12 câu): SEO + chờ lệnh đăng

docs/seo-youtube.md: mục "Phỏng vấn FE #25..#36" NGAY SAU bảng "Shorts lô 2" (đúng format lô 1/2: heading (M:SS) thật, Tiêu đề ≤100, Mô tả + ⏱️ CHAPTERS SINH BẰNG SCRIPT từ timing JSON + verify script độc lập, links 📦 tag be-qa-batch-3 / ⏭️⏮️ / 📱 [LINK-SHORT-25..36] / 🔁 cặp chéo / ▶️ playlist PLYvXt5cUP0yE + 6 series cũ, hashtag #nodejs|#nestjs #phongvan #backend, Comment ghim, Thumbnail, ~15 Tags) + bảng "### Shorts lô 3 (12 video)" (sb1..ss6, caption + "Video đầy đủ: [LINK-EPXX]" + #shorts). Placeholder CHỈ [LINK-EP69..80]+[LINK-SHORT-25..36]. README gốc mục lô 3. Commit. KHÔNG merge/push/đăng — chờ final review.
