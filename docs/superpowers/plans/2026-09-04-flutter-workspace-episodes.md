# Series "Mini-App Flutter thuần" — Plan sản xuất 5 tập (ep34–ep38)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Mỗi tập = 1 task, tuần tự, theo checklist chuẩn + Global Constraints của plan `2026-09-03-flutter-miniapp-episodes.md` (hiệu lực nguyên vẹn) cộng điều chỉnh dưới đây.

**Goal:** 5 video ep34–ep38 series MỚI "Mini-App Flutter thuần — Pub Workspace", playlist mới (đăng khi có lệnh), từ demo `demo-flutter-workspace/` đã verified.

## Điều chỉnh so với Global Constraints cũ

- Tag byte-match: ep34→`flutter-workspace-tap-1` … ep38→`flutter-workspace-tap-5`. Lấy code bằng `git show flutter-workspace-tap-N:demo-flutter-workspace/<path>`.
- Ngôn ngữ CodeBlock: Dart→như các tập ep26+ đã dùng (xem script cũ), pubspec/yaml→`yaml`.
- Series MỚI đánh số riêng: title/subtitle "Tập N/5", tên series "Mini-App Flutter thuần".
- Ẩn dụ: KHU CHUNG CƯ THUẦN FLUTTER — tòa nhà và căn hộ CÙNG MỘT CHẤT LIỆU, cả khu MỘT đồng hồ tổng (1 engine — đối lập có chủ đích với add-to-app); giữ căn hộ/sổ đỏ/cửa chính/tấm biển từ series RN.
- Thời lượng mục tiêu: 360–480s/tập (tập cuối cho phép tới 540s vì có tổng kết bộ ba).
- Scene phone dùng ảnh tại video/public/screens/ep34..ep38 (đã chụp phase demo).
- RÀNG BUỘC NỘI DUNG từ final review demo: (a) ep35/ep37 KHÔNG mô tả/quay cảnh chuyển-tab-rồi-quay-lại (state tab bị mất — hành vi thật chưa dạy); 30 giây cuối ep37 biến nó thành beat dạy: "chuyển tab là mất form — một dòng IndexedStack giữ cả 3 tab sống, bài tập cho bạn"; (b) ep35 PHẢI có câu giải thích package con không khai flutter_test riêng (workspace chung lockfile; tách ra ngoài phải tự khai); (c) pub workspace có từ Dart 3.5 (KHÔNG nói 3.10 là bản đầu tiên).

## Outline từng tập

### ep34 — Tập 1/5: "Pub workspace — sổ đỏ chung cho cả khu chung cư Flutter"
Mở đầu bán series 30s: đã có bộ đôi RN workspace + Flutter add-to-app trên kênh — mảnh cuối: mini-app THUẦN Flutter, không một dòng native, mọi thứ một ngôn ngữ; ai xem series RN sẽ thấy công thức quen mà chất liệu mới. Concept: pub workspace là gì (có từ Dart 3.5; "npm workspaces bản Dart"; một pubspec.lock cho cả khu). Code (tag-1): root `pubspec.yaml` (workspace: — chiếu TOÀN BỘ, ngắn và đẹp), `resolution: workspace` trong apps/vietsuper/pubspec.yaml. Terminal: `fvm flutter create --org com.vietsuper --platforms ios --project-name vietsuper apps/vietsuper` + root `fvm flutter pub get` (output "Resolving dependencies in demo-flutter-workspace" — bằng chứng resolve cả khu). Code: home_shell.dart (NavigationBar 3 tab + screens list — giải thích từng phần), home_screen.dart (class Service + services 4 ô enabled: false + Opacity 0.35 — "biển hiệu chờ khai trương"), under_construction.dart. Phone: ep34/host-home-grid.png (4 ô mờ), host-tab-under-construction.png. Outro: tập sau xây căn hộ đầu tiên.

### ep35 — Tập 2/5: "Căn hộ đầu tiên — mini_news và cú pháp 3 dòng gắn tab"
Code (tag-2): packages/mini_news/pubspec.yaml (CHIẾU TOÀN BỘ 10 dòng — nhấn `resolution: workspace`; BEAT BẮT BUỘC: không khai flutter_test mà test vẫn chạy nhờ workspace chung lockfile — tách package ra ngoài thì tự khai); lib/mini_news.dart (cửa chính 1 dòng export); trích news_screen.dart (Article + articles 3 bài — nội dung bài tự giới thiệu series, khán giả tinh ý sẽ cười; _read Set + showModalBottomSheet + đánh dấu Đã đọc). ĐINH: gắn vào app chủ = dep `mini_news: any` (THEO TÊN — không cần path, workspace tự tìm; so 1 nhịp với RN cần "main" trỏ file) + import + thay 1 phần tử tab. Phone: 4 ảnh ep35. KHÔNG nhắc chuyện quay lại tab. Outro: căn hộ đã có người ở — tập sau cho nó ra ở riêng.

