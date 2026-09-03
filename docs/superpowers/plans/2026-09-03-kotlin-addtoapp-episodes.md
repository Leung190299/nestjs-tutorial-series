# Bonus Kotlin Add-to-App — Plan sản xuất ep32–ep33

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Mỗi tập = 1 task, tuần tự, theo checklist chuẩn của plan `2026-09-03-flutter-miniapp-episodes.md` (đọc Global Constraints ở đó — vẫn hiệu lực nguyên vẹn) cộng các điều chỉnh dưới đây.

**Goal:** 2 video bonus ep32–ep33 nối vào series "Mini-App với Flutter" (playlist PLL5FgtEBrD6g), dạy bản Kotlin add-to-app từ demo `vietsuper_android` đã verified.

## Điều chỉnh so với Global Constraints cũ

- Tag byte-match: ep32→`flutter-miniapp-android-1` (MiniApp.kt 1 phần tử, launcher CHƯA có guard), ep33→`flutter-miniapp-android-2` (3 phần tử + guard double-tap + README sửa).
- Ngôn ngữ CodeBlock: Kotlin→`kotlin`; Gradle/groovy→`clike`; properties→`clike`.
- Scene `phone` dùng ảnh Android tại `video/public/screens/ep32|ep33/` (khung PhoneScene giữ nguyên — tỉ lệ khít).
- Title video/subtitle: "Bonus Android 1/2" và "Bonus Android 2/2" (KHÔNG phải Tập N/6 — series 6 tập đã khép, đây là bonus).
- Ẩn dụ: tòa nhà nay là "tòa nhà Android"; mọi ẩn dụ khác giữ nguyên. Điểm nhấn xuyên 2 tập: **module không sửa MỘT DÒNG Dart nào**.
- Thời lượng mục tiêu: ep32 380–480s; ep33 360–460s.

## Outline từng tập

### ep32 — Bonus Android 1/2: "Cùng căn hộ, tòa nhà Android — host Kotlin Compose"
Mở đầu: cảm ơn khán giả đã vote bản Kotlin ở ep31 (lời hứa outro thành sự thật); thông điệp vàng ngay 30s đầu: module `mini_flutter` giữ nguyên, chỉ xây tòa nhà mới. Concept: Compose 60 giây cho người Flutter (composable ≈ widget, cùng triết lý declarative — dễ hơn SwiftUI của tập 2 vì không phải học ngôn ngữ tư duy mới). Code (tag android-1): `settings.gradle` (include_flutter.groovy = podhelper bản Android), `gradle.properties` (GOTCHA THẬT: Java 25 của máy quá mới, Gradle chết → org.gradle.java.home trỏ JDK 21 — khán giả sẽ vấp y hệt), trích `app/build.gradle` (`implementation project(':flutter')`), `MiniApp.kt` (data class + 1 phần tử — CÙNG id/name/emoji/library với MiniApp.swift, đặt cạnh nhau 1 nhịp), `MainActivity.kt` trích HomeScreen (LazyVerticalGrid ≈ LazyVGrid), `MiniAppLauncher.kt` (DartEntrypoint với CÙNG địa chỉ package:mini_flutter/main_food.dart — "địa chỉ căn hộ không đổi, chỉ đổi tòa nhà"; channel nhắc là "lễ tân nói tiếng Kotlin", chi tiết để ep33), `MiniActivity.kt` (FlutterActivity cached engine + destroyEngineWithActivity — mini là một Activity riêng, nút Back Android tự nhiên). Terminal: `./gradlew :app:assembleDebug` + adb install/launch. Phone: 3 ảnh ep32 (lưới 1 card → mini food → giỏ 45.000đ). Outro: tập sau đủ 3 mini, mở hộp lễ tân Kotlin, và một bug thật do reviewer bắt được.

### ep33 — Bonus Android 2/2 (kết): "Lễ tân Kotlin, bug double-tap và lời chào 8 video"
Mở đầu nối outro ep32. Code (tag android-2): `attachHostChannel` trong MiniAppLauncher.kt (setMethodCallHandler switch getUserInfo/close — đối chiếu 1 nhịp với bản Swift: cùng channel, cùng dữ liệu Lee/1_250_000); thêm 2 phần tử MiniApp.kt (công thức quen: thêm mini = thêm phần tử). Phone: 3 ảnh ep33 (lưới 3 card, Ví Lee/1.250.000đ, Xem phim 90.000đ). BEAT DẠY 1 — thú nhận: chip Ví trên Android vẫn ghi "Số dư lấy từ app chủ (Swift)" vì chuỗi hard-code phía Dart → bài học thật: đừng nêu tên nền tảng/chi tiết host trong chuỗi UI của mini (mini không biết nó đang ở tòa nhà nào). BEAT DẠY 2 — bug double-tap có thật (kể như chuyện review demo): tap card 2 lần nhanh → 2 engine cùng id, engine đầu rò vĩnh viễn; bản iOS an toàn tự nhiên nhờ fullScreenCover(item:); fix 2 dòng guard `FlutterEngineCache.contains` (chiếu diff/đoạn code có guard từ tag-2). So găng cuối: bảng Swift vs Kotlin đối xứng (SwiftUI↔Compose, podhelper↔include_flutter, fullScreenCover↔Activity, cùng module cùng channel) → kết luận: viết mini MỘT lần, cắm HAI tòa nhà. Outro kết chùm 8 video: repo + đủ 2 bộ tag (tap-1..6, android-1..2), CTA vote chủ đề kế tiếp, cảm ơn.

## Checklist mỗi tập (y cũ)

Đọc outline + code từ tag (`git show flutter-miniapp-android-N:...`) + ảnh + report kỹ thuật tích lũy (ep27/ep28/ep29/ep30/ep31-report: ≤21 dòng/scene, văn xuôi dài dùng concept, title phone ≤31 ký tự, diagram flow liền kề, thumbnail tránh từ dài, narration theo số dòng snippet, script Python lắp code) → viết `tts/scripts/epXX.json` → TTS → Root.tsx (Thumb variant shot, seriesTag như Thumb28-31, badge "FLUTTER MINI-APP BONUS N/2") → render + verify frame → commit.

## Task 3 (sau 2 tập): SEO + đăng chờ lệnh

Thêm mục "Flutter Mini-App Bonus Android #1/#2" cuối `docs/seo-youtube.md` (chapters đúng timing, tag android-1/2, cross-link: Bonus 1 ⏮️ ep31 https://youtu.be/lQAknMo0CB4 + ⏭️ [LINK-EP33]; Bonus 2 ⏮️ [LINK-EP32] + ▶️ xem từ đầu series https://youtu.be/5T2J4RGOXxQ; cả 2 ghi playlist đích PLL5FgtEBrD6g), cập nhật README (2 dòng bonus + bảng tag android). Commit + merge + push. KHÔNG đăng YouTube — chờ người dùng yêu cầu.
