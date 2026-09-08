# demo-perf-interview — Lô 2 Phỏng vấn Frontend: hiệu năng load nhiều dữ liệu

Hai app demo cho 12 câu hỏi phỏng vấn hiệu năng mobile (ep57–ep68, series "Phỏng vấn Frontend 🇻🇳" — Phỏng vấn FE #13–#24). Mỗi câu = 1 trang độc lập, tự mang bằng chứng on-screen (bộ đếm build/render, timer đo đơ, 2 chế độ chậm/nhanh) để ảnh chụp tĩnh kể được câu chuyện hiệu năng.

- **`rn-perf/`** — Expo SDK ~57 (React Native 0.86.3, expo-router, TypeScript, expo-image). 6 câu N1–N6, mỗi câu 1 route `src/app/n*.tsx`.
- **`flutter_perf/`** — Flutter FVM 3.38.10 (Dart ^3.10.9). 6 câu F1–F6, mỗi câu 1 trang `lib/pages/f*_*.dart`, điều hướng từ Home.

Mọi số đo là số ĐO THẬT trên iOS Simulator (iPhone 17, debug build) — chi tiết cách đo và variance trong `.superpowers/sdd/n*-report.md` / `f*-report.md` (gitignored). Ảnh bằng chứng: `video/public/screens/perfqa/`.

## Bảng 12 câu

| id | ep | Câu hỏi | Trang | Ảnh (perfqa/) | Số đo chốt |
|---|---|---|---|---|---|
| N1 | ep57 | Render 5.000 item: vì sao ScrollView+map đơ? → FlatList virtualization | `rn-perf/src/app/n1.tsx` | `n1-scrollview.png` · `n1-flatlist.png` | ScrollView render **5000/5000 · 1381ms** vs FlatList **10/5000 · 198ms** |
| N2 | ep58 | Tối ưu FlatList: getItemLayout + scrollToIndex | `rn-perf/src/app/n2.tsx` | `n2-fail.png` · `n2-ok.png` | OFF: scrollToIndex FAIL (mới đo tới #118, list đứng yên) vs ON: nhảy tới #4999 **tức thì 49ms** |
| N3 | ep59 | 1 item đổi mà cả list re-render — React.memo cho renderItem | `rn-perf/src/app/n3.tsx` | `n3-nomemo.png` · `n3-memo.png` | Sau 3 lần đổi item #0 — OFF: MỌI item **render 4×** vs ON: chỉ #0 4×, còn lại **1×** |
| N4 | ep60 | Infinite scroll với onEndReached đúng cách (guard) | `rn-perf/src/app/n4.tsx` | `n4-bug.png` · `n4-ok.png` | OFF: **6 calls** cho 3 trang (2 calls trùng/cửa sổ 800ms) vs ON: **1 call**/trang |
| N5 | ep61 | Ảnh trong list dài: resize + cache (expo-image) | `rn-perf/src/app/n5.tsx` | `n5-plain.png` · `n5-expo.png` | expo-image cache: cold **1360ms** → warm **153ms** (~8×) → disk sau kill app **368ms**; RN Image mọi lần cold ~215–297ms (không cache) |
| N6 | ep62 | Parse data lớn chặn JS thread — đo và tránh | `rn-perf/src/app/n6.tsx` | `n6-blocked.png` · `n6-chunked.png` | Một cục: tick hụt **564ms** (tổng 513ms) vs chia lô 5k+setTimeout: gap **127ms** (tổng 985ms — chậm hơn nhưng UI sống) |
| F1 | ep63 | Column trong SingleChildScrollView vs ListView.builder | `flutter_perf/lib/pages/f1_lazy_list.dart` | `f1-column.png` · `f1-builder.png` | Column build **5000/5000 · 7895ms** vs builder **17/5000 · 199ms** (build count bất biến, ms là debug build) |
| F2 | ep64 | itemExtent + const widget trong item | `flutter_perf/lib/pages/f2_item_extent.dart` | `f2-off.png` · `f2-on.png` | Nhảy cuối — OFF: build thêm **4987 item · 1622ms** vs ON (itemExtent 64): **12 item · 34ms** |
| F3 | ep65 | setState cả trang vs tách widget (thu hẹp rebuild) | `flutter_perf/lib/pages/f3_rebuild_scope.dart` | `f3-page.png` · `f3-scoped.png` | Sau 3 lần +1 — cả trang: MỌI item **build 4×** vs tách `_CounterBox`: mọi item **build 1×** |
| F4 | ep66 | Infinite scroll với ScrollController + guard | `flutter_perf/lib/pages/f4_infinite_scroll.dart` | `f4-bug.png` · `f4-ok.png` | OFF: **45 calls** cho 2 trang mới (listener theo pixel) vs ON: **1 call**/trang |
| F5 | ep67 | Ảnh trong list: cacheWidth + cached_network_image | `flutter_perf/lib/pages/f5_images.dart` | `f5-plain.png` · `f5-cache.png` | imageCache màn đầu: gốc 2000px **152.6MB** vs cacheWidth 380 **5.5MB** (giảm ~27.7× = (2000/380)²) |
| F6 | ep68 | jsonDecode data lớn chặn UI → Isolate.run | `flutter_perf/lib/pages/f6_isolate.dart` | `f6-blocked.png` · `f6-isolate.png` | JSON 18.9MB/200k bản ghi — main isolate: frame gap **235ms** vs Isolate.run: **16ms** (tổng chỉ chậm ~1,4×) |

Cặp chéo RN↔Flutter: N1↔F1 (virtualization/lazy build), N5↔F5 (decode đúng cỡ + cache), N6↔F6 (đừng chặn thread UI).

## Cách chạy

### rn-perf (Expo Go trên iOS Simulator)

```bash
cd demo-perf-interview/rn-perf
npm install
npx expo start          # metro 8081, KHÔNG dùng cổng 3000
# mở trên simulator: nhấn i, hoặc deep link exp://127.0.0.1:8081/--/n1
```

Home "RN Perf QA" có 6 nút N1–N6. Lưu ý: tắt "Tools button" trong dev menu Expo Go nếu cần ảnh chụp sạch; React Compiler đã tắt trong `app.json` để bộ đếm render trung thực.

### flutter_perf (build simulator + simctl, không `flutter run` nền)

```bash
cd demo-perf-interview/flutter_perf
fvm flutter build ios --simulator
xcrun simctl install booted build/ios/iphonesimulator/Runner.app
xcrun simctl launch booted com.example.flutterPerf
```

Home "Flutter Perf QA" có 6 dòng F1–F6. Số ms là debug build (JIT) nên variance cao — build count/RAM là bằng chứng bất biến.

## Tag

Trạng thái demo 12 câu hoàn chỉnh được đóng băng tại tag **`perf-qa-batch-2`** (code 2 app + 24 ảnh bằng chứng khớp byte với screenshot dùng trong video).
