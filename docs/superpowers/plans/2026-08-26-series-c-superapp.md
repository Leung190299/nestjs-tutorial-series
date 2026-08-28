# Series C — "Super App với React Native + Expo" (ep13–ep18) — Plan

**Goal:** 6 tập (~5 phút/tập) xây app "ViệtSuper" kiểu Grab thu nhỏ bằng Expo + expo-router, ảnh chụp màn hình THẬT từ iOS Simulator đưa vào video qua scene type mới `phone`. Kèm 6 thumbnail + SEO. Tập cuối nối app với backend NestJS mini → khép vòng fullstack với các series trước.

## Nâng cấp pipeline (làm trước)

1. **PhoneScene** (`video/src/scenes/PhoneScene.tsx`, đăng ký type `phone`): visual `{title, screens: [{src, sentence}], bullets?: [{icon?, text, sentence}]}`. Trái: title + bullet cards (kiểu ConceptScene); phải: khung điện thoại bo góc chứa `<Img>` screenshot (staticFile), ảnh đổi theo câu (last screen có sentence ≤ idx), spring nhẹ khi đổi. Fixture ep00 thêm 1 scene phone (dùng 1 ảnh placeholder chụp simulator thật).
2. **validate_script**: thêm key `screens` vào danh sách kiểm tra sentence-index; cập nhật test.
3. Screenshot lưu `video/public/screens/epXX/*.png` — CÓ commit (cần để re-render; ~vài trăm KB/ảnh).

## Demo apps (3 codebase, tách để giữ byte-match từng tập với trạng thái cuối)

- **`demo-hello/`** (ep13): `create-expo-app --template blank-typescript`. App.tsx: màn chào ViệtSuper 🇻🇳 + nút đếm số lần chạm (useState, Pressable, StyleSheet, nền #0f172a, accent #ea2845).
- **`demo-superapp/`** (ep14–18): `create-expo-app` (template default có expo-router). Thay toàn bộ `app/`:
  - `app/_layout.tsx`: Stack gốc, headerShown false.
  - `app/(tabs)/_layout.tsx`: 4 tab CỐ ĐỊNH từ ep14 (Trang chủ 🏠 index, Đồ ăn 🍜 food, Ví 💰 wallet, Ưu đãi 🎁 promo) — file này không đổi ở các tập sau (tránh xung đột byte-match). Icon = emoji qua helper `icon()`.
  - `app/(tabs)/index.tsx` (ep15): chào người dùng + FlatList numColumns 3 lưới 6 dịch vụ (3 thật: Đồ ăn/Ví/Ưu đãi qua `<Link asChild><Pressable>`; 3 "sắp ra mắt": Đặt xe/Xem phim/Nạp thẻ).
  - `app/(tabs)/food.tsx` (ep16): menu 4 món VN cứng (Phở bò 45k, Cơm tấm 40k, Bánh mì 25k, Trà sữa 30k), nút "+ Thêm" đẩy id vào cart useState, thanh giỏ hàng dưới: số món + tổng tiền (reduce, toLocaleString('vi')).
  - `app/(tabs)/wallet.tsx` (ep17): số dư + nút "Nạp 100.000đ" + lịch sử giao dịch; lưu/đọc AsyncStorage (`@react-native-async-storage/async-storage`) key `wallet` — tắt app mở lại tiền còn nguyên (điểm đinh của tập).
  - `app/(tabs)/promo.tsx` (ep18): fetch `http://localhost:3999/promos`, ActivityIndicator lúc loading, FlatList ưu đãi.
- **`demo-superapp-api/`** (ep18): NestJS tối giản, PromosController GET /promos trả 3 ưu đãi (emoji/title/detail), main.ts listen(3999) — cổng 3999 tránh đụng project khác của máy.

Placeholder ban đầu cho food/wallet/promo khi làm ep14: KHÔNG cần — build thẳng bản cuối; các tập chỉ chiếu file thuộc tập mình. Kịch bản viết SAU khi code chạy verify (nguồn sự thật là file cuối).

## Screenshot cần chụp (iPhone 17 simulator, Expo Go)

- ep13: màn hello (2 ảnh: taps=0 và sau vài lần chạm)
- ep14: tab bar hiện 4 tab (màn index còn trống cũng được — chụp SAU khi có index thì đẹp hơn: dùng ảnh home + focus tab bar)
- ep15: home lưới dịch vụ (1-2 ảnh)
- ep16: food list + sau khi thêm 2-3 món (2 ảnh)
- ep17: ví 0đ → sau 2 lần nạp (2 ảnh; + 1 ảnh mở lại app còn tiền nếu tiện)
- ep18: promo loading? (khó bắt) + promo list từ API (1-2 ảnh)
Tương tác tap bằng MCP iOS Simulator control; chụp bằng `xcrun simctl io booted screenshot` hoặc MCP screenshot.

## Nội dung 6 tập (~12-13 scene, ~55-62 câu/tập; ví von chủ đạo)

- **ep13 — Expo & app đầu tiên:** RN là gì (viết JS ra app thật iOS+Android — "một công thức nấu hai bếp"), Expo = bộ đồ nghề trọn gói; create-expo-app; App.tsx là gì; View/Text ~ div/span nhưng cho mobile; StyleSheet ~ CSS-in-JS; useState như đã quen (nếu biết React); hot reload "sửa là thấy ngay". Phone scenes app chạy thật.
- **ep14 — Super app & Navigation:** super app là gì (Grab/MoMo: 1 app nhiều mini-app — "trung tâm thương mại: một tòa nhà nhiều gian hàng"); expo-router: file = route ("mỗi file trong app/ là một phòng"); Tabs = dãy nút thang máy; code 2 layout; phone scene tab bar thật.
- **ep15 — Màn Home:** FlatList (thực đơn cuộn hiệu quả — chỉ "nấu" phần nhìn thấy), numColumns lưới, Link asChild điều hướng; phone scene home thật.
- **ep16 — Mini-app Đồ ăn:** state giỏ hàng, reduce tính tổng, immutable update `[...cart, id]`; phone scenes trước/sau thêm món.
- **ep17 — Mini-app Ví:** vấn đề state mất khi tắt app ("trí nhớ ngắn hạn"), AsyncStorage = "sổ ghi chép của điện thoại" (giống localStorage web), useEffect đọc lúc mở; demo đinh: tắt app mở lại tiền còn nguyên (2 phone scenes).
- **ep18 — Nối backend NestJS:** "app đẹp mà dữ liệu cứng thì chưa sống"; dựng PromosController (ôn series 1 trong 1 scene); fetch + loading state; localhost simulator gọi thẳng máy; phone scene promo thật từ API; outro tổng kết đại hành trình 18 tập backend+mobile, vote series sau.

## Quy trình & ràng buộc

Như các phần trước: demo build + verify thật (subagent, Expo start được + API curl 3999) → tôi chụp screenshots → script (câu ≤200, code khớp byte file cuối, số liệu khớp screenshot) → validate + TTS → compositions + Thumb13–18 → render + still checks → SEO ×6 → final review fable → merge, push. Lưu ý cổng 3000 KHÔNG dùng ở series này (tránh đụng project khác); Expo/Metro dùng 8081.
