# Lô 2 Phỏng vấn — Giai đoạn 1: fact sheet + demo-perf-interview + screenshots + tag

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Task 0 (research) và Task 1–2 (scaffold) TRƯỚC, rồi mỗi câu = 1 task tuần tự, cuối cùng Task 15 tag + smoke render. Mọi implementer TỰ LÀM foreground, KHÔNG spawn agent con/background (bài học phantom agent lô 1).

**Goal:** Fact sheet hiệu năng có nguồn + 2 app demo (`rn-perf` Expo, `flutter_perf` FVM) với 12 trang ví dụ verified trên iOS Simulator, screenshots bằng chứng trong `video/public/screens/perfqa/`, đóng băng tag `perf-qa-batch-2`.

**Architecture:** Mỗi câu 1 trang độc lập điều hướng từ Home; mỗi trang TỰ MANG bằng chứng on-screen (bộ đếm build/render, timer đo đơ, chế độ "chậm/nhanh" toggle hoặc 2 nút) để ảnh chụp tĩnh kể được câu chuyện hiệu năng.

**Tech Stack:** Expo (Expo Go, expo-router, expo-image, TS) · Flutter qua FVM 3.38.10 (cached_network_image) · simctl + MCP simulator tap (hệ số ≈ px/2.18, UDID B282E25D-806A-4F2D-AD25-F4411158CDF8).

## Global Constraints

- Câu hỏi/ep mapping và chuẩn bằng chứng: theo spec `docs/superpowers/specs/2026-09-08-perf-interview-batch2-design.md` (bảng 12 câu N1–N6/F1–F6 = ep57–ep68).
- Data lớn sinh cục bộ bằng generator, KHÔNG gọi mạng ngoài; ảnh demo N5/F5 từ nguồn cục bộ/localhost.
- Số liệu trong report phải ĐO THẬT trên simulator; claim kỹ thuật phải khớp fact sheet có nguồn chính chủ.
- Chụp màn: cold-launch (terminate app trước khi launch lại) tránh "◀ App"; ảnh lưu `video/public/screens/perfqa/{n1..n6,f1..f6}-*.png`; ảnh simulator dọc dùng chung cho PhoneScene ngang và VShotScene Shorts.
- RN chạy bằng Expo Go trên simulator (`npx expo start`, metro 8081 — cấm cổng 3000); mọi dependency phải Expo-Go-compatible (expo-image OK). Flutter: `fvm flutter build ios --simulator` + `xcrun simctl install/launch` — KHÔNG `flutter run` nền.
- Commit từng task; KHÔNG commit `.superpowers/` (gitignored) và `config-youtube/`.
- Verify UI = tap thật + screenshot đọc lại bằng mắt (Read ảnh), không tin log suông.

---

### Task 0: Fact sheet hiệu năng `.superpowers/sdd/perf-interview-research.md`

**Files:** Create `.superpowers/sdd/perf-interview-research.md` (gitignored — KHÔNG commit; chỉ cập nhật `.superpowers/sdd/progress.md`).

- [ ] **Step 1:** Với TỪNG câu N1–N6/F1–F6 trong spec, viết mục gồm: câu hỏi; câu trả lời chuẩn 3 câu; bẫy/misconception; cơ chế kỹ thuật (đúng thuật ngữ docs); link nguồn chính chủ. Nguồn bắt buộc tra: reactnative.dev (`virtualizedlist`, `optimizing-flatlist-configuration`, `flatlist`, `interactionmanager`), docs.expo.dev (`expo-image` caching/recyclingKey), docs.flutter.dev (`perf/best-practices`, `cookbook/lists/long-lists`, isolates/`compute`), api.flutter.dev (`ListView.itemExtent`, `prototypeItem`, `Image.cacheWidth`), pub.dev (`cached_network_image`). Ghi version thực tế: Expo SDK + RN version template hiện tại, Flutter FVM version, expo-image / cached_network_image version.
- [ ] **Step 2:** Mục "Cặp chéo" N1↔F1, N5↔F5, N6↔F6: 1 đoạn/cặp nói điểm GIỐNG cơ chế và khác thuật ngữ.
- [ ] **Step 3:** Kiểm tra chéo: không claim nào thiếu nguồn; đánh dấu ❓ nếu docs không xác nhận để implementer đo thực nghiệm thay vì khẳng định.
- [ ] **Step 4:** Append `.superpowers/sdd/progress.md`: "Task 0 lô 2 DONE — fact sheet perf 12 câu".

