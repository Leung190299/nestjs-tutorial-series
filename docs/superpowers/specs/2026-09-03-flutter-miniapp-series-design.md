# Series "Mini-App với Flutter — Add-to-App" — Thiết kế

Ngày: 2026-09-03. Trạng thái: đã duyệt (người dùng chọn phương án C full — host native Swift).

## Mục tiêu

Series video YouTube tiếng Việt mới, đánh số riêng, dạy kiến trúc mini-app **add-to-app**:
app chủ native SwiftUI nhúng các mini-app viết bằng Flutter, mỗi mini chạy trong engine
riêng qua `FlutterEngineGroup`. Đây là kiến trúc "mỗi tính năng như 1 app riêng biệt"
đúng nghĩa đen nhất — và là cách các super-app thật nhúng Flutter.

- Khán giả: đã biết Flutter cơ bản (viết được StatefulWidget). **Không cần biết Swift** —
  mọi dòng Swift trên video được giải thích từ đầu.
- App demo: ViệtSuper bản Flutter (cùng thương hiệu với series React Native để khán giả
  so sánh hai cách làm).
- Tuân thủ luật series: chi tiết từng bước, không chung chung, chủ đề lớn có series riêng
  với đánh số riêng.

## Kiến trúc demo — `demo-flutter-miniapp/`

```
demo-flutter-miniapp/
├── vietsuper_ios/        # App chủ: SwiftUI (Xcode project), lưới card dịch vụ
└── mini_flutter/         # MỘT Flutter module, NHIỀU entrypoint
    └── lib/
        ├── main.dart             # entrypoint mặc định — menu debug khi chạy lẻ
        ├── main_food.dart        # @pragma('vm:entry-point') → mini Đồ ăn
        ├── main_wallet.dart      # → mini Ví (có platform channel)
        └── main_cinema.dart      # → mini Xem phim (xây từ A-Z ở tập 5)
```

Quyết định chính:

- **1 module, nhiều entrypoint** (không phải nhiều module): đúng thiết kế của
  `FlutterEngineGroup` — các engine chung tài nguyên, mở mini thứ hai gần như miễn phí RAM.
- Host SwiftUI: lưới card dịch vụ giữ ngôn ngữ hình ảnh ViệtSuper; bấm card → tạo engine
  từ group với entrypoint tương ứng, present `FlutterViewController` full-screen có nút đóng.
- **Platform channel** (tập 4): mini Ví hỏi host tên user + số dư qua `MethodChannel`,
  host trả lời từ Swift — minh họa giao tiếp mini↔chủ hai chiều.
- Nhúng bằng **CocoaPods + podhelper** (cách chính chủ, còn hot-reload khi dev).
- Mỗi mini vẫn chạy lẻ được: `flutter run -t lib/main_food.dart` — giữ triết lý
  "căn hộ ra ở riêng" của series cũ.
- Ẩn dụ xuyên suốt: app native = tòa nhà bê tông xây sẵn; Flutter module = dãy căn hộ
  lắp ghép cắm vào tòa nhà; engine = đồng hồ điện nước riêng của mỗi căn.

Môi trường máy: FVM Flutter 3.38.10 stable, Xcode 26.3, CocoaPods 1.16.2, iOS Simulator.

## Danh sách tập (6 tập, ep26–ep31)

| Tập | Nội dung | Cái mới học được |
|---|---|---|
| 1 (ep26) | Add-to-app là gì? `flutter create --template=module` + chạy mini Đồ ăn độc lập | module ≠ app; khái niệm engine |
| 2 (ep27) | Host SwiftUI từ số 0 + nhúng engine đầu tiên qua CocoaPods, bấm card mở mini Đồ ăn | SwiftUI cơ bản; podhelper; FlutterViewController |
| 3 (ep28) | `FlutterEngineGroup`: thêm mini Ví bằng entrypoint thứ hai, 2 mini sống cùng lúc | entrypoint; engine group; tiết kiệm RAM |
| 4 (ep29) | Platform channel: mini Ví hỏi host tên/số dư | MethodChannel 2 chiều Swift↔Dart |
| 5 (ep30) | Chữa công thức: xây mini Xem phim từ A-Z (entrypoint mới + card mới + channel) | công thức N bước lặp lại |
| 6 (ep31) | Chạy lẻ từng mini + tổng kết kiến trúc, so sánh với bản React Native | bức tranh toàn cảnh; release build |

Mỗi tập ~6–9 phút, 50/50 khái niệm/code, scene `phone` dùng screenshot simulator thật,
code trên video khớp byte với demo đã chạy verified, git tag theo tập
(`flutter-miniapp-tap-N`, tag trước khi tập sau sửa file đã chiếu).

## Pipeline sản xuất

Tái dùng nguyên pipeline hiện có:

1. Demo code chạy verified trên simulator TRƯỚC, kịch bản viết SAU.
2. `tts/scripts/ep26–ep31.json` → `tts/.venv/bin/python tts/generate.py epXX`
   (VieNeu-TTS giọng Adam) → `video/src/data/epXX.timing.json`.
3. Composition + Thumb trong `video/src/Root.tsx`; thumbnail variant `shot`
   (ảnh app thật, seriesTag riêng cho series Flutter).
4. CodeScene thêm highlight `swift` (prism-react-renderer có sẵn).
5. SEO từng tập ghi vào `docs/seo-youtube.md`; playlist YouTube mới
   "Mini-App với Flutter 🇻🇳" (chỉ đăng khi người dùng yêu cầu).

## Rủi ro & đối sách

- Xcode 26 + CocoaPods có thể vướng lặt vặt → ghi hình đúng lỗi thật + cách sửa.
- Khán giả Android: outro hứa bản Kotlin nếu nhiều người comment.
- Series khó hơn RN → tập 1 phải trả lời "tại sao đáng học" trong 30 giây đầu.
- KHÔNG sửa demo-miniapps/demo-superapp (nguồn sự thật của video đã đăng).
