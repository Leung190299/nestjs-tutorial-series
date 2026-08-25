# Thiết kế: Series video hướng dẫn NestJS — Tập 1 + Pipeline Remotion/TTS

**Ngày:** 2026-08-25
**Trạng thái:** Đã duyệt phương án A (script-driven pipeline)

## Mục tiêu

Xây dựng series video tiếng Việt hướng dẫn NestJS + Microservices + WebSocket cho người mới bắt đầu, render bằng Remotion, thuyết minh bằng VieNeu-TTS. Lần này làm **pipeline dùng chung** và **Tập 1: NestJS cơ bản**.

## Quyết định đã chốt

- **Phạm vi:** Series 4 tập. Tập 1: NestJS là gì + tạo project đầu tiên. (Tập 2: Microservices, Tập 3: WebSocket, Tập 4: ghép tất cả — làm sau, ngoài phạm vi spec này.)
- **Cấu trúc mỗi tập:** 50/50 — nửa đầu khái niệm + animation, nửa sau code demo.
- **Định dạng:** YouTube ngang, 1920×1080, 30fps, tập 1 dài ~6–8 phút.
- **TTS:** VieNeu-TTS (cài mới, bản CPU/ONNX qua `pip install vieneu`), dùng giọng có sẵn (chọn sau khi nghe thử vài giọng preset).
- **Kiến trúc pipeline:** Phương án A — kịch bản JSON điều khiển toàn bộ; TTS sinh audio từng scene, đo độ dài thật, Remotion đọc timing để khớp hình với tiếng.

## Kiến trúc tổng thể

```
Kịch bản ep01.json ──▶ tts/generate.py ──▶ public/audio/ep01/*.wav
                              │
                              └──▶ src/data/ep01.timing.json
                                            │
                                            ▼
                              Remotion Episode01 ──▶ out/ep01.mp4
```

### Cấu trúc thư mục

```
tutorial/
├── video/                       # Remotion project (React + TypeScript)
│   ├── src/
│   │   ├── index.ts             # registerRoot
│   │   ├── Root.tsx             # đăng ký composition Episode01
│   │   ├── Episode01.tsx        # ghép Sequence các scene theo timing
│   │   ├── data/
│   │   │   └── ep01.timing.json # sinh tự động bởi tts/generate.py
│   │   ├── scenes/              # component theo LOẠI scene, tái dùng cả series
│   │   │   ├── TitleScene.tsx       # mở đầu tập / chuyển chương
│   │   │   ├── ConceptScene.tsx     # khái niệm: hình minh họa + bullet
│   │   │   ├── DiagramScene.tsx     # sơ đồ animation (request flow...)
│   │   │   ├── CodeScene.tsx        # code hiện dần từng dòng + highlight
│   │   │   ├── TerminalScene.tsx    # giả lập terminal gõ lệnh + output
│   │   │   └── OutroScene.tsx       # tóm tắt + giới thiệu tập sau
│   │   ├── components/          # khối nhỏ dùng chung
│   │   │   ├── CodeBlock.tsx        # syntax highlight (prism), reveal theo dòng
│   │   │   ├── Terminal.tsx         # khung terminal, hiệu ứng gõ chữ
│   │   │   ├── ArrowFlow.tsx        # mũi tên chuyển động giữa các khối sơ đồ
│   │   │   └── theme.ts             # màu, font, spacing thống nhất
│   │   └── public/audio/ep01/   # wav do TTS sinh (scene-01.wav, ...)
│   └── package.json
├── tts/
│   ├── generate.py              # đọc script JSON → gọi VieNeu-TTS → wav + timing.json
│   ├── preview_voices.py        # sinh 1 câu mẫu bằng vài giọng preset để chọn
│   ├── requirements.txt         # vieneu + deps
│   └── scripts/
│       └── ep01.json            # kịch bản tập 1
├── demo-app/                    # project NestJS thật (nguồn code cho CodeScene)
└── docs/superpowers/specs/
```

## Các thành phần

### 1. Định dạng kịch bản (`tts/scripts/ep01.json`)

Một mảng scene, mỗi scene:

```json
{
  "id": "scene-03",
  "type": "concept",            // title | concept | diagram | code | terminal | outro
  "narration": "NestJS giống như một nhà hàng...",
  "visual": { }                 // props riêng cho loại scene (tiêu đề, bullet, code, lệnh...)
}
```

- `narration` là một hoặc nhiều câu; nếu là mảng câu thì mỗi câu sinh một wav riêng rồi ghép, và timing từng câu được ghi lại để animation bên trong scene (vd. bullet hiện dần) khớp với lời.
- `visual` được copy nguyên vẹn sang `timing.json` để Remotion dùng — Remotion không đọc file kịch bản gốc.

### 2. `tts/generate.py`

