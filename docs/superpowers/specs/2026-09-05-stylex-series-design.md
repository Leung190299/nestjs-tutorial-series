# Series "StyleX từ A đến Z — so găng Tailwind" — Thiết kế

Ngày: 2026-09-05. Trạng thái: đã duyệt (kèm chỉ đạo: NHẤN MẠNH so sánh Tailwind).
Vertical WEB đầu tiên của kênh. Fact sheet nghiên cứu: `.superpowers/sdd/stylex-research.md`.

## Mục tiêu

Series MỚI 6 tập ep39–ep44, đánh số "Tập N/6", playlist mới "StyleX từ A đến Z 🇻🇳"
(đăng khi có lệnh). Dạy StyleX (Meta, v0.19.x — nói rõ còn 0.x) từ số 0 cho người
biết React cơ bản, với **so sánh Tailwind là sợi chỉ xuyên suốt**: mỗi tập có nhịp
"bên Tailwind viết thế này" ngắn khi gặp khái niệm tương đương; tập 6 SO GĂNG bằng
demo thật hai bên.

## Demo — `demo-stylex/`

```
demo-stylex/
├── vietsuper-web/        # Vite + React + TS + @stylexjs/unplugin — trang ViệtSuper Web
│   └── src/ (hero, lưới dịch vụ đỏ #ea2845, Button variants, bảng giá,
│              tokens.stylex.ts, themes.ts — dark mode token + theme Tết)
└── compare-tailwind/     # Vite + React + Tailwind v4 — CÙNG Button + Card dịch vụ
                          # viết bằng Tailwind, để so găng thật ở tập 6
```

- Toolchain: Vite + React (docs ổn nhất ngoài Next.js); plugin `@stylexjs/unplugin`
  API `stylex.vite(...)` — KHÔNG có package "vite-plugin-stylex"; plugin đặt TRƯỚC
  `react()`; cần CSS entrypoint thủ công (2 gotcha này là beat tập 1).
- Pin version cụ thể trong video: "StyleX v0.19.x"; API lõi: `stylex.create` /
  `stylex.props` / `defineVars` / `createTheme`; luật last-wins theo thứ tự gọi;
  `default` bắt buộc khi lồng điều kiện; static-only trong create (dynamic qua CSS var).
- compare-tailwind: đúng 2 component (Button variants + Card dịch vụ) — đủ để
  screenshot cạnh nhau + đếm số ký tự/độ type-safe, không xây cả trang.
- Verify thật trong browser; screenshot bằng Chrome headless
  (`--headless=new --screenshot --window-size=1280,800`) — file thật, tái lập được.

## Nâng cấp pipeline: scene `browser`

Component MỚI BrowserScene (cửa sổ browser giả: 3 nút + thanh địa chỉ, chứa ảnh
1280×800; bullets bên trái như PhoneScene nhưng khung ngang) + validator
`tts/generate.py` thêm type `browser`. KHÔNG đụng scene/tập cũ. Hỗ trợ 2 ảnh
cạnh nhau (side-by-side) cho các cảnh so găng.

## Sáu tập

| Tập | Nội dung | Đinh + nhịp Tailwind |
|---|---|---|
| 1 (ep39) | StyleX là gì — atomic CSS COMPILE-TIME; setup Vite; style đầu tiên create/props; hero ViệtSuper | 2 gotcha setup; nhịp TW: "Tailwind cũng atomic nhưng là string class — StyleX là object có type" |
| 2 (ep40) | create() sâu: hover/active, media queries, lồng nhau | luật `default` bắt buộc; nhịp TW: `hover:bg-blue-500` vs object `:hover` |
| 3 (ep41) | props() + merge LAST-WINS theo thứ tự gọi; conditional &&/ternary; Button variants | demo đảo thứ tự đổi màu trên hình; nhịp TW: ghép class string dễ xung đột khó đoán, StyleX deterministic |
| 4 (ep42) | Component nhận style từ ngoài (cross-file); shorthand vs longhand deterministic; Card + bảng giá | nhịp TW: truyền className xuống vs truyền style object có kiểm soát |
| 5 (ep43) | Theming: defineVars tokens đỏ, dark mode trong token, createTheme theme Tết; fallback biến | nhịp TW: dark: prefix + config theme vs token type-safe |
| 6 (ep44) | SO GĂNG TRỰC DIỆN: cùng Button+Card ở compare-tailwind vs vietsuper-web — code cạnh code, ảnh cạnh ảnh; dynamic style CSS var; debug className hash; khi nào chọn gì; tổng kết | kết luận công bằng: prototype nhanh/ecosystem → Tailwind; codebase lớn/type-safe/dedup triệt để → StyleX |

Mỗi tập 6–9 phút; công thức kênh giữ nguyên (byte-match theo tag `stylex-tap-1..6`,
TTS Adam, thumbnail shot dùng ảnh browser, SEO, mọi bài học tích lũy: ≤22 dòng/scene,
step chạm dòng cuối, không ký hiệu lạ trong narration, ảnh chụp trạng thái sạch).

## Sản xuất & môi trường

Máy có Node (Remotion đang dùng) + Chrome. Demo verified TRƯỚC → tag theo tập →
kịch bản → render → SEO mục "StyleX #1..#6" → đăng khi người dùng yêu cầu (playlist
mới; tập 1 + 6 nhắc các series khác trên kênh). KHÔNG sửa demo cũ. So sánh Tailwind
phải CÔNG BẰNG — không dìm; số liệu/claim lấy từ fact sheet có nguồn.

## Rủi ro

- `@stylexjs/unplugin` + Vite: vùng dễ vấp (thứ tự plugin, CSS entrypoint, hot-reload
  virtual module) — mỗi cú vấp thành beat video.
- StyleX 0.x: API có thể đổi — video pin version, nói rõ.
- BrowserScene mới: render thử sớm ở task pipeline trước khi viết kịch bản hàng loạt.
