# Lô 2 Phỏng vấn — Giai đoạn 2: sản xuất 24 video (12 ngang ep57–ep68 + 12 Shorts)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 pipeline trước, rồi MỖI CÂU = 1 task (ngang + Shorts cùng task), tuần tự. Mọi implementer TỰ LÀM foreground, KHÔNG spawn agent con/background. Luật tích lũy của các plan trước (2026-09-08-fe-interview-episodes.md Global Constraints) vẫn hiệu lực.

**Goal:** 24 video lô 2: 12 bản ngang ep57–ep68 (~150–180s) + 12 Shorts sn1..sn6/sf1..sf6 (<60s), từ demo `demo-perf-interview/` (tag `perf-qa-batch-2`) + fact sheet + 12 report số đo.

## Điều chỉnh & quy ước

- Nguồn sự thật: fact sheet `.superpowers/sdd/perf-interview-research.md` + report từng câu `.superpowers/sdd/{n1..n6,f1..f6}-report.md` (SỐ ĐO THẬT — kịch bản đọc đúng số trong report/trên ảnh, không bịa, không thổi phồng; report nào ghi "không diễn cảnh X" thì kịch bản KHÔNG kể cảnh đó).
- Mapping: N1→ep57/sn1, N2→ep58/sn2, N3→ep59/sn3, N4→ep60/sn4, N5→ep61/sn5, N6→ep62/sn6, F1→ep63/sf1, F2→ep64/sf2, F3→ep65/sf3, F4→ep66/sf4, F5→ep67/sf5, F6→ep68/sf6. Kịch bản `tts/scripts/ep57.json` + `tts/scripts/sn1.json`...
- Bản ngang 6–8 scene, 3 nhịp (title câu hỏi → code demo + PHONE scene ảnh bằng chứng → concept "trả lời như đi phỏng vấn" chốt 2-3 câu + bẫy); 150–180s (~22–28 câu). Code scene byte-match `git show perf-qa-batch-2:demo-perf-interview/...` (TS cho N*, Dart cho F* — cắt đoạn cốt lõi ≤22 dòng). Phone scene dùng ảnh `screens/perfqa/` (2 ảnh chậm/nhanh = 2 phone scene hoặc 1 phone + số kể miệng; PhoneScene title ≤31 ký tự). Title public "Phỏng vấn FE #N: <câu hỏi>" (N=13..24).
- Shorts khuôn 4 scene (vtitle → vcode 1-2 → vshot → vanswer), <60s, ≤1800 frames; vcode ≤40 ký tự/dòng ≤14 dòng TRÍCH/RÚT từ code demo (không sai kỹ thuật); step đầu vcode LUÔN sentence:0; vshot dùng thẳng ảnh perfqa (đã dọc chuẩn).
- Cặp chéo nhắc 2 chiều: ep57↔ep63 (lazy list), ep61↔ep67 (ảnh), ep62↔ep68 (thread/isolate) — mỗi tập 1 câu nhắc "bẫy y hệt bên kia, xem video kia của series".
- Ẩn dụ series PHÒNG PHỎNG VẤN giữ nguyên; so sánh RN↔Flutter trung lập; số ms là số DEBUG/simulator — kịch bản nói "trên simulator của tôi", với F1 nói bậc độ lớn (bài học f1-report: variance cao, số bất biến là build count).
- Thumbnail chỉ bản ngang, variant shot khung dọc: ảnh perfqa dọc 1206×2622 dùng TRỰC TIẾP (không cần compose PIL); badge "PV FE #13".."#24"; seriesTag "Phỏng vấn Frontend 🇻🇳"; chọn ảnh có con số bằng chứng đắt nhất.
- Luật render tích lũy: step cuối chạm dòng cuối snippet (soát len(split)); verify frame GẦN CUỐI scene Appear (end−1.5s); concept ≤4 bullet ưu tiên, bullet ≤65 ký tự nếu vào outro; validator pass trước khi render; mp4 ra ĐÚNG TÊN out/epXX.mp4 và out/snX.mp4|sfX.mp4 (không EpisodeXX/ShortXX — bài học lô 1).

## Task 0 (BẮT BUỘC TRƯỚC): pipeline hỗ trợ RN/Flutter

- Validator `tts/generate.py`: vtitle `framework` hiện chỉ nhận react|vue → thêm `rn` | `flutter`.
- `VTitleScene.tsx`: badge + màu cho rn ("React Native", xanh cyan #61dafb chữ tối) và flutter ("Flutter", xanh #027DFD chữ trắng); các scene khác không đổi.
- Thumb (Root.tsx): kiểm variant shot với ảnh dọc perfqa hiển thị đẹp (đã smoke Task 15 demo phase — chỉ cần dùng đúng pattern); badge PV FE #N.
- CodeScene: xác nhận language cho Dart đã dùng ở series Flutter cũ (ep26+) — không sửa gì nếu chạy.
- Smoke: viết 1 script sn-test.json tối giản (vtitle rn + vcode + vshot n1-flatlist + vanswer) → generate → render still 2 frame → Read xác nhận badge đẹp → XOÁ test (script + timing + composition). Commit pipeline.

## Checklist mỗi câu (Task 1–12, mỗi task 1 câu = 2 video)

1. Đọc fact sheet mục câu đó + report câu đó + README demo (hàng của câu) + code tại tag (`git show perf-qa-batch-2:...`) + 2 ảnh perfqa của câu.
2. Kịch bản NGANG epXX.json (validator pass) → Root.tsx entry + Thumb → render `npx remotion render EpisodeXX out/epXX.mp4` + still thumb → verify 3-4 frame (trong đó ≥1 frame phone scene + 1 frame gần cuối concept).
3. Kịch bản SHORTS snX/sfX.json (<60s — kiểm tổng frames ≤1800 sau generate; rút lời nếu vượt) → Root.tsx mục shorts → render Short → verify 2-3 frame.
4. Commit 1 lần/câu: `feat: câu N1 — ep57 (ngang) + sn1 (Shorts): FlatList vs ScrollView`.

## Task 13 (sau 12 câu): SEO + chờ lệnh đăng

docs/seo-youtube.md mục "Phỏng vấn FE #13..#24" nối tiếp mục lô 1 (title/desc/tags/pinned/thumbnail-notes; CHAPTERS SINH BẰNG SCRIPT từ timing JSON — dùng lại pattern scratchpad/fix_chapters.py, KHÔNG cộng tay) + bảng "Shorts lô 2" (12 dòng caption + [LINK-EPXX] + #shorts); mô tả có placeholder [LINK-*] như lô 1, ghi chú nối playlist PLYvXt5cUP0yE khi đăng (KHÔNG playlist mới). README gốc thêm mục lô 2. Commit + merge perf-interview-batch2 vào main (--no-ff) + push. KHÔNG đăng — chờ lệnh.
