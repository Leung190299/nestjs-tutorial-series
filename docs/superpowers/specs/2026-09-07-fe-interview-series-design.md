# Series "Phỏng vấn Frontend — React & Vue" — Thiết kế (lô 1)

Ngày: 2026-09-07. Trạng thái: đã duyệt. Fact sheet: `.superpowers/sdd/fe-interview-research.md`
(40 câu FE) + `.superpowers/sdd/vue-interview-research.md` (20 câu Vue 3).

## Mục tiêu

Series MỚI dạng ngân hàng câu hỏi: MỖI CÂU = 1 video, làm CẢ HAI định dạng:
- **Bản ngang 16:9** 2–3 phút (~150–180s), pipeline hiện có, playlist mới
  "Phỏng vấn Frontend 🇻🇳" (tạo khi đăng).
- **Bản Shorts dọc 9:16** dưới 60s — kịch bản RIÊNG nén thủ công (không cắt từ bản
  ngang), pipeline dọc MỚI; mô tả Shorts link về video dài (phễu).

Lô 1 = 12 câu kinh điển: R1 Virtual DOM/reconciliation; R2 useState/useEffect chạy
lúc nào; R3 vì sao list cần key (bẫy index); R4 controlled vs uncontrolled;
R5 memo/useMemo/useCallback khi nào thật sự cần; R6 custom hook; V1 ref vs reactive
(+ bẫy destructure mất reactivity); V2 Composition vs Options API; V3 computed vs
watch vs watchEffect; V4 v-if vs v-show; V5 key trong v-for (móc so sánh R3);
V6 props/emit. Lô sau (trend React 19 Actions/RSC/Compiler, Vapor Mode, JS core,
CSS...) làm khi người dùng yêu cầu.

Công thức 3 nhịp mỗi video: **Câu hỏi → Ví dụ code CHẠY THẬT (kèm bẫy) → Trả lời
chuẩn như đi phỏng vấn** (câu chốt 2–3 câu học thuộc được). Đáp án đối chiếu fact
sheet có nguồn docs chính chủ; so sánh React↔Vue trung lập.

## Demo — `demo-fe-interview/`

```
demo-fe-interview/
├── react-qa/    # Vite + React 19 — mỗi câu R* một trang ví dụ tối giản (route ?q=r3)
└── vue-qa/      # Vite + Vue 3.5.42 (PIN — Vapor Mode 3.6 còn RC, chỉ nhắc miệng)
                 # mỗi câu V* một trang ví dụ (?q=v1)
```
- Ví dụ phải CHẠY THẬT và THỂ HIỆN BẪY trên hình (vd R3: 2 list cạnh nhau key index
  vs key id, xóa phần tử thấy lỗi giữ state ngay; V1: destructure làm số không tăng).
- Điều hướng qua query `?q=` (dễ chụp headless từng câu, không cần router package).
- Screenshot Chrome headless (+ CDP khi cần thao tác/viewport) như series StyleX;
  cổng react-qa 5197, vue-qa 5196. Tag `fe-qa-batch-1` đóng băng khi xong demo.

## Pipeline Shorts dọc (xây một lần)

- Composition 1080×1920 trong Root.tsx (nhánh compositions dọc riêng, ví dụ id
  `ShortR3`), fps 30, TTS Adam như cũ.
- 3 scene dọc MỚI (component riêng, KHÔNG đụng scene ngang): `vtitle` (câu hỏi chữ
  to giữa màn + badge React/Vue), `vcode` (font to, ≤40 ký tự/dòng, ≤14 dòng,
  highlight theo câu như CodeScene), `vanswer` (câu chốt + bẫy, bullet to).
- Validator generate.py thêm 3 type trên; script Shorts đặt `tts/scripts/sr3.json`
  (s = short) tách khỏi ep ngang.
- Bản ngang của mỗi câu đánh số nội bộ ep45+ (theo thứ tự sản xuất), title public
  dạng "Phỏng vấn FE #N: <câu hỏi>".

## Sản xuất

Giai đoạn demo: 2 app + 12 trang ví dụ verified + screenshots + pipeline dọc render
thử. Giai đoạn sản xuất: 12 kịch bản ngang + 12 kịch bản Shorts → TTS → render 24
video → SEO (mục "Phỏng vấn FE #1..#12" + mục Shorts ghi chú) → đăng khi có lệnh.
Mọi bài học tích lũy pipeline giữ nguyên (≤22 dòng/scene ngang, step chạm dòng cuối,
thumbnail chữ → compose dọc, chapters verify sau re-render...).

## Rủi ro

- Khối lượng lớn (24 video) → dây chuyền đã quen, làm tuần tự câu một, review từng câu.
- Scene dọc mới → render thử sớm ngay task đầu pipeline.
- React 19 + Vue 3.5 API khác tài liệu cũ → mọi claim theo fact sheet có nguồn.
