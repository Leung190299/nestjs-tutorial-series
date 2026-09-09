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

## Series "Mini-App Flutter thuần" — Pub Workspace (ep34–ep38)

Mảnh cuối của bộ ba cách làm mini-app trên kênh: không một dòng code native, toàn bộ từ trên xuống dưới chỉ **một ngôn ngữ Dart**, gộp nhiều mini-app bằng **pub workspace** (có từ Dart 3.5) — trái ngược có chủ đích với `FlutterEngine` runtime của series add-to-app, nhưng cùng triết lý với npm workspaces của series React Native. Cả khu chỉ dùng chung đúng MỘT `pubspec.lock`.

| Tập | Nội dung | Tag code tương ứng |
|-----|----------|---------------------|
| 1 | Pub workspace là gì — sổ đỏ chung cả khu, root pubspec + resolution: workspace | `flutter-workspace-tap-1` |
| 2 | Căn hộ đầu tiên: package mini_news, gắn vào tab chỉ 3 dòng | `flutter-workspace-tap-2` |
| 3 | Cùng căn hộ, hai cửa: news_standalone chạy lẻ không cần app chủ | `flutter-workspace-tap-3` |
| 4 | Công thức lặp lại: mini_topup từ A đến Z + bài tập IndexedStack | `flutter-workspace-tap-4` |
| 5 (CUỐI) | mini_ride mở bằng Navigator.push + tổng kết BỘ BA cách làm mini-app | `flutter-workspace-tap-5` |

Demo: [`demo-flutter-workspace/`](demo-flutter-workspace/) (root pub workspace, `apps/vietsuper` + `apps/news_standalone`, `packages/mini_news` + `packages/mini_topup` + `packages/mini_ride`). Mỗi tập đóng băng bằng một git tag riêng — `git checkout flutter-workspace-tap-N` để xem đúng code xuất hiện trong tập tương ứng.

## Series "StyleX từ A đến Z" — so găng Tailwind (ep39–ep44)

Series web ĐẦU TIÊN của kênh (vertical), sau 3 series mobile Flutter/React Native ở trên. Học **StyleX** — thư viện style CSS-in-JS **compile-time** của Meta (chạy thật trên facebook.com, Instagram), từ setup Vite tới theming, mỗi tập đều so găng trực diện với **Tailwind CSS**. Ẩn dụ xuyên suốt: style = đồng phục, `stylex.create()` = xưởng may đo (may sẵn lúc build), Tailwind = tủ đồ may sẵn ghép tem.

| Tập | Nội dung | Tag code tương ứng |
|-----|----------|---------------------|
| 1 | StyleX của Meta: may đo CSS lúc build, setup Vite không vấp lỗi exports map | `stylex-tap-1` |
| 2 | create() sâu: hover, media query & luật "default" bắt buộc | `stylex-tap-2` |
| 3 | props() và luật LAST-WINS: thứ tự gọi quyết định tất cả | `stylex-tap-3` |
| 4 | Component mở cửa cho style ngoài: cross-file style prop & bảng giá | `stylex-tap-4` |
| 5 | Theming: token thương hiệu, dark mode trong token & theme Tết | `stylex-tap-5` |
| 6 (CUỐI) | So găng trực diện Tailwind vs StyleX — chọn gì cho dự án của bạn | `stylex-tap-6` |

Demo: [`demo-stylex/`](demo-stylex/) (`vietsuper-web/` viết bằng StyleX + `compare-tailwind/` đối chứng Tailwind CSS v4, dùng ở Tập 6). Mỗi tập đóng băng bằng một git tag riêng — `git checkout stylex-tap-N` để xem đúng code xuất hiện trong tập tương ứng.

## Series "Phỏng vấn Frontend" (lô 1: React & Vue ep45–ep56 · lô 2: hiệu năng RN & Flutter ep57–ep68 · lô 3: backend Node.js & NestJS ep69–ep80, mỗi lô kèm 12 Shorts)