- Đọc `scripts/ep01.json`, với mỗi scene gọi `vieneu.infer(text, voice=VOICE)` cho từng câu, lưu wav vào `video/public/audio/ep01/`.
- Đo độ dài wav (soundfile/wave), cộng khoảng đệm 0.6s cuối mỗi scene.
- Xuất `video/src/data/ep01.timing.json`: mỗi scene gồm `id, type, visual, audioFile, durationInFrames, sentences[] (offset từng câu theo frame)`.
- Cache: bỏ qua scene đã có wav mà văn bản không đổi (hash narration trong tên file hoặc file manifest) — sửa 1 câu không phải sinh lại cả tập.
- Chạy: `python tts/generate.py ep01`.

### 3. Remotion (`video/`)

- `Episode01.tsx`: import `ep01.timing.json`, map từng scene → `<Sequence from={...} durationInFrames={...}>` với component tương ứng theo `type`, kèm `<Audio src={staticFile(audioFile)}>`.
- Tổng duration composition = tổng duration các scene (tính trong `Root.tsx` từ timing.json — `calculateMetadata`).
- Scene component nhận `visual` + `sentences` (mốc thời gian từng câu) để đồng bộ animation với lời đọc; dùng `spring`/`interpolate` cho chuyển động.
- Nhạc nền: 1 track lofi âm lượng thấp (~8%) lặp suốt video, tùy chọn — chỉ thêm nếu tìm được file nhạc miễn phí bản quyền; không chặn tiến độ.
- Phong cách: nền tối (#0f172a), chữ sáng, accent đỏ NestJS (#ea2845), font Inter (chữ) + JetBrains Mono (code), flat/tối giản, chữ cỡ lớn đọc được trên điện thoại.
- Render: `npx remotion render Episode01 out/ep01.mp4`.

### 4. `demo-app/` — code NestJS thật

Project NestJS tối thiểu tạo bằng `nest new` (package manager: npm), thêm `UsersController` + `UsersService` với `GET /users` trả mảng cứng. Mục đích: code trên video là code thật đã chạy được, đoạn code trong kịch bản trích từ đây. Không cần database.

## Nội dung Tập 1 (~6–8 phút)

Kịch bản chi tiết (lời thoại từng câu) viết ở bước thực thi; dàn ý các scene:

| # | Loại | Nội dung |
|---|------|----------|
| 1 | title | Mở đầu series: "NestJS cho người mới bắt đầu — Tập 1" |
| 2 | concept | NestJS là gì: framework Node.js có cấu trúc, TypeScript, dùng cho backend |
| 3 | concept | Vì sao chọn NestJS: có tổ chức sẵn, dễ mở rộng, hệ sinh thái (so sánh nhẹ với Express) |
| 4 | concept | Ví von nhà hàng: Controller = người phục vụ, Service = đầu bếp, Module = khu bếp |
| 5 | diagram | Animation request flow: Client → Controller → Service → response |
| 6 | terminal | Cài đặt: `npm i -g @nestjs/cli`, `nest new demo-app`, chạy `npm run start:dev` |
| 7 | code | Cấu trúc thư mục + `app.module.ts`: module là gì trong code |
| 8 | code | Viết `users.controller.ts`: decorator `@Controller`, `@Get` |
| 9 | code | Viết `users.service.ts` + inject vào controller: `@Injectable`, DI qua constructor |
| 10 | terminal | Gọi thử `GET /users` (curl) → thấy JSON trả về; nối lại với sơ đồ nhà hàng |
| 11 | outro | Tóm tắt 3 ý chính + teaser Tập 2: Microservices |

## Xử lý lỗi & rủi ro

- **TTS đọc sai thuật ngữ tiếng Anh** (NestJS, controller...): VieNeu hỗ trợ code-switching Anh–Việt; nếu giọng đọc sai, chỉnh chính tả phiên âm trong kịch bản (vd. "Nét Giê Ét") — chỉ sửa JSON, chạy lại generate.
- **Câu quá dài làm TTS ngắt nghỉ kém:** quy ước mỗi phần tử narration ≤ ~200 ký tự.
- **generate.py fail giữa chừng:** ghi wav theo scene, chạy lại tự bỏ qua phần đã xong (cache).
- **Model tải lần đầu chậm/nặng:** chấp nhận, chỉ tải một lần; ghi chú kích thước sau khi cài.
- **Khớp hình–tiếng:** duration lấy từ file wav thật nên không lệch; đệm 0.6s cuối scene để không bị hụt hơi.

## Kiểm thử / nghiệm thu

- `generate.py` chạy xong tập 1 không lỗi; nghe thử toàn bộ wav (chính Claude nghe lại bằng cách kiểm tra duration hợp lệ + user nghe chọn lọc).
- `npx remotion studio` xem trước từng scene; render bản nháp độ phân giải thấp trước khi render final.
- Nghiệm thu cuối: file `out/ep01.mp4` 1080p có tiếng, hình khớp lời, tổng ~6–8 phút; user xem và duyệt.

## Ngoài phạm vi

- Tập 2–4 (chỉ chừa sẵn cấu trúc để làm tiếp).
- Bản dọc Shorts/TikTok, phụ đề ngoài (file .srt), upload YouTube, thumbnail.
- Clone giọng người dùng (có thể thêm sau — pipeline đã hỗ trợ qua `ref_audio`).
