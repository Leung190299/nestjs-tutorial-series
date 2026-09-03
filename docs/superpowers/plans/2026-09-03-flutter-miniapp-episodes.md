# Series "Mini-App với Flutter" — Plan sản xuất 6 tập (ep26–ep31)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Mỗi tập = 1 task, thực hiện TUẦN TỰ theo checklist chuẩn bên dưới.

**Goal:** Sản xuất 6 video ep26–ep31 cho series "Mini-App với Flutter — Add-to-App" theo spec 2026-09-03, dùng pipeline sẵn có (VieNeu-TTS + Remotion), demo đã verified tại `demo-flutter-miniapp/`.

**Architecture:** Kịch bản JSON → TTS (giọng Adam) → timing.json → Composition Remotion (data-driven trong `video/src/Root.tsx`) → render MP4 1080p30 → thumbnail variant `shot` → SEO.

## Global Constraints

- Câu narration ≤200 ký tự; validator trong `tts/generate.py` phải pass.
- Code trên video PHẢI khớp byte (hoặc là substring liên tục) với code tại **git tag của tập đó**: ep26→`flutter-miniapp-tap-1`, ep27→`tap-2`, ep28→`tap-3`, ep29→`tap-4`, ep30→`tap-5`, ep31→`tap-6`. Lấy code bằng `git show flutter-miniapp-tap-N:<path>`.
- Ngôn ngữ CodeBlock: Dart→`dart`? KHÔNG — prism không có dart trong bundle, dùng `swift` cho Swift, `yaml` cho project.yml, `clike` cho Podfile và Dart (kiểm tra thực tế khi làm ep26: nếu `dart` không render thì fallback `clike`; ghi nhận lựa chọn vào report để các tập sau dùng thống nhất).
- Scene types sẵn có: title, concept, diagram, code, terminal, outro, phone. Scene `phone` dùng screenshot THẬT tại `video/public/screens/epNN/` (đã chụp ở phase demo).
- Phong cách theo luật đã đúc kết: KHÔNG chung chung — mọi dòng code chiếu lên đều được narration giải thích; ẩn dụ xuyên suốt: app native = tòa nhà bê tông, module Flutter = căn hộ lắp ghép, engine = đồng hồ điện nước riêng; nhắc lại công thức qua các tập. Mỗi tập ~6–9 phút (≥55 câu hoặc đủ scene tương đương các tập 20–25).
- Khán giả: biết Flutter cơ bản, KHÔNG biết Swift — mỗi dòng Swift giải thích từ đầu.
- ep28 KHÔNG được claim "2 engine sống song song" — chỉ nói hai mini thay nhau chạy, engine tạo từ group gần như miễn phí.
- Tên series trong title/subtitle scene: "Mini-App với Flutter", đánh số "Tập N/6".
- Pipeline lệnh: `cd tts && .venv/bin/python generate.py epXX` → sinh `video/src/data/epXX.timing.json`; composition thêm vào `video/src/Root.tsx` theo pattern data-driven sẵn có (xem các entry ep20–ep25); render `cd video && npx remotion render EpisodeXX out/epXX.mp4`; thumbnail `npx remotion render ThumbXX out/thumbs/epXX-thumb.png` (theo pattern Thumb hiện có, variant `shot` với image từ screens của tập + badgeEmoji + seriesTag "Flutter Mini-App").
- Verify render: dùng ffmpeg extract 4–6 frame rải đều (đầu/giữa/cuối + mỗi scene code chính) xem bằng mắt: không tràn khung, tiếng khớp cảnh (kiểm timing.json tổng thời lượng hợp lý 360–540s).
- SEO: sau khi cả 6 tập render xong, thêm mục cho từng tập vào `docs/seo-youtube.md` đúng format các tập trước (title ≤100 ký tự, description có chapters khớp frame timing thật, tags, gợi ý comment ghim; link source trỏ `demo-flutter-miniapp/` + tag của tập).
- Commit sau mỗi tập; wav/mp4/thumb PNG output gitignored, timing.json + script JSON committed.
- KHÔNG sửa demo-flutter-miniapp (đã đóng băng bằng tag), KHÔNG sửa demo cũ.

## Checklist chuẩn mỗi tập (Task N = tập epXX)