### Task 1: Scaffold `demo-perf-interview/rn-perf` (Expo + TS)

**Files:** Create `demo-perf-interview/rn-perf/` (create-expo-app), `lib/data.ts`, `app/index.tsx` (Home), xoá màn template thừa.

**Interfaces — Produces:** `makeItems(n: number): Item[]` với `type Item = {id: string; title: string; subtitle: string; color: string}` (id = String(i), title "Bản ghi #i", subtitle cố định theo i, color từ bảng 8 màu HSL). Các task N* import từ `@/lib/data`.

- [ ] **Step 1:** `cd demo-perf-interview && npx create-expo-app@latest rn-perf --template default` (pin version SDK vào report). Xoá tab template, để `app/index.tsx` + `app/_layout.tsx` Stack đơn giản.
- [ ] **Step 2:** Viết `lib/data.ts`:

```ts
export type Item = { id: string; title: string; subtitle: string; color: string };
const COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899'];
export function makeItems(n: number): Item[] {
  return Array.from({ length: n }, (_, i) => ({
    id: String(i),
    title: `Bản ghi #${i}`,
    subtitle: `Khách hàng ${i % 100} · đơn ${1000 + i}`,
    color: COLORS[i % COLORS.length],
  }));
}
```

- [ ] **Step 3:** Home `app/index.tsx`: tiêu đề "RN Perf QA", 6 nút Link tới `/n1`.. `/n6` (route chưa tồn tại vẫn khai nút, tạo route stub rỗng mỗi câu `<Text>Chưa làm</Text>` để app chạy).
- [ ] **Step 4:** `npx expo start` foreground tạm, mở trên simulator (Expo Go), `xcrun simctl io booted screenshot` xem Home hiện 6 nút. Dừng metro sau khi verify.
- [ ] **Step 5:** Commit `feat: scaffold rn-perf (Expo) — Home + data generator + 6 route stub`.

### Task 2: Scaffold `demo-perf-interview/flutter_perf` (FVM)

**Files:** Create `demo-perf-interview/flutter_perf/` (`fvm flutter create`), `lib/data.dart`, `lib/main.dart` Home.

**Interfaces — Produces:** `List<Record> makeItems(int n)` — `class Record { final String id, title, subtitle; final Color color; }` cùng quy tắc sinh như rn-perf; Home có `ListTile` push tới 6 trang `F1Page()..F6Page()` (stub `Scaffold` rỗng ban đầu, mỗi trang file riêng `lib/pages/f1_lazy_list.dart`...).

- [ ] **Step 1:** `fvm flutter create flutter_perf --empty --platforms ios` trong `demo-perf-interview/`; `lib/data.dart` generator như Interfaces.
- [ ] **Step 2:** `lib/main.dart`: MaterialApp title "Flutter Perf QA", Home ListView 6 ListTile Navigator.push tới stub pages.
- [ ] **Step 3:** `fvm flutter build ios --simulator && xcrun simctl install B282E25D-806A-4F2D-AD25-F4411158CDF8 <path .app> && xcrun simctl launch ...` — screenshot Home verify 6 dòng.
- [ ] **Step 4:** Commit `feat: scaffold flutter_perf — Home + data generator + 6 page stub`.

### Task 3 (N1/ep57): ScrollView+map vs FlatList 5.000 item

**Files:** Create `demo-perf-interview/rn-perf/app/n1.tsx`. Screenshots: `perfqa/n1-scrollview.png` (chế độ chậm, header đếm 5000), `perfqa/n1-flatlist.png` (chế độ nhanh, header đếm ~10–20).

Trang có 2 nút chọn chế độ; module-level `let renderCount` reset khi đổi chế độ; mỗi `Row` component tăng đếm trong render và header hiện "Đã render {renderCount}/5000 item · dựng mất {mountMs}ms" (đo `performance.now()` trước setMode → sau InteractionManager.runAfterInteractions). Khung code:

```tsx
function Row({ item }: { item: Item }) {
  renderCount++;
  return (
    <View style={[styles.row, { borderLeftColor: item.color }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>{item.subtitle}</Text>
    </View>
  );
}
// mode 'scroll': <ScrollView>{items.map(it => <Row key={it.id} item={it} />)}</ScrollView>
// mode 'flat':   <FlatList data={items} renderItem={({item}) => <Row item={item} />} keyExtractor={it => it.id} />
```

- [ ] Implement + chạy Expo Go, tap 2 chế độ, ĐỌC số trên header (ghi report: renderCount và mountMs thật của từng chế độ), chụp 2 ảnh cold-state mỗi chế độ, Read ảnh xác nhận số hiển thị rõ. Commit `feat: câu N1 — ScrollView vs FlatList 5000 item`.

### Task 4 (N2/ep58): Tối ưu FlatList — getItemLayout & scrollToIndex

**Files:** Create `app/n2.tsx`. Screenshots: `n2-fail.png` (nhảy tới #4999 KHÔNG getItemLayout → onScrollToIndexFailed, banner đỏ "scrollToIndex FAIL — thiếu getItemLayout"), `n2-ok.png` (bật getItemLayout → đang đứng ở Bản ghi #4999, banner xanh "nhảy tức thì {ms}ms").

Toggle "getItemLayout: OFF/ON" + nút "Nhảy tới item #4999". ROW_H = 64 cố định; ON truyền `getItemLayout={(_, i) => ({length: ROW_H, offset: ROW_H * i, index: i})}` cùng `windowSize={5}` `initialNumToRender={12}`; OFF bắt `onScrollToIndexFailed` set banner lỗi. Banner hiện kết quả + ms đo được.

- [ ] Implement, verify cả 2 nhánh trên simulator (tap thật), report ms thật, 2 ảnh, commit `feat: câu N2 — getItemLayout + scrollToIndex`.

### Task 5 (N3/ep59): React.memo cho renderItem

**Files:** Create `app/n3.tsx`. Screenshots: `n3-nomemo.png` (sau 3 lần bấm: MỌI item hiện "render 4×"), `n3-memo.png` (chỉ item #0 "render 4×", còn lại "render 1×").

List 30 item, mỗi Row hiện số lần render của CHÍNH NÓ (`useRef` count trong Row, hiển thị ngay trên hàng); nút "Đổi item #0" cập nhật title item 0 (immutable update); toggle "React.memo: OFF/ON" chọn `Row` thường vs `memo(Row)` (so sánh mặc định — item object mới chỉ ở index 0). LƯU Ý kỹ thuật: giữ `renderItem`/`data` bằng `useCallback`/state để không phá memo.

- [ ] Implement, tap 3 lần mỗi chế độ, đọc số render trên ảnh, 2 ảnh, report, commit `feat: câu N3 — memo renderItem`.

### Task 6 (N4/ep60): onEndReached pagination + guard

**Files:** Create `app/n4.tsx`. Screenshots: `n4-bug.png` (guard OFF: header "gọi loadMore: ≥6 lần · trang 2"), `n4-ok.png` (guard ON: "gọi loadMore: 1 lần · trang 2", footer spinner).

Nguồn dữ liệu giả lập `fetchPage(p)` trả 25 item sau 800ms. Header: "Trang {page} · {items.length} item · gọi loadMore: {calls} lần". Guard ON: `if (loadingRef.current) return;` + `onEndReachedThreshold={0.3}`; OFF: gọi thẳng — kéo đáy 1 lần thấy calls tăng nhiều lần.

- [ ] Implement, verify 2 chế độ bằng kéo thật tới đáy, 2 ảnh, report số calls thật, commit `feat: câu N4 — onEndReached guard`.

### Task 7 (N5/ep61): Ảnh trong list — expo-image đúng kích thước + cache

**Files:** Create `app/n5.tsx`; ảnh nguồn: sinh 12 file PNG lớn cục bộ (script PIL 2000×2000, mỗi file 1 màu + chữ số to, đặt `rn-perf/assets/big/big0..11.png`) dùng lại theo modulo cho 120 hàng. Screenshots: `n5-plain.png` (RN `Image` full-size: hàng trắng chưa decode khi vừa cuộn nhanh + header "decode ảnh gốc 2000px"), `n5-expo.png` (expo-image `recyclingKey` + `cachePolicy="memory-disk"` + style 64×64: thumbnail hiện đủ + header "expo-image 64px + cache").

`npx expo install expo-image`. Hai chế độ toggle; header ghi rõ chế độ; đo và report thời gian từ mount tới `onLoadEnd` ảnh cuối màn hình đầu (cộng dồn qua handler, hiện "màn đầu đủ ảnh sau {ms}ms").

- [ ] Implement, verify 2 chế độ (cuộn nhanh giữa chừng để bắt khoảng trắng ở chế độ plain — chụp đúng khoảnh khắc bằng screenshot khi đang cuộn), 2 ảnh, report ms, commit `feat: câu N5 — expo-image cache + resize`.

### Task 8 (N6/ep62): Parse data lớn chặn JS thread

**Files:** Create `app/n6.tsx`. Screenshots: `n6-blocked.png` (sau khi bấm "Parse 300k (một cục)": dòng "⏱ tick bị hụt: {gapMs}ms" đỏ, gapMs cỡ nghìn), `n6-chunked.png` (bấm "Parse 300k (chia lô 5k + setTimeout)": gap tối đa vài chục ms, xanh).

Timer `setInterval` 100ms cập nhật đồng hồ đang chạy + đo gap thực tế giữa 2 tick (`Date.now()` chênh >150ms thì ghi nhận maxGap). Nút 1: `JSON.parse(JSON.stringify(makeItems(300000)))` một cục trên JS thread. Nút 2: xử lý cùng khối lượng nhưng chia lô 5.000 phần tử/`setTimeout(0)`. Hiện maxGap của lần chạy gần nhất + tổng thời gian xử lý.

- [ ] Implement, đo cả 2 nút, report gapMs thật, 2 ảnh, commit `feat: câu N6 — JS thread blocking vs chia lô`.

### Task 9 (F1/ep63): Column vs ListView.builder 5.000 item

**Files:** Create `flutter_perf/lib/pages/f1_lazy_list.dart` (+nối Home). Screenshots: `f1-column.png` (AppBar "đã build 5000/5000 · first frame {ms}ms"), `f1-builder.png` (AppBar "đã build ~{n}/5000" với n ≤ 30).

`class BuildCounter { static int count = 0; }`; item widget tăng `count` trong `build`, AppBar hiện qua `setState` hậu frame (`WidgetsBinding.instance.addPostFrameCallback`). 2 nút chọn chế độ: `SingleChildScrollView(child: Column(children: [...5000 RowTile]))` vs `ListView.builder(itemCount: 5000, itemBuilder: ...)`. Đo first frame bằng `Stopwatch` từ lúc bấm nút tới postFrameCallback.

- [ ] Implement + build/install/launch cold, tap từng chế độ, đọc số trên AppBar, 2 ảnh, report, commit `feat: câu F1 — Column vs ListView.builder`.

### Task 10 (F2/ep64): itemExtent + const item

**Files:** Create `lib/pages/f2_item_extent.dart`. Screenshots: `f2-off.png` (không itemExtent: nút "Nhảy cuối" dùng `jumpTo(maxScrollExtent)` xong AppBar "ước lượng — build thêm {n} item dọc đường"), `f2-on.png` (itemExtent 64 + `const RowTileConst`: "nhảy tức thì · build {n} item").

ListView.builder 5000 item, toggle "itemExtent+const: OFF/ON"; đếm build như F1; OFF item không const và không itemExtent, ON `itemExtent: 64` + item widget `const` (title lấy qua `ValueKey`? — KHÔNG: const cần dữ liệu tĩnh, nên item ON dùng `RepaintBoundary` + widget con const phần khung, phần text vẫn dynamic; ghi trung thực trong report phần nào const được).

- [ ] Implement, verify 2 chế độ + đo build count sau jumpTo, 2 ảnh, report, commit `feat: câu F2 — itemExtent + const`.

### Task 11 (F3/ep65): setState cả trang vs tách widget

**Files:** Create `lib/pages/f3_rebuild_scope.dart`. Screenshots: `f3-page.png` (counter=3, MỌI item "build 4×"), `f3-scoped.png` (counter=3, item "build 1×").

Trang: nút "+1" ở đầu + list 40 item hiện build-count của chính nó (đếm per-item bằng `Map<int,int>` static). Chế độ "setState cả trang": counter là state của page. Chế độ "tách widget": counter nằm trong `_CounterBox` StatefulWidget riêng — bấm +1 chỉ rebuild box.

- [ ] Implement, tap +1 ×3 mỗi chế độ, 2 ảnh, report, commit `feat: câu F3 — rebuild scope`.

### Task 12 (F4/ep66): Infinite scroll ScrollController + guard

**Files:** Create `lib/pages/f4_infinite_scroll.dart`. Screenshots: `f4-bug.png` ("gọi loadMore: ≥5 lần · trang 2"), `f4-ok.png` ("gọi loadMore: 1 lần · trang 2" + footer CircularProgressIndicator).

`fetchPage(p)` async 800ms trả 25 item; `ScrollController` listener `position.pixels > maxScrollExtent - 200`; guard `if (_loading) return;` toggle OFF/ON; AppBar hiện "Trang · item · calls" như N4 (đối xứng RN↔Flutter).

- [ ] Implement, verify kéo thật 2 chế độ, 2 ảnh, report calls, commit `feat: câu F4 — infinite scroll guard`.

### Task 13 (F5/ep67): Ảnh — cacheWidth + cached_network_image

**Files:** Create `lib/pages/f5_images.dart`; dùng lại 12 PNG lớn của Task 7 (copy vào `flutter_perf/assets/big/`, khai pubspec). Screenshots: `f5-plain.png` (Image.asset gốc 2000px: header "decode full-size", cuộn thấy khựng/trắng), `f5-cache.png` (Image.asset `cacheWidth: 128`: header "cacheWidth 128 — decode nhỏ", mượt; note miệng cached_network_image cho ảnh mạng trong kịch bản, demo offline dùng cacheWidth).

Grid 120 ô 2 cột; toggle 2 chế độ; đo bằng `Stopwatch` tới khi `precacheImage` xong màn đầu, hiện ms.

- [ ] Implement, verify + đo, 2 ảnh, report ms & giải thích trung thực (asset local nên khác biệt nằm ở decode size — số RAM đo qua Xcode/DevTools ghi report nếu lấy được, không claim trên video nếu không đo), commit `feat: câu F5 — cacheWidth decode nhỏ`.

### Task 14 (F6/ep68): jsonDecode chặn UI vs Isolate.run

**Files:** Create `lib/pages/f6_isolate.dart`. Screenshots: `f6-blocked.png` (spinner đứng hình + "⏱ frame gap: {ms}ms" đỏ), `f6-isolate.png` (spinner quay + gap vài chục ms xanh).

CircularProgressIndicator luôn quay + đo frame-gap bằng `Ticker`/`addPostFrameCallback` chênh lệch >100ms → maxGap. Nút 1: `jsonDecode(bigJsonString)` (sinh chuỗi JSON 200k bản ghi trước, đo phần decode) trên main isolate. Nút 2: `await Isolate.run(() => jsonDecode(s))`. Hiện maxGap + tổng ms mỗi lần chạy.

- [ ] Implement, đo cả 2 nút, 2 ảnh, report gap thật, commit `feat: câu F6 — Isolate.run vs main isolate`.

### Task 15: Tag + smoke render + sổ sách

- [ ] **Step 1:** Soát 24 ảnh `video/public/screens/perfqa/` đủ + đúng tên; Read từng ảnh xác nhận chữ bằng chứng đọc được.
- [ ] **Step 2:** `git tag perf-qa-batch-2` tại commit cuối demo.
- [ ] **Step 3:** Smoke render: thêm composition TẠM `PerfSmoke` vào Root.tsx dùng PhoneScene với `n1-flatlist.png` và 1 VShotScene với `f6-blocked.png`, `npx remotion still` 2 frame, Read xác nhận ảnh simulator hiển thị đẹp trong khung (PhoneScene title ≤31 ký tự), rồi XOÁ composition tạm.
- [ ] **Step 4:** README demo-perf-interview (bảng 12 câu ↔ trang ↔ ảnh); append progress ledger; commit `docs: README demo-perf-interview + hoàn tất giai đoạn demo lô 2`.

## Self-review

- Spec coverage: 12 câu = Task 3–14 ✓; fact sheet Task 0 ✓; scaffold ✓; tag+smoke Task 15 ✓; chuẩn bằng chứng từng câu ghi ngay trong task ✓.
- Placeholder: không còn TBD; F2 phần const đã ghi rõ giới hạn trung thực.
- Consistency: makeItems/Item dùng thống nhất N*; BuildCounter/Map đếm dùng thống nhất F*; tên ảnh perfqa/{id}-{state}.png thống nhất.
