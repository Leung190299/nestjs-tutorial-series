# Bonus Kotlin Add-to-App (Android) — Thiết kế

Ngày: 2026-09-03. Trạng thái: đã duyệt. Là phần đã hứa ở outro ep31 series "Mini-App với Flutter".

## Mục tiêu

2 tập bonus (ep32–ep33, mở ep34 nếu nội dung tràn) đăng NỐI vào playlist
"Mini-App với Flutter 🇻🇳" (PLL5FgtEBrD6g), title dạng "… | Bonus Android N/2".
Thông điệp vàng: **module `mini_flutter` không sửa một dòng Dart nào** — cắm sang
tòa nhà Android bằng app chủ Kotlin mới.

## Kiến trúc — `demo-flutter-miniapp/vietsuper_android/`

Host Kotlin + Jetpack Compose, soi gương từng mảnh với bản iOS:

| iOS (đã dạy ep26–31) | Android (bonus) |
|---|---|
| SwiftUI ContentView lưới card | Jetpack Compose `LazyVerticalGrid` |
| CocoaPods podhelper.rb | `settings.gradle` + `include_flutter.groovy` (chính chủ, hot-reload được) |
| FlutterEngineGroup + libraryURI | `FlutterEngineGroup` + `DartExecutor.DartEntrypoint(bundlePath, "package:mini_flutter/main_X.dart", "main")` |
| FlutterViewController + fullScreenCover | `FlutterActivity.withCachedEngine` (FlutterEngineCache; mini = Activity riêng, back Android tự nhiên) |
| Channel Swift `vietsuper/host` | CÙNG channel, handler Kotlin: `getUserInfo` → ["name": "Lee", "balance": 1_250_000]; `close` → activity.finish() |

Loại có chủ đích: AAR integration (mất hot-reload, nhiều nghi lễ build — nhắc 1 câu
trong video); nhúng FlutterView vào Compose qua AndroidView (không phải đường chính chủ).

Ẩn dụ giữ nguyên series: tòa nhà (nay là tòa nhà Android) / căn hộ lắp ghép /
đồng hồ điện nước / lễ tân.

## Nội dung 2 tập

- **ep32 — Bonus 1 "Cùng căn hộ, tòa nhà Android"**: Compose 60 giây cho người
  Flutter (composable ≈ widget, cùng triết lý declarative — dễ hơn Swift);
  settings.gradle + include_flutter.groovy; EngineGroup Kotlin + DartEntrypoint;
  mở mini Đồ ăn từ lưới Compose; nghiệm thu emulator.
- **ep33 — Bonus 2 (kết)**: MethodChannel handler Kotlin (getUserInfo/close);
  đủ 3 mini lên lưới; so găng 2 host Swift vs Kotlin cạnh nhau (cùng module,
  hai nền tảng); lời kết cả chùm 8 video.

## Môi trường & rủi ro

- Máy: Android SDK ~/Library/Android/sdk, emulator + AVD `Medium_Phone_API_36.1`,
  adb /opt/homebrew/bin/adb. Java mặc định 25 QUÁ MỚI cho Gradle của Flutter →
  build bằng JDK 21 (JBR của Android Studio nếu có, hoặc sdkman temurin 21; set
  JAVA_HOME cục bộ / gradle.properties org.gradle.java.home). Vấp này ĐƯA VÀO VIDEO.
- Screenshot thật từ emulator: `adb exec-out screencap -p`, thao tác `adb shell input tap`.
- PhoneScene hiện vẽ khung kiểu iPhone — kiểm với ảnh Android; nếu lệch, thêm prop
  khung trung tính (không đụng render 25 tập cũ).
- KHÔNG sửa module mini_flutter (trừ khi bắt buộc kỹ thuật — mọi sửa đổi phải flag);
  KHÔNG sửa vietsuper_ios; KHÔNG đụng demo cũ.

## Sản xuất

Pipeline y cũ: demo verified trước → tag `flutter-miniapp-android-1/2` → kịch bản
ep32–33 (byte-match theo tag, CodeBlock ngôn ngữ `kotlin`/`clike` cho Gradle) →
TTS Adam → composition + thumbnail `shot` (ảnh emulator) → SEO thêm mục
"Flutter Mini-App Bonus Android #1/#2" → đăng nối playlist khi người dùng yêu cầu.
Bài học component đã đúc kết vẫn áp dụng (≤21 dòng/scene code, văn xuôi dài dùng
concept, title phone ≤31 ký tự, diagram flow liền kề).