1. Đọc outline tập dưới đây + đọc code thật từ tag (`git show flutter-miniapp-tap-N:...`) + xem screenshot của tập trong `video/public/screens/epNN/`.
2. Viết `tts/scripts/epXX.json` (tham khảo giọng văn/cấu trúc `tts/scripts/ep24.json`, `ep25.json`).
3. Chạy TTS → timing.json (validator pass).
4. Thêm Episode + Thumb composition vào `video/src/Root.tsx` (nếu data-driven thì thêm entry data).
5. Render MP4 + thumbnail; verify frames bằng ffmpeg + mắt.
6. Commit.

## Outline từng tập (sự kiện/file/screenshot phải dùng)

### ep26 — Tập 1/6: "Add-to-app: nhúng Flutter vào app native — mini-app đúng nghĩa đen"
30 giây đầu bán series: các super-app thật (kiểu Grab/Shopee) nhúng tính năng như app riêng vào app native có sẵn; series RN trước gộp bằng workspace — lần này cấp độ thật hơn: app chủ viết native, mini viết Flutter, mỗi mini chạy trong ENGINE riêng. Concept: module ≠ app (`flutter create --template=module`), engine = đồng hồ điện nước. Terminal: lệnh create module. Code (tag-1): `lib/main_food.dart` (giải thích `@pragma('vm:entry-point')` — biển "cửa vào hợp lệ" cho AOT), trích `lib/food_screen.dart` (data 3 món + Set giỏ hàng + fold tổng — người biết Flutter đọc nhanh), `lib/mini_shell.dart` (MethodChannel 'vietsuper/host' + \_close nuốt MissingPluginException khi chạy lẻ — cài cắm cho tập 4). Terminal: `fvm flutter run -t lib/main_food.dart`. Phone: `ep26/standalone-food.png`, `standalone-food-cart.png`, `debug-menu.png`. Outro: tập sau xây tòa nhà bê tông SwiftUI và cắm căn hộ đầu tiên.

### ep27 — Tập 2/6: "Host SwiftUI từ số 0 — cắm căn hộ Flutter đầu tiên"
SwiftUI cho người Flutter trong 60 giây (View ≈ Widget, body ≈ build, @State ≈ setState). Code (tag-2): `vietsuper_ios/project.yml` (yaml — XcodeGen thay cho GUI, người xem có thể dùng Xcode File→New), `VietSuper/VietSuperApp.swift`, `VietSuper/ContentView.swift` (LazyVGrid + fullScreenCover — giải thích từng dòng), `VietSuper/MiniApp.swift` (tag-2: mảng 1 phần tử food; library = địa chỉ căn hộ), `Podfile` (clike — podhelper là "hợp đồng lắp ghép"), `VietSuper/MiniAppLauncher.swift` (FlutterEngineGroup + makeEngine + FlutterViewController + channel handler — giải thích từng dòng), `MiniAppView.swift` (UIViewControllerRepresentable = ổ cắm SwiftUI↔UIKit). ĐINH của tập — gotcha thật: lần build đầu mini trắng trơn, log `Dart_LookupLibrary ... not found` → giải thích debug kernel chỉ gói code reachable từ `lib/main.dart` → fix: khối import + `// ignore_for_file: unused_import` trong `mini_flutter/lib/main.dart` (tag-2). Terminal: pod install + xcodebuild. Phone: `ep27/host-grid-food-only.png`, `mini-food-embedded.png`, `mini-food-embedded-cart.png`. Outro: một căn hộ đã vào tòa nhà — tập sau cắm căn thứ hai chỉ bằng vài dòng.

### ep28 — Tập 3/6: "FlutterEngineGroup — thêm mini thứ hai gần như miễn phí"
Concept: mỗi engine một đồng hồ điện nước — nhưng FlutterEngineGroup cho các engine dùng chung "trạm biến áp" (tài nguyên nền), tạo engine thứ hai gần như miễn phí RAM. Code (tag-3): `lib/main_wallet.dart` (entrypoint thứ hai — công thức lặp), diff `MiniApp.swift` (THÊM ĐÚNG 1 PHẦN TỬ — đây là điểm wow: thêm mini mới = 1 dòng Swift), nhắc lại làm sao host biết địa chỉ (libraryURI). Hai mini thay nhau chạy mượt (không claim song song). Phone: `ep28/host-grid-2-cards.png`, `mini-wallet-open.png`. Lưu ý: màn Ví hiện "Lee / 1.250.000đ" — narration đặt câu hỏi "dữ liệu này từ đâu ra? Flutter không hề có user nào tên Lee" → treo cliffhanger sang tập 4. Outro: tập sau mở hộp đen MethodChannel.

