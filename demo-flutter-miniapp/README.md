# Flutter add-to-app trong app SwiftUI 🇻🇳

Demo **Flutter add-to-app**: một app host viết bằng SwiftUI (`vietsuper_ios`) nhúng nhiều "mini app"
viết bằng Flutter (`mini_flutter`) qua `FlutterEngineGroup` — giống mô hình super app (ViệtSuper) có
1 app chính và nhiều tiện ích nhỏ (đặt đồ ăn, ví điện tử, đặt vé xem phim) chạy chung.

> Series video kèm theo: playlist sẽ cập nhật sau khi đăng.

## Cấu trúc thư mục

```
demo-flutter-miniapp/
├── mini_flutter/              # Flutter module (--template=module), KHÔNG phải app độc lập
│   ├── lib/
│   │   ├── format.dart        # formatVnd() — 1250000 -> "1.250.000đ"
│   │   ├── mini_shell.dart    # MiniAppShell + hostChannel (MethodChannel 'vietsuper/host')
│   │   ├── food_screen.dart   # UI mini Đồ ăn
│   │   ├── wallet_screen.dart # UI mini Ví (gọi getUserInfo qua channel)
│   │   ├── cinema_screen.dart # UI mini Xem phim
│   │   ├── main.dart          # menu debug — chạy lẻ cả module, kéo cả 3 entrypoint vào kernel
│   │   ├── main_food.dart     # entrypoint mini Đồ ăn (@pragma('vm:entry-point'))
│   │   ├── main_wallet.dart   # entrypoint mini Ví
│   │   └── main_cinema.dart   # entrypoint mini Xem phim
│   └── test/                  # 1 test/màn hình + test format tiền
└── vietsuper_ios/              # App host SwiftUI, sinh bằng XcodeGen
    ├── project.yml             # định nghĩa target VietSuper (đầu vào của xcodegen)
    ├── Podfile                 # nhúng Flutter engine + mini_flutter qua CocoaPods
    └── VietSuper/
        ├── VietSuperApp.swift
        ├── ContentView.swift      # lưới card (LazyVGrid), tap card -> full screen cover
        ├── MiniApp.swift          # danh sách mini {id, name, emoji, library}
        ├── MiniAppLauncher.swift  # FlutterEngineGroup dùng chung + MethodChannel host
        └── MiniAppView.swift      # bọc FlutterViewController cho SwiftUI
```

## Yêu cầu môi trường

