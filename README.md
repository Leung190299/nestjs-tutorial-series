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

## Series "Mini-App với Flutter — Add-to-app" (ep26–ep31, + Bonus Android ep32–ep33)

Series MỚI nhất, đào sâu **add-to-app**: nhúng mini-app Flutter vào một app chủ native (SwiftUI) — khác hẳn cách gộp bằng npm workspaces của series Mini-App React Native trước đó. App chủ và mini-app là hai dự án tách biệt, gộp lại lúc **runtime** qua `FlutterEngineGroup`, mỗi mini chạy trong một `FlutterEngine` riêng.

| Tập | Nội dung | Tag code tương ứng |
|-----|----------|---------------------|
| 1 | Add-to-app: tạo module Flutter, entry point, chạy thử lẻ mini Đồ ăn | `flutter-miniapp-tap-1` |
| 2 | Host SwiftUI từ số 0 + cắm căn hộ Flutter đầu tiên (FlutterEngine, FlutterViewController) | `flutter-miniapp-tap-2` |
| 3 | FlutterEngineGroup — thêm mini thứ hai (Ví) gần như miễn phí RAM | `flutter-miniapp-tap-3` |
| 4 | MethodChannel — mini hỏi, app chủ trả lời | `flutter-miniapp-tap-4` |
| 5 | Công thức 4 bước bản Flutter — xây mini Xem phim từ A đến Z | `flutter-miniapp-tap-5` |
| 6 | Chạy lẻ, bẫy `FLUTTER_TARGET`, so găng với bản React Native | `flutter-miniapp-tap-6` |
| Bonus 1/2 | Bản Kotlin: host Android Jetpack Compose cắm lại CÙNG module Flutter | `flutter-miniapp-android-1` |
| Bonus 2/2 | Lễ tân Kotlin (MethodChannel), fix bug double-tap, so găng Swift vs Kotlin | `flutter-miniapp-android-2` |

Demo: [`demo-flutter-miniapp/`](demo-flutter-miniapp/) (app chủ SwiftUI `vietsuper_ios/` + module Flutter `mini_flutter/` + app chủ Kotlin `vietsuper_android/`). Mỗi tập đóng băng bằng một git tag riêng — `git checkout flutter-miniapp-tap-N` (Swift, tập 1-6) hoặc `git checkout flutter-miniapp-android-N` (Kotlin, bonus 1-2) để xem đúng code xuất hiện trong tập tương ứng.

## Cấu trúc repo

- `demo-*/` — code NestJS thật xuất hiện trong video (chạy được, đã test).
- `demo-miniapps/` — code series Mini-App React Native (monorepo npm workspaces).
- `demo-flutter-miniapp/` — code series Mini-App với Flutter (add-to-app: app chủ SwiftUI + module Flutter, + bonus app chủ Kotlin/Jetpack Compose).
- `video/` — project [Remotion](https://remotion.dev) render toàn bộ video và thumbnail.
- `tts/` — pipeline thuyết minh tiếng Việt bằng [VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS): kịch bản JSON → audio + timing → Remotion.
- `docs/` — kịch bản thiết kế, kế hoạch và bộ SEO YouTube.

> Video trong series được sản xuất hoàn toàn bằng code: kịch bản là file JSON, giọng đọc là TTS, hình ảnh render bằng React. Xem `docs/superpowers/specs/` nếu bạn tò mò về pipeline.
