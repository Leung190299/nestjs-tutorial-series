# Episodes 2–4 + YouTube SEO — Plan

**Goal:** Hoàn thành 3 tập còn lại của series (Microservices, WebSocket, Tổng hợp) bằng pipeline đã có, cùng bộ SEO YouTube cho cả 4 video.

**Cách làm:** Pipeline/scene components tái dùng nguyên vẹn từ tập 1. Mỗi tập: (1) build demo code THẬT chạy được (subagent, code là nguồn sự thật cho CodeScene), (2) controller viết kịch bản ep0X.json (~55–65 câu, ~6 phút, cấu trúc 50/50 khái niệm + demo), (3) validate + generate audio + render 1080p, (4) kiểm tra hình + gửi người dùng. Cuối cùng: file SEO cho 4 video.

**Branch:** episodes-2-4 (main đã có ep01).

## Tập 2 — Microservices (demo-microservices/)

Hai app NestJS thật:
- `users-service`: microservice TCP cổng 3001, `@MessagePattern({cmd:'get_users'})` trả danh sách users (Minh, Lan — nối tiếp tập 1).
- `gateway`: HTTP cổng 3000, `ClientsModule.register` (TCP 3001), `GET /users` gọi `client.send({cmd:'get_users'})`.

Dàn ý ~12 scene: title → recap tập 1 + vấn đề monolith → microservice là gì (ví von chuỗi cửa hàng) → ưu/nhược → diagram Client→Gateway→(TCP)→Users Service → terminal tạo 2 project + cài @nestjs/microservices → code main.ts (createMicroservice TCP) → code users.controller (@MessagePattern) → code gateway app.module (ClientsModule) → code gateway controller (client.send) → terminal chạy 2 service + curl → outro (teaser WebSocket).

## Tập 3 — WebSocket (demo-chat/)

Một app NestJS thật: `@nestjs/websockets` + `@nestjs/platform-ws` (adapter ws để demo được bằng client thuần):
- `chat.gateway.ts`: `@WebSocketGateway`, `@SubscribeMessage('chat')` broadcast tới mọi client.
- `main.ts`: `app.useWebSocketAdapter(new WsAdapter(app))`.
- Verify bằng script node (2 client ws, client 1 gửi, cả 2 nhận).

Dàn ý ~12 scene: title → vấn đề HTTP hỏi-mới-đáp (ví von gửi thư bưu điện) → WebSocket là gì (ví von cuộc gọi điện giữ máy, 2 chiều) → khi nào dùng (chat, thông báo, game...) → diagram Client A ⇄ Gateway ⇄ Client B → terminal cài package → code chat.gateway.ts → code main.ts (WsAdapter) → code app.module (provider) → terminal chạy + 2 client chat → concept so sánh @Get vs @SubscribeMessage → outro (teaser tập cuối).

## Tập 4 — Ghép tất cả: chat realtime microservice (demo-final/)

Hai app thật:
- `chat-service`: microservice TCP 3001, lưu messages in-memory, `save_message` + `get_history`.
- `gateway`: WebSocket (ws adapter) cổng 3000 + ClientProxy TCP; `handleConnection` gửi lịch sử cho client mới; `@SubscribeMessage('chat')` lưu qua chat-service rồi broadcast.

Dàn ý ~11 scene: title → nhìn lại 3 mảnh ghép → diagram kiến trúc final Client⇄(WS)Gateway→(TCP)Chat Service → code chat-service controller → code gateway module (ClientsModule + provider) → code chat.gateway handleChat → code handleConnection (lịch sử) → terminal chạy demo 2 client + reconnect thấy history → concept hướng mở rộng (auth service, database, Redis) → outro tổng kết series.

## SEO YouTube

File `docs/seo-youtube.md` + gửi người dùng: cho mỗi video — tiêu đề chính + 2 phương án, mô tả chuẩn SEO tiếng Việt (hook 2 dòng đầu, chapters theo timestamp từ timing.json, CTA, link các tập), ~15 tags, hashtags, gợi ý text thumbnail.

## Ràng buộc giữ nguyên từ plan tập 1

1920×1080@30fps; câu ≤200 ký tự; VOICE Adam; theme cũ; wav/mp4 không commit, timing.json commit; commit trailer Co-Authored-By Claude Fable 5; code trên video khớp byte với demo code đã chạy thật.