- [FVM](https://fvm.app/) với Flutter **3.38.10** đã pin (`mini_flutter/.fvmrc`)
- Xcode **26** (iOS SDK 26.2) + Simulator
- [CocoaPods](https://cocoapods.org/)
- [XcodeGen](https://github.com/yonaskolb/XcodeGen) (`brew install xcodegen`)

## Chạy host (3 lệnh)

```bash
# 1. Cài dependency Flutter cho module
cd demo-flutter-miniapp/mini_flutter
fvm flutter pub get

# 2. Sinh Xcode project + cài Pods (Flutter engine)
cd ../vietsuper_ios
xcodegen generate
LANG=en_US.UTF-8 pod install

# 3. Build + cài + chạy trên simulator
xcodebuild -workspace VietSuper.xcworkspace -scheme VietSuper \
  -configuration Debug -destination 'id=<UDID simulator>' \
  -derivedDataPath build build
xcrun simctl install <UDID> build/Build/Products/Debug-iphonesimulator/VietSuper.app
xcrun simctl launch <UDID> com.vietsuper.host
```

App hiện lưới 3 card: 🍜 Đồ ăn, 👛 Ví, 🎬 Xem phim. Tap 1 card mở mini tương ứng full-screen; nút ✕
gọi channel để đóng và quay về lưới.

> **Lưu ý khi build lại:** nếu trước đó bạn từng `flutter run -t lib/main_xxx.dart` (xem mục dưới),
> file generated `mini_flutter/.ios/Flutter/Generated.xcconfig` và `flutter_export_environment.sh` sẽ
> còn ghim `FLUTTER_TARGET` vào entrypoint đó. Lần build tiếp theo của host sẽ chỉ đóng gói kernel của
> riêng entrypoint đó, khiến các mini còn lại lỗi runtime `Dart_LookupLibrary: library ... not found`.
> Chạy lại `fvm flutter pub get` không tự sửa việc này — sửa bằng cách chạy một lệnh Flutter trỏ về
> `lib/main.dart` (ví dụ `fvm flutter build bundle --target=lib/main.dart` rồi kiểm tra
> `Generated.xcconfig`), hoặc đơn giản là build lại từ `xcodebuild` sau khi đã chạy lẻ `-t lib/main.dart`
> một lần.

## Host Android (vietsuper_android)

Song song với host SwiftUI, `vietsuper_android` là host **Kotlin + Jetpack Compose** nhúng cùng
`mini_flutter` qua `FlutterEngineGroup` — cùng 3 mini, cùng channel `vietsuper/host`, chỉ khác ngôn
ngữ/UI toolkit phía chủ.

**Yêu cầu riêng:** JDK **21** — dùng đúng bản JBR đi kèm Android Studio (không cần cài JDK ngoài),
khai trong `vietsuper_android/gradle.properties`:

```properties
org.gradle.java.home=/Applications/Android Studio.app/Contents/jbr/Contents/Home
```

```bash
# 1. Cài dependency Flutter cho module (giống bước 1 của iOS ở trên, dùng chung)
cd demo-flutter-miniapp/mini_flutter
fvm flutter pub get

# 2. Build APK debug
cd ../vietsuper_android
./gradlew :app:assembleDebug

# 3. Cài + chạy trên emulator/thiết bị đang kết nối (adb devices thấy máy)
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb shell monkey -p com.vietsuper.host -c android.intent.category.LAUNCHER 1
```

App hiện cùng lưới 3 card 🍜 Ví 👛 Xem phim 🎬 như bản iOS; tap card mở mini full-screen, nút ✕ hoặc
phím Back của Android đều gọi channel `close` để đóng và quay về lưới.

> **`local.properties`:** file này **không commit** (đã có trong `.gitignore`) vì trỏ đường dẫn cục bộ
> trên máy — tự tạo `vietsuper_android/local.properties` với 2 dòng:
> ```properties
> sdk.dir=<đường dẫn Android SDK, ví dụ ~/Library/Android/sdk>
> flutter.sdk=<đường dẫn Flutter SDK mà FVM đang pin, ví dụ ~/fvm/versions/3.38.10>
> ```

## Chạy lẻ từng mini (không cần host)

Mỗi mini có thể chạy độc lập ngay trong `mini_flutter` bằng cờ `-t`, hữu ích khi phát triển UI mà
không cần build lại app host:

```bash
cd demo-flutter-miniapp/mini_flutter
fvm flutter run -d <UDID> -t lib/main_food.dart     # mini Đồ ăn
fvm flutter run -d <UDID> -t lib/main_wallet.dart   # mini Ví (fallback dữ liệu mẫu, không có host)
fvm flutter run -d <UDID> -t lib/main_cinema.dart   # mini Xem phim
fvm flutter run -d <UDID> -t lib/main.dart          # menu debug — mở lần lượt cả 3 màn
```

Khi chạy lẻ, `hostChannel.invokeMethod(...)` không có ai trả lời (`MissingPluginException`) — mỗi màn
hình tự có đường fallback riêng (ví dụ Ví hiện "Khách chạy lẻ / 500.000đ / Dữ liệu mẫu").

## Bảng entrypoint ↔ card trên host

| Card (host) | Emoji | Entrypoint Dart | Màn hình |
|---|---|---|---|
| Đồ ăn | 🍜 | `package:mini_flutter/main_food.dart` | `FoodScreen` — chọn món, tính tổng |
| Ví | 👛 | `package:mini_flutter/main_wallet.dart` | `WalletScreen` — số dư lấy qua `getUserInfo` |
| Xem phim | 🎬 | `package:mini_flutter/main_cinema.dart` | `CinemaScreen` — đặt vé, tính tổng |

## Channel `vietsuper/host`

Mỗi `FlutterViewController` được host tạo qua `MiniAppLauncher` đều gắn kèm 1
`FlutterMethodChannel(name: "vietsuper/host")`, xử lý ở phía Swift (`MiniAppLauncher.swift`):

- `getUserInfo` → trả `{"name": "Lee", "balance": 1250000}` (dữ liệu giả lập của app chủ).
- `close` → gọi callback `onClose`, host đóng `fullScreenCover` và quay về lưới.

Phía Dart, `mini_shell.dart` export hằng `hostChannel` dùng chung cho cả 3 mini; nút ✕ trên mỗi mini
gọi `close`, còn `WalletScreen` gọi `getUserInfo` lúc `initState`.

## Test & lint

```bash
cd demo-flutter-miniapp/mini_flutter
fvm flutter test      # 4 test: format + 3 màn hình
fvm flutter analyze   # No issues found!
```