Series đổi hẳn định dạng: mỗi tập ngang là ĐÚNG MỘT câu hỏi phỏng vấn Frontend thật (6 câu React R1–R6, 6 câu Vue V1–V6) — nghe câu hỏi, xem demo code chạy thật minh họa đúng bẫy/hành vi, rồi chốt lại cách trả lời như đang ngồi trước nhà tuyển dụng. Mỗi câu ngang có kèm 1 bản Shorts 60 giây song song (sr1–sr6 phía React, sv1–sv6 phía Vue).

| # | Câu hỏi | Tập ngang | Short |
|---|---------|-----------|-------|
| R1 | Virtual DOM và reconciliation là gì? | ep45 | sr1 |
| R2 | useState và useEffect khác nhau thế nào? | ep46 | sr2 |
| R3 | Vì sao list cần key? Bẫy dùng index làm key | ep47 | sr3 |
| R4 | Controlled vs Uncontrolled component | ep48 | sr4 |
| R5 | React.memo, useMemo, useCallback — khi nào cần? | ep49 | sr5 |
| R6 | Custom Hook là gì, viết thế nào? | ep50 | sr6 |
| V1 | ref vs reactive & bẫy destructure mất reactivity | ep51 | sv1 |
| V2 | Options API vs Composition API | ep52 | sv2 |
| V3 | computed vs watch vs watchEffect | ep53 | sv3 |
| V4 | v-if vs v-show | ep54 | sv4 |
| V5 | :key trong v-for — vì sao không nên dùng index | ep55 | sv5 |
| V6 | Props xuống, emit lên | ep56 | sv6 |

Demo: [`demo-fe-interview/`](demo-fe-interview/) (`react-qa/` cổng 5197 + `vue-qa/` cổng 5196, mỗi app 6 trang minh họa hành vi thật cho đúng câu hỏi ở trên). `git checkout fe-qa-batch-1` để xem đúng code lô 1 (12 câu).

### Lô 2 — Hiệu năng React Native & Flutter (ep57–ep68 + 12 Shorts)

Lô 2 nối tiếp cùng format: 12 câu hỏi HIỆU NĂNG khi load nhiều dữ liệu — 6 câu React Native (N1–N6) + 6 câu Flutter (F1–F6), mỗi câu có demo đo số thật trên simulator (list ảo hóa, tối ưu FlatList/ListView, chặn render/rebuild thừa, infinite scroll, ảnh trong list, xử lý data lớn không chặn UI). Mỗi câu ngang kèm 1 bản Shorts 60 giây (sn1–sn6 phía React Native, sf1–sf6 phía Flutter).

| # | Câu hỏi | Tập ngang | Short |
|---|---------|-----------|-------|
| N1 | Vì sao FlatList mượt hơn ScrollView + map với 5.000 item? | ep57 | sn1 |
| N2 | Tối ưu FlatList: getItemLayout, windowSize, keyExtractor | ep58 | sn2 |
| N3 | React.memo cho renderItem — chặn render thừa cả list | ep59 | sn3 |
| N4 | Infinite scroll: vì sao onEndReached gọi trùng, guard bằng ref | ep60 | sn4 |
| N5 | Ảnh trong list dài — expo-image, decode đúng cỡ + cache 2 tầng | ep61 | sn5 |
| N6 | Data lớn chặn JS thread — đo frame gap, chia lô setTimeout 0 | ep62 | sn6 |
| F1 | ListView.builder vs Column trong SingleChildScrollView | ep63 | sf1 |
| F2 | itemExtent + const — báo trước chiều cao cho ListView | ep64 | sf2 |
| F3 | setState rebuild cả trang — localize, tách widget | ep65 | sf3 |
| F4 | Infinite scroll với ScrollController — guard cờ loading | ep66 | sf4 |
| F5 | cacheWidth — decode ảnh đúng kích thước hiển thị | ep67 | sf5 |
| F6 | Isolate.run — parse data lớn không chặn UI | ep68 | sf6 |

Demo: [`demo-perf-interview/`](demo-perf-interview/) (`rn-perf/` + `flutter_perf/`, mỗi app 6 trang đo số thật cho đúng câu hỏi ở trên). `git checkout perf-qa-batch-2` để xem đúng code lô 2 (12 câu).

