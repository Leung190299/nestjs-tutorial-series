# Series "Mini-App Flutter thuần — Pub Workspace" — Thiết kế

Ngày: 2026-09-04. Trạng thái: đã duyệt. Mảnh cuối của bộ ba cách làm mini-app trên kênh
(RN workspace → Flutter add-to-app → Flutter thuần).

## Mục tiêu

Series MỚI 5 tập ep34–ep38, đánh số riêng "Tập N/5", playlist mới
"Mini-App Flutter thuần 🇻🇳". Toàn bộ code là Flutter/Dart — không native host.
Kiến trúc: **Dart pub workspace** (chính thức từ Dart 3.5; Flutter 3.38 hỗ trợ) —
root `pubspec.yaml` khai `workspace:`, mỗi package con `resolution: workspace`.
Nối chuyện với series RN ("npm workspaces bản Dart"). Khán giả: biết Flutter cơ bản.

## Demo — `demo-flutter-workspace/`

```
demo-flutter-workspace/
├── pubspec.yaml                  # workspace root — "sổ đỏ khu chung cư"
├── packages/
│   ├── mini_news/                # Tin tức 📰 (tab) — mini đầu tiên (ep35)
│   ├── mini_topup/               # Nạp thẻ 📱 (tab) — xây A-Z ở ep37
│   └── mini_ride/                # Đặt xe 🛵 — màn push NGOÀI tab (ep38)
└── apps/
    ├── vietsuper/                # App chủ: NavigationBar 3 tab + lưới dịch vụ Trang chủ
    └── news_standalone/          # Vỏ mỏng chạy lẻ mini Tin tức (ep36)
```

- Mỗi mini = 1 package Flutter export một Screen widget (công thức căn hộ/sổ đỏ/
  cửa chính/tấm biển của series RN, thuần Dart). Gắn tab = vài dòng import.
- Đặt xe mở bằng `Navigator.push` từ card lưới Trang chủ — dạy push/pop thuần,
  KHÔNG thêm package router (YAGNI).
- Nội dung mini MỚI (không lặp Đồ ăn/Ví/Xem phim): Tin tức (danh sách bài + đọc
  chi tiết), Nạp thẻ (form → success 2 trạng thái, reset), Đặt xe (chọn-một loại xe
  string?/null + stepper km clamp + tổng tiền).
- Lưới Trang chủ 4 ô: 3 mini thật + 1 ô mờ "sắp ra mắt" (truyền thống series).
- Điểm so sánh then chốt với add-to-app: cả khu MỘT engine — "tòa nhà và căn hộ
  cùng chất liệu, một đồng hồ tổng"; đổi lại mini không cô lập bằng.
- App tên ViệtSuper, seed màu 0xffea2845, giọng chuỗi tiếng Việt như các series trước.

## Danh sách tập

| Tập | Nội dung | Cái mới |
|---|---|---|
| 1 (ep34) | Pub workspace từ số 0 + app chủ (3 tab + lưới, các ô mờ) | workspace ≈ npm workspaces bản Dart |
| 2 (ep35) | Căn hộ đầu tiên mini_news + gắn tab | package, resolution: workspace, export screen |
| 3 (ep36) | news_standalone — mini ra ở riêng | vỏ mỏng, cùng căn hộ hai cửa |
| 4 (ep37) | Công thức lặp: mini_topup từ A-Z | form→success 2 trạng thái |
| 5 (ep38) | mini_ride màn NGOÀI tab + tổng kết BỘ BA cách làm | Navigator.push; bảng so 3 công thức |

## Sản xuất & môi trường

Pipeline y cũ: demo verified TRƯỚC trên iPhone 17 Pro simulator (UDID
B282E25D-806A-4F2D-AD25-F4411158CDF8, FVM 3.38.10) → git tag `flutter-workspace-tap-N`
theo tập → kịch bản ep34–38 byte-match theo tag → TTS Adam → Remotion + thumbnail
`shot` → SEO mục mới trong docs/seo-youtube.md → đăng playlist mới khi người dùng
yêu cầu; tập cuối link chéo 2 playlist kia (Mini-App từ A đến Z PLY-i2_1YbKi4,
Mini-App với Flutter PLL5FgtEBrD6g). Bài học component giữ nguyên (≤21 dòng/scene
code, văn xuôi dài dùng concept, title phone ≤31 ký tự, diagram flow liền kề,
thumbnail tránh từ dài). KHÔNG sửa demo cũ (demo-flutter-miniapp, demo-miniapps,
demo-superapp).

## Rủi ro

Thấp — không native/broker. Duy nhất: cú pháp pub workspace trên Dart 3.10
(verify ngay task đầu; nếu cần chỉnh so với tài liệu thì đưa thành nội dung video).
Widget test cho từng mini như phase demo add-to-app.