### ep29 — Tập 4/6: "MethodChannel — mini hỏi, app chủ trả lời"
Concept: căn hộ muốn biết tên chủ nhà phải gọi xuống lễ tân — MethodChannel là đường ống 2 chiều Swift↔Dart. Code (tag-4): phía Dart `lib/wallet_screen.dart` `_loadUser()` (invokeMapMethod 'getUserInfo', ép kiểu an toàn, guard mounted, fallback MissingPluginException → 'Khách chạy lẻ' 500.000đ — MỘT màn hình hai bối cảnh); phía Swift `MiniAppLauncher.swift` phần `setMethodCallHandler` (switch getUserInfo/close — giải thích result() là "gửi thư trả lời"); `mini_shell.dart` \_close (nút X gọi 'close', host đóng fullScreenCover qua onClose). Phone: `ep29/mini-wallet-from-host.png` (Lee/1.250.000đ + chip "Số dư lấy từ app chủ (Swift)") ĐỐI CHỨNG `ep29/mini-wallet-standalone-fallback.png` (Khách chạy lẻ + chip "Dữ liệu mẫu") — cùng một code, hai nguồn dữ liệu. Outro: đã đủ đồ nghề — tập sau xây nguyên mini mới từ A đến Z.

### ep30 — Tập 5/6: "Công thức 4 bước bản Flutter — xây mini Xem phim từ A đến Z"
Công thức 4 bước phiên bản add-to-app: (1) viết căn phòng `lib/cinema_screen.dart` (3 phim Việt — CÙNG dữ liệu với series RN, khán giả cũ nhận ra ngay; pattern y hệt FoodScreen: Set + fold + nút biến hình), (2) mở cửa vào: `lib/main_cinema.dart` + thêm import vào `lib/main.dart`, (3) báo lễ tân: thêm 1 phần tử vào `MiniApp.swift` (tag-5: mảng 3 phần tử), (4) rebuild. Nhấn mạnh: KHÔNG sửa MiniAppLauncher, KHÔNG sửa ContentView — kiến trúc tốt là thêm tính năng không đụng lõi. Phone: `ep30/host-grid-3-cards.png`, `mini-cinema-embedded.png`, `mini-cinema-ticket.png`. Outro: tập cuối — chạy lẻ, bẫy thực chiến và so găng với React Native.

### ep31 — Tập 6/6: "Chạy lẻ, bẫy FLUTTER_TARGET và so găng với bản React Native"
Terminal: chạy lẻ từng mini bằng `-t`. Bẫy thực chiến (chuyện thật khi làm demo): sau `flutter run -t lib/main_wallet.dart`, build host bị màn trắng — vì `Generated.xcconfig` bị ghim `FLUTTER_TARGET=lib/main_wallet.dart`, kernel chỉ gói 1 entrypoint; fix: chạy lại app từ `lib/main.dart` hoặc `fvm flutter pub get`. Diagram: tổng kiến trúc (host SwiftUI → EngineGroup → 3 engine → 3 mini → channel về host). So sánh 2 series: bảng RN workspace (1 app, package = màn hình, gộp lúc build) vs Flutter add-to-app (app chủ native, mini = entrypoint chạy engine riêng, gộp lúc runtime) — khi nào chọn gì (team có app native sẵn → add-to-app; xây mới từ đầu → workspace đơn giản hơn). Phone: `ep31/host-grid-final.png`, `mini-cinema-standalone.png` (NẾU chụp lại được ảnh sạch không có "◀ ViệtSuper" thì tốt — thử `xcrun simctl launch` mini standalone trực tiếp; không thì dùng ảnh hiện có, không sao). Outro series: repo + tag từng tập, hứa bản Kotlin/Android nếu nhiều comment, CTA vote series tiếp theo.

## Sau khi đủ 6 tập

- Task 7: SEO cả 6 tập vào `docs/seo-youtube.md` (chapters khớp timing thật từng tập, cross-link placeholder giữa các tập, link repo + tag), cập nhật README gốc repo (mục series mới), commit + merge + push. KHÔNG đăng YouTube — chỉ đăng khi người dùng yêu cầu.
