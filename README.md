# NestJS cho người mới bắt đầu 🇻🇳

Source code trọn bộ series video YouTube **"NestJS cho người mới bắt đầu"** — 4 tập từ số 0 đến app chat realtime chạy trên kiến trúc microservices.

## Các tập & code tương ứng

| Tập | Nội dung | Code demo |
|-----|----------|-----------|
| 1 | NestJS là gì? Controller · Service · Module, API đầu tiên | [`demo-app/`](demo-app/) |
| 2 | Microservices — gateway + users-service qua TCP | [`demo-microservices/`](demo-microservices/) |
| 3 | WebSocket — server chat realtime | [`demo-chat/`](demo-chat/) |
| 4 | Ghép tất cả — app chat có lịch sử trên microservices | [`demo-final/`](demo-final/) |

## Chạy thử demo

Yêu cầu: Node.js 18+.

```bash
# Tập 1 — API đầu tiên
cd demo-app && npm install && npm run start:dev
curl http://localhost:3000/users

# Tập 2 — microservices (2 terminal)
cd demo-microservices/users-service && npm install && npm run start
cd demo-microservices/gateway && npm install && npm run start
curl http://localhost:3000/users

# Tập 3 — chat WebSocket
cd demo-chat && npm install && npm run start
# rồi mở 2 terminal khác: npx wscat -c ws://localhost:3000
# gửi: {"event":"chat","data":"xin chào"}

# Tập 4 — chat + microservices (2 terminal)
cd demo-final/chat-service && npm install && npm run start
cd demo-final/gateway && npm install && npm run start
# kết nối như tập 3 — client mới vào sẽ nhận được lịch sử tin nhắn
```

## Cấu trúc repo

- `demo-*/` — code NestJS thật xuất hiện trong video (chạy được, đã test).
- `video/` — project [Remotion](https://remotion.dev) render toàn bộ video và thumbnail.
- `tts/` — pipeline thuyết minh tiếng Việt bằng [VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS): kịch bản JSON → audio + timing → Remotion.
- `docs/` — kịch bản thiết kế, kế hoạch và bộ SEO YouTube.

> Video trong series được sản xuất hoàn toàn bằng code: kịch bản là file JSON, giọng đọc là TTS, hình ảnh render bằng React. Xem `docs/superpowers/specs/` nếu bạn tò mò về pipeline.
