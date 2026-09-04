# demo-flutter-workspace — khu chung cư thuần Flutter (pub workspace)

Demo cho series "Flutter Mini-App": một pub workspace duy nhất chứa 2 app và 3
mini-app dùng chung code, không cần lockfile riêng cho từng package, không cần
`melos`/`path: ../..` thủ công.

## Sơ đồ thư mục

```
demo-flutter-workspace/
├── pubspec.yaml                 # root — khai workspace: liệt kê mọi member
├── pubspec.lock                 # 1 lockfile DUY NHẤT cho cả workspace
├── apps/
│   ├── vietsuper/                # app chủ — 3 tab + 1 màn push
│   │   ├── lib/
│   │   │   ├── main.dart
│   │   │   ├── home_shell.dart   # NavigationBar 3 tab + Navigator.push Đặt xe
│   │   │   ├── home_screen.dart  # lưới 4 ô dịch vụ (1 ô mờ = "Sắp ra mắt")
│   │   │   └── under_construction.dart
│   │   └── pubspec.yaml          # resolution: workspace + dep mini_news/mini_topup/mini_ride
│   └── news_standalone/          # app riêng — chỉ 1 màn, tái dùng mini_news
│       ├── lib/main.dart
│       └── pubspec.yaml
└── packages/
    ├── mini_news/                 # mini-app: sống trên tab Tin tức
    │   ├── lib/mini_news.dart
    │   └── lib/src/news_screen.dart
    ├── mini_topup/                # mini-app: sống trên tab Nạp thẻ
    │   ├── lib/mini_topup.dart
    │   └── lib/src/topup_screen.dart
    └── mini_ride/                 # mini-app: sống NGOÀI tab (Navigator.push)
        ├── lib/mini_ride.dart
        └── lib/src/ride_screen.dart
```

## Yêu cầu

- **FVM 3.38.10** (đã pin trong `.fvmrc`) — đi kèm **Dart 3.10**. Tính năng
  `pub workspace` có từ **Dart 3.5**, không phải 3.10 — bản Dart ở đây chỉ
  là bản đi kèm Flutter 3.38.10 được pin trong repo (SDK constraint Dart
  3.10 trong mọi `pubspec.yaml` của repo).

## Lệnh

```bash
# 1) Cài dependency cho CẢ workspace — chạy 1 lần ở thư mục gốc
cd demo-flutter-workspace
fvm flutter pub get

# 2) Chạy từng app — luôn chạy TRONG thư mục app, không chạy ở root
cd apps/vietsuper && fvm flutter run
cd apps/news_standalone && fvm flutter run
```

`fvm flutter pub get` ở root resolve dependency cho mọi member cùng lúc và
sinh ra đúng 1 `pubspec.lock` ở root — các app/package con không có
`pubspec.lock` riêng.

## Bảng mini-app ↔ vị trí xuất hiện

| Mini-app     | Vị trí trong app chủ (`vietsuper`)                          | Dùng lại ở app khác?              |
| ------------ | ------------------------------------------------------------ | ---------------------------------- |
| `mini_news`  | **Tab** "Tin tức" (index 1) trong `NavigationBar`            | Có — là toàn bộ `news_standalone`  |
| `mini_topup` | **Tab** "Nạp thẻ" (index 2) trong `NavigationBar`            | Không                               |
| `mini_ride`  | **Push** — `Navigator.push(MaterialPageRoute(...))` từ ô "Đặt xe" ở tab Trang chủ, có nút back trên `AppBar` | Không                               |

Ba cách gắn mini-app vào app chủ:
1. **Tab** — mini-app là 1 phần tử trong danh sách `screens` của
   `HomeShell`, chuyển bằng `NavigationBar`, không có back, không có
   `AppBar` riêng (dùng chung `AppBar` của `HomeShell`).
2. **Push** — mini-app được bọc trong `Scaffold` + `AppBar` riêng, mở bằng
   `Navigator.push`, có nút back mặc định, đóng thì quay về nguyên trạng màn
   trước.
3. **Standalone** — mini-app là `body:` duy nhất của một app hoàn toàn khác
   (`news_standalone`), chứng minh code dùng lại được ngoài phạm vi
   `vietsuper`.

## `workspace:` / `resolution: workspace` / dep theo tên hoạt động thế nào

- **Root `pubspec.yaml`** khai `workspace:` — liệt kê đường dẫn tới mọi
  app/package tham gia workspace (`apps/vietsuper`, `apps/news_standalone`,
  `packages/mini_news`, `packages/mini_topup`, `packages/mini_ride`). Đây là
  danh sách duy nhất pub cần biết để gộp resolve.
- **Mỗi package/app con** khai `resolution: workspace` trong `pubspec.yaml`
  của chính nó — báo cho pub biết "package này resolve theo workspace cha,
  đừng tự resolve riêng".
- **Dependency giữa các package trong cùng workspace khai theo TÊN**, không
  cần `path:`:
  ```yaml
  dependencies:
    mini_news: any
    mini_topup: any
    mini_ride: any
  ```
  Vì cả 2 phía (package cung cấp và package dùng) đều nằm trong cùng
  `workspace:` ở root, pub tự biết `mini_ride: any` nghĩa là
  `packages/mini_ride` tại chỗ, không đi tra pub.dev.

### Lưu ý về `flutter_test`

`flutter_test` chỉ được khai **1 lần**, trong `dev_dependencies` của
`apps/vietsuper/pubspec.yaml` — các package `mini_news`/`mini_topup`/
`mini_ride` KHÔNG có `dev_dependencies: flutter_test` riêng nhưng vẫn
`import 'package:flutter_test/flutter_test.dart'` được trong test của chúng,
vì workspace resolve dev-dependency dùng chung cho cả cây.

**Cảnh báo:** đây là hành vi CHỈ có bên trong workspace. Nếu tách một package
(vd. `mini_ride`) ra khỏi thư mục `demo-flutter-workspace/` để dùng độc lập
(app khác, repo khác, publish lên pub.dev), package đó phải tự khai
`dev_dependencies: flutter_test: {sdk: flutter}` trong `pubspec.yaml` của
chính nó — nếu không test sẽ không resolve được `flutter_test` nữa.

---

Series video kèm theo: playlist cập nhật sau khi đăng.