### ep36 — Tập 3/5: "Cùng căn hộ, hai cửa — news_standalone ra ở riêng"
Concept: mini chạy lẻ = quyền lợi kiến trúc (đội Tin tức dev không cần cả ViệtSuper). Code (tag-3): apps/news_standalone/lib/main.dart TOÀN BỘ (~25 dòng — cả một app vỏ chỉ chừng này); pubspec vỏ (resolution + mini_news: any); root pubspec thêm member. Terminal: fvm flutter run trong apps/news_standalone (khán giả dùng run bình thường). Phone: ep36/standalone-news.png + standalone-news-read.png. So 1 nhịp: giống hệt triết lý food-standalone của RN (ep22) — công thức xuyên chất liệu. Outro: tập sau lặp công thức xây mini thứ hai từ A-Z.

### ep37 — Tập 4/5: "Công thức lặp lại — mini_topup từ A đến Z"
Công thức 4 bước bản workspace: (1) căn hộ packages/mini_topup (pubspec y mẫu đổi tên), (2) căn phòng topup_screen.dart (trích 2 đoạn: state 3 biến + _canPay derived; khối success early-return + reset 3 state — nhắc lại pattern ep25 RN cho khán giả cũ), (3) tấm biển: dep + tab (vài dòng), (4) root pub get + chạy. Nhấn: KHÔNG sửa mini_news, KHÔNG sửa HomeShell ngoài 1 phần tử — thêm căn hộ không đụng căn khác. Carriers 'Viettel'/'MobiFone'/'VinaPhone' (đúng chính tả thương hiệu — code tag-4 đã chuẩn). Phone: 3 ảnh ep37. 30 GIÂY CUỐI — beat IndexedStack: thú thật demo hiện chuyển tab là form mất trắng (giải thích 1 câu vì sao: body đổi widget, state đi theo), một dòng `IndexedStack(index: _tab, children: screens)` giữ cả 3 tab sống — để làm bài tập, KHÔNG sửa trong demo. Outro: tập cuối — căn hộ mở bằng cửa đẩy + tổng kết bộ ba.

### ep38 — Tập 5/5: "mini_ride màn ngoài tab + tổng kết BỘ BA cách làm mini-app"
Code (tag-5): mini_ride trích (rides CÙNG dữ liệu series RN — 15.000/25.000/32.000 mỗi km, khán giả cũ nhận ra; chọn-MỘT String? + stepper clamp 1..50 + _total); wiring onOpenRide trong home_shell (Navigator.push MaterialPageRoute — cửa ĐẨY, không phải tab; back tự nhiên). Phone: 3 ảnh ep38. TỔNG KẾT BỘ BA (2-3 concept scene đối xứng): RN workspace (JS, gộp lúc build, npm) / Flutter thuần workspace (Dart, gộp lúc build, pub — tập này) / Flutter add-to-app (native host + engine riêng, gộp lúc runtime) — chọn theo hoàn cảnh: xây mới thuần Flutter → workspace này (đơn giản nhất); đã có app native → add-to-app; team JS → RN. Diagram tổng khu chung cư (root → 3 package → 2 app; flow liền kề ≤5 box). Outro series: repo + tag flutter-workspace-tap-1..5, link 2 playlist cũ, CTA vote series tiếp theo, cảm ơn.

## Checklist mỗi tập (y cũ)

Đọc outline + code từ tag + ảnh + ghi chú kỹ thuật tích lũy (ep27/28/29/31/32-report + ledger: ≤21 dòng/scene, văn xuôi dài dùng concept, title phone ≤31 ký tự, diagram flow liền kề, thumbnail tránh từ dài, narration theo số dòng snippet, không ký hiệu ≈, step cuối chạm dòng cuối, script Python lắp code) → viết tts/scripts/epXX.json → TTS validator → Root.tsx (Thumb 'shot', seriesTag MỚI "Mini-App Flutter thuần 🇻🇳", badge "FLUTTER THUẦN N/5") → render + verify frame → commit.

## Task 6 (sau 5 tập): SEO + chờ lệnh đăng

Mục "Flutter Thuần #1..#5" cuối docs/seo-youtube.md (chapters đúng timing, tag flutter-workspace-tap-N, cross-link nội bộ [LINK-EPXX], link 2 playlist cũ ở tập 1 + tập cuối, playlist đích mới "Mini-App Flutter thuần 🇻🇳" tạo khi đăng), README gốc thêm mục series. Commit + merge + push. KHÔNG đăng YouTube — chờ người dùng yêu cầu.