### Lô 3 — Backend Node.js & NestJS (ep69–ep80 + 12 Shorts)

Lô 3 nối tiếp cùng format, rẽ sang BACKEND — 12 câu hỏi mà dân Frontend đi phỏng vấn Fullstack chắc chắn gặp: 6 câu Node.js core (B1–B6) + 6 câu NestJS (S1–S6), mỗi câu có demo chạy số thật trên Node 22 (event loop, non-blocking I/O, worker_threads, stream/backpressure, Promise.all, CommonJS vs ESM; DI/IoC, request lifecycle, guard, ValidationPipe, interceptor, exception filter). Mỗi câu ngang kèm 1 bản Shorts 60 giây (sb1–sb6 phía Node.js, ss1–ss6 phía NestJS).

| # | Câu hỏi | Tập ngang | Short |
|---|---------|-----------|-------|
| B1 | Event loop Node — thứ tự chạy thật (+ twist ESM: promise trước nextTick) | ep69 | sb1 |
| B2 | Node 1 thread — vì sao vẫn cân nghìn request? Non-blocking I/O | ep70 | sb2 |
| B3 | CPU-bound làm server đơ — worker_threads vs cluster | ep71 | sb3 |
| B4 | Stream và backpressure — file 1GB, RAM dưới 100MB | ep72 | sb4 |
| B5 | Promise.all — 3 API trong 300ms và bẫy fail-fast | ep73 | sb5 |
| B6 | CommonJS vs ESM — require(esm) đã chạy được (Node 22.12) | ep74 | sb6 |
| S1 | DI trong NestJS — IoC container, vì sao không tự new service? | ep75 | ss1 |
| S2 | Request lifecycle NestJS — 6 lớp theo thứ tự | ep76 | ss2 |
| S3 | Guard vs Middleware — auth đặt ở đâu, bẫy 401/403 | ep77 | ss3 |
| S4 | ValidationPipe + DTO — chặn body bẩn, whitelist | ep78 | ss4 |
| S5 | Interceptor — bọc response chung khuôn, đo giờ mọi API | ep79 | ss5 |
| S6 | Exception filter — chuẩn hóa lỗi toàn app | ep80 | ss6 |

Demo: [`demo-be-interview/`](demo-be-interview/) (`node-qa/` 6 script đo số thật + `nest-qa/` app NestJS 6 route minh họa đúng câu hỏi ở trên). `git checkout be-qa-batch-3` để xem đúng code lô 3 (12 câu).

## Cấu trúc repo

- `demo-*/` — code NestJS thật xuất hiện trong video (chạy được, đã test).
- `demo-miniapps/` — code series Mini-App React Native (monorepo npm workspaces).
- `demo-flutter-miniapp/` — code series Mini-App với Flutter (add-to-app: app chủ SwiftUI + module Flutter, + bonus app chủ Kotlin/Jetpack Compose).
- `demo-flutter-workspace/` — code series Mini-App Flutter thuần (pub workspace: app chủ + app vỏ standalone + 3 package mini-app, một pubspec.lock chung).
- `demo-stylex/` — code series StyleX từ A đến Z (`vietsuper-web/` dùng StyleX + `compare-tailwind/` đối chứng Tailwind CSS v4).
- `demo-fe-interview/` — code series Phỏng vấn Frontend (`react-qa/` + `vue-qa/`, 12 ví dụ minh họa hành vi thật cho các câu hỏi phỏng vấn React & Vue).
- `video/` — project [Remotion](https://remotion.dev) render toàn bộ video và thumbnail.
- `tts/` — pipeline thuyết minh tiếng Việt bằng [VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS): kịch bản JSON → audio + timing → Remotion.
- `docs/` — kịch bản thiết kế, kế hoạch và bộ SEO YouTube.

> Video trong series được sản xuất hoàn toàn bằng code: kịch bản là file JSON, giọng đọc là TTS, hình ảnh render bằng React. Xem `docs/superpowers/specs/` nếu bạn tò mò về pipeline.
