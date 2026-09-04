# Demo Flutter Workspace (Mini-App thuần Flutter) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây `demo-flutter-workspace/` — khu chung cư thuần Flutter: pub workspace với app chủ ViệtSuper (3 tab + lưới dịch vụ), 3 mini package (Tin tức, Nạp thẻ, Đặt xe) và 1 app vỏ chạy lẻ, verified trên iOS Simulator, kèm screenshot cho 5 tập ep34–ep38.

**Architecture:** Dart pub workspace (root `pubspec.yaml` khai `workspace:`, member khai `resolution: workspace`, dep giữa member theo TÊN không cần path). Mỗi mini = 1 package Flutter export một Screen widget; app chủ gắn tab bằng import; Đặt xe mở bằng `Navigator.push` từ lưới. Build TỪNG TRẠNG THÁI THEO TẬP, commit mỗi task = 1 trạng thái để tag.

**Tech Stack:** Flutter 3.38.10 (FVM, Dart 3.10), Material 3, iPhone 17 Pro simulator.

## Global Constraints

- Mọi lệnh flutter = `fvm flutter …`; `fvm use 3.38.10 --force` tại root demo (commit `.fvmrc`).
- Simulator UDID `B282E25D-806A-4F2D-AD25-F4411158CDF8`; screenshot `xcrun simctl io <UDID> screenshot`; tap bằng MCP `mcp__Claude_Code_iOS_Simulator__control` (điểm = pixel ÷3). KHÔNG đụng máy/process khác; lỗi SpringBoard → shutdown+boot lại đúng máy.
- App tên "ViệtSuper", seed `Color(0xffea2845)`; chuỗi tiếng Việt chuẩn chính tả.
- KHÔNG sửa demo cũ (demo-flutter-miniapp, demo-miniapps, demo-superapp…).
- `flutter create` dùng `--org com.vietsuper --platforms ios` cho apps (giữ repo gọn); packages viết pubspec TAY (5–8 dòng, đẹp cho video).
- Mỗi task kết thúc: `fvm flutter analyze` sạch (chạy ở root workspace), test pass, screenshot đúng thư mục `video/public/screens/epNN/`, commit riêng (message ghi trong task), kết thúc message bằng `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Dep giữa member dùng `mini_x: any` (tính năng workspace). Nếu Dart 3.10 không resolve theo tên → fallback `path:` và GHI RÕ vào report (thành nội dung video).

---

### Task 1: Workspace root + app chủ ViệtSuper (trạng thái ep34)

**Files:**
- Create: `demo-flutter-workspace/pubspec.yaml`, `.fvmrc` (qua fvm use), `.gitignore` (root: `.dart_tool/`, `build/`)
- Create: `apps/vietsuper/` (flutter create) rồi thay `lib/main.dart`, thêm `lib/home_shell.dart`, `lib/home_screen.dart`, `lib/under_construction.dart`
- Test: `apps/vietsuper/test/home_shell_test.dart` (thay widget_test.dart mặc định)

**Interfaces:**
- Produces: `HomeShell()` — 3 tab (Trang chủ/Tin tức/Nạp thẻ) qua `NavigationBar`; `HomeScreen({required void Function(int) onOpenTab, VoidCallback? onOpenRide})` — lưới 4 `Service`; `UnderConstruction({required String title})`; hằng `services` (Task sau bật `enabled` + thay màn tab).

- [ ] **Step 1: Scaffold**

```bash
mkdir -p /Users/lee/Project/Apps/tutorial/demo-flutter-workspace && cd $_
fvm use 3.38.10 --force
mkdir -p packages apps
fvm flutter create --org com.vietsuper --platforms ios --project-name vietsuper apps/vietsuper
```

Root `pubspec.yaml` (trái tim của series — "sổ đỏ khu chung cư"):
```yaml
name: vietsuper_workspace
publish_to: none

environment:
  sdk: ^3.10.0

workspace:
  - apps/vietsuper
```
Thêm vào CUỐI `apps/vietsuper/pubspec.yaml` dòng `resolution: workspace` (đặt ngay dưới khối `environment:`).

- [ ] **Step 2: Test fail trước**

`apps/vietsuper/test/home_shell_test.dart` (xóa widget_test.dart mặc định):
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:vietsuper/home_shell.dart';

void main() {
  testWidgets('3 tab chuyển được, tab chưa xây hiện Đang xây', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomeShell()));
    expect(find.text('ViệtSuper 🇻🇳'), findsOneWidget);
    expect(find.text('Dịch vụ'), findsOneWidget);

    await tester.tap(find.text('Tin tức').last); // nút trên NavigationBar
    await tester.pumpAndSettle();
    expect(find.text('Đang xây — quay lại tập sau nhé!'), findsOneWidget);
  });
}
```

- [ ] **Step 3: Chạy `cd apps/vietsuper && fvm flutter test`** → FAIL (chưa có home_shell.dart).

- [ ] **Step 4: Implementation**

`apps/vietsuper/lib/main.dart` (thay toàn bộ):
```dart
import 'package:flutter/material.dart';

import 'home_shell.dart';

void main() => runApp(const VietSuperApp());

class VietSuperApp extends StatelessWidget {
  const VietSuperApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ViệtSuper',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: const HomeShell(),
    );
  }
}
```

`apps/vietsuper/lib/home_shell.dart`:
```dart
import 'package:flutter/material.dart';

import 'home_screen.dart';
import 'under_construction.dart';

class HomeShell extends StatefulWidget {
  const HomeShell({super.key});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final screens = <Widget>[
      HomeScreen(onOpenTab: (i) => setState(() => _tab = i)),
      const UnderConstruction(title: 'Tin tức'),
      const UnderConstruction(title: 'Nạp thẻ'),
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('ViệtSuper 🇻🇳')),
      body: screens[_tab],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: const [
          NavigationDestination(icon: Text('🏠', style: TextStyle(fontSize: 24)), label: 'Trang chủ'),
          NavigationDestination(icon: Text('📰', style: TextStyle(fontSize: 24)), label: 'Tin tức'),
          NavigationDestination(icon: Text('📱', style: TextStyle(fontSize: 24)), label: 'Nạp thẻ'),
        ],
      ),
    );
  }
}
```

`apps/vietsuper/lib/home_screen.dart`:
```dart
import 'package:flutter/material.dart';

class Service {
  const Service({
    required this.emoji,
    required this.name,
    this.tabIndex,
    this.enabled = true,
  });

  final String emoji;
  final String name;
  /// Dịch vụ sống trên tab nào (null = mở kiểu màn riêng).
  final int? tabIndex;
  final bool enabled;
}

const services = [
  Service(emoji: '📰', name: 'Tin tức', tabIndex: 1, enabled: false),
  Service(emoji: '📱', name: 'Nạp thẻ', tabIndex: 2, enabled: false),
  Service(emoji: '🛵', name: 'Đặt xe', enabled: false),
  Service(emoji: '🎁', name: 'Sắp ra mắt', enabled: false),
];

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.onOpenTab, this.onOpenRide});

  final void Function(int tabIndex) onOpenTab;
  final VoidCallback? onOpenRide;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text('Dịch vụ', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children: [
            for (final s in services)
              Opacity(
                opacity: s.enabled ? 1 : 0.35,
                child: Card(
                  child: InkWell(
                    onTap: !s.enabled
                        ? null
                        : s.tabIndex != null
                            ? () => onOpenTab(s.tabIndex!)
                            : onOpenRide,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(s.emoji, style: const TextStyle(fontSize: 44)),
                        const SizedBox(height: 8),
                        Text(s.name, style: Theme.of(context).textTheme.titleMedium),
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }
}
```

`apps/vietsuper/lib/under_construction.dart`:
```dart
import 'package:flutter/material.dart';

class UnderConstruction extends StatelessWidget {
  const UnderConstruction({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('🏗️', style: TextStyle(fontSize: 64)),
          const SizedBox(height: 12),
          Text(title, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 8),
          const Text('Đang xây — quay lại tập sau nhé!'),
        ],
      ),
    );
  }
}
```

- [ ] **Step 5: `fvm flutter pub get` ở ROOT** (xác nhận workspace resolve — output có "Resolving dependencies" cho cả workspace) → `cd apps/vietsuper && fvm flutter test` pass, `fvm flutter analyze` sạch.

- [ ] **Step 6: Chạy simulator + screenshot ep34** — boot UDID, `cd apps/vietsuper && fvm flutter run -d <UDID>`; chụp `ep34/host-home-grid.png` (lưới 4 ô mờ), tap tab Tin tức → chụp `ep34/host-tab-under-construction.png`; dừng đúng process của mình. LƯU Ý sau flutter run: không có bước build host nào khác nên không dính bẫy FLUTTER_TARGET.

- [ ] **Step 7: Commit** — `feat: workspace root + app chủ ViệtSuper (3 tab + lưới dịch vụ) — Flutter thuần tập 1`.

---

### Task 2: mini_news + gắn tab (trạng thái ep35)

**Files:**
- Create: `packages/mini_news/pubspec.yaml`, `lib/mini_news.dart`, `lib/src/news_screen.dart`
- Modify: root `pubspec.yaml` (thêm member), `apps/vietsuper/pubspec.yaml` (dep `mini_news: any`), `apps/vietsuper/lib/home_shell.dart` (tab Tin tức → NewsScreen), `apps/vietsuper/lib/home_screen.dart` (ô Tin tức `enabled: true`)
- Test: `packages/mini_news/test/news_screen_test.dart`

**Interfaces:**
- Consumes: `HomeShell`/`services` từ Task 1.
- Produces: package `mini_news` export `NewsScreen()`; mẫu pubspec package chuẩn (Task 4/5 lặp lại y hệt, đổi tên).

- [ ] **Step 1: pubspec package (viết tay — chiếu lên video)**

`packages/mini_news/pubspec.yaml`:
```yaml
name: mini_news
publish_to: none

environment:
  sdk: ^3.10.0
resolution: workspace

dependencies:
  flutter:
    sdk: flutter
```
Root `pubspec.yaml` — thêm vào `workspace:`:
```yaml
  - packages/mini_news
```

- [ ] **Step 2: Test fail**

`packages/mini_news/test/news_screen_test.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_news/mini_news.dart';

void main() {
  testWidgets('đọc bài: mở sheet chi tiết rồi đánh dấu đã đọc', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: NewsScreen())));
    expect(find.text('Flutter có pub workspace chính chủ'), findsOneWidget);
    expect(find.text('Đã đọc ✓'), findsNothing);

    await tester.tap(find.text('Flutter có pub workspace chính chủ'));
    await tester.pumpAndSettle();
    expect(find.textContaining('một lần pub get'), findsOneWidget); // nội dung sheet

    await tester.tapAt(const Offset(10, 10)); // đóng sheet
    await tester.pumpAndSettle();
    expect(find.text('Đã đọc ✓'), findsOneWidget);
  });
}
```

- [ ] **Step 3: `cd packages/mini_news && fvm flutter test`** → FAIL.

- [ ] **Step 4: Implementation**

`packages/mini_news/lib/mini_news.dart`:
```dart
export 'src/news_screen.dart';
```

`packages/mini_news/lib/src/news_screen.dart`:
```dart
import 'package:flutter/material.dart';

class Article {
  const Article({
    required this.id,
    required this.title,
    required this.emoji,
    required this.summary,
  });

  final String id;
  final String title;
  final String emoji;
  final String summary;
}

const articles = [
  Article(
    id: 'workspace',
    title: 'Flutter có pub workspace chính chủ',
    emoji: '🧱',
    summary:
        'Từ Dart 3.5, cả khu chung cư dùng chung một lần pub get — hết cảnh mỗi package một kiểu version.',
  ),
  Article(
    id: 'mini-app',
    title: 'Mini-app: mỗi tính năng một căn hộ',
    emoji: '🚪',
    summary:
        'Các super-app lớn tách tính năng thành module riêng để hàng chục team làm việc không giẫm chân nhau.',
  ),
  Article(
    id: 'dat-xe',
    title: 'ViệtSuper sắp mở dịch vụ Đặt xe',
    emoji: '🛵',
    summary:
        'Sau Tin tức và Nạp thẻ, ViệtSuper sẽ trình làng dịch vụ thứ ba — vẫn hoàn toàn bằng Flutter.',
  ),
];

class NewsScreen extends StatefulWidget {
  const NewsScreen({super.key});

  @override
  State<NewsScreen> createState() => _NewsScreenState();
}

class _NewsScreenState extends State<NewsScreen> {
  final Set<String> _read = {};

  Future<void> _open(Article article) async {
    await showModalBottomSheet<void>(
      context: context,
      builder: (_) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${article.emoji}  ${article.title}',
                style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 12),
            Text(article.summary, style: Theme.of(context).textTheme.bodyLarge),
          ],
        ),
      ),
    );
    setState(() => _read.add(article.id));
  }

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: articles.length,
      separatorBuilder: (_, _) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final article = articles[index];
        final read = _read.contains(article.id);
        return Card(
          child: ListTile(
            leading: Text(article.emoji, style: const TextStyle(fontSize: 32)),
            title: Text(article.title),
            subtitle: read ? const Text('Đã đọc ✓') : null,
            onTap: () => _open(article),
          ),
        );
      },
    );
  }
}
```

Gắn vào app chủ — `apps/vietsuper/pubspec.yaml` thêm dưới `dependencies:`:
```yaml
  mini_news: any
```
`home_shell.dart`: thêm `import 'package:mini_news/mini_news.dart';`, thay phần tử tab 1 thành `const NewsScreen(),` (xóa dòng UnderConstruction Tin tức). `home_screen.dart`: ô Tin tức đổi `enabled: false` → `enabled: true`.

- [ ] **Step 5: Root `fvm flutter pub get`** (dep theo TÊN resolve qua workspace — nếu fail, fallback `path: ../../packages/mini_news` + ghi report) → test cả 2 nơi pass + analyze sạch.

- [ ] **Step 6: Simulator + screenshot ep35** — run app chủ: tab Tin tức hiện 3 bài → chụp `ep35/host-tab-news.png`; tap 1 bài (sheet mở) → `ep35/mini-news-sheet.png`; đóng sheet ('Đã đọc ✓') → `ep35/mini-news-read.png`; lưới ô Tin tức đã sáng → `ep35/host-grid-news-on.png`.

- [ ] **Step 7: Commit** — `feat: mini_news — căn hộ đầu tiên của khu chung cư thuần Flutter`.

---

### Task 3: news_standalone (trạng thái ep36)

**Files:**
- Create: `apps/news_standalone/` (flutter create như Task 1) rồi thay `lib/main.dart`; thêm `resolution: workspace` + dep `mini_news: any` vào pubspec
- Modify: root `pubspec.yaml` (thêm member `apps/news_standalone`)

**Interfaces:**
- Consumes: `NewsScreen` từ mini_news.

- [ ] **Step 1: Scaffold + pubspec** — `fvm flutter create --org com.vietsuper --platforms ios --project-name news_standalone apps/news_standalone`; sửa pubspec như trên; root thêm member.

- [ ] **Step 2: `lib/main.dart`** (thay toàn bộ — TOÀN BỘ app vỏ chỉ chừng này):
```dart
import 'package:flutter/material.dart';
import 'package:mini_news/mini_news.dart';

void main() => runApp(const NewsStandaloneApp());

class NewsStandaloneApp extends StatelessWidget {
  const NewsStandaloneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tin tức',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(title: const Text('Tin tức ViệtSuper')),
        body: const NewsScreen(),
      ),
    );
  }
}
```
Xóa `test/widget_test.dart` mặc định (app vỏ không logic riêng — mini đã có test ở package).

- [ ] **Step 3: Root pub get → analyze sạch → chạy lẻ trên simulator** (`cd apps/news_standalone && fvm flutter run -d <UDID>`) → chụp `ep36/standalone-news.png`, đọc 1 bài → `ep36/standalone-news-read.png`. Dừng process của mình.

- [ ] **Step 4: Commit** — `feat: news_standalone — mini Tin tức ra ở riêng`.

---

### Task 4: mini_topup + gắn tab (trạng thái ep37)

**Files:**
- Create: `packages/mini_topup/pubspec.yaml` (y mẫu Task 2, name `mini_topup`), `lib/mini_topup.dart` (`export 'src/topup_screen.dart';`), `lib/src/topup_screen.dart`
- Modify: root pubspec (member), vietsuper pubspec (`mini_topup: any`), home_shell (tab 2 → TopupScreen), home_screen (ô Nạp thẻ enabled: true)
- Test: `packages/mini_topup/test/topup_screen_test.dart`

**Interfaces:**
- Produces: `TopupScreen()` — form chọn nhà mạng + mệnh giá → success 2 trạng thái.

- [ ] **Step 1: Test fail**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_topup/mini_topup.dart';

void main() {
  testWidgets('nạp thẻ: chọn đủ mới bấm được, success rồi reset', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: TopupScreen())));

    final button = find.widgetWithText(FilledButton, 'Nạp thẻ');
    expect(tester.widget<FilledButton>(button).onPressed, isNull); // chưa chọn gì

    await tester.tap(find.text('Viettel'));
    await tester.tap(find.text('100.000đ'));
    await tester.pump();
    expect(tester.widget<FilledButton>(button).onPressed, isNotNull);

    await tester.tap(button);
    await tester.pump();
    expect(find.text('Nạp thành công!'), findsOneWidget);
    expect(find.text('Viettel — 100.000đ'), findsOneWidget);

    await tester.tap(find.text('Nạp thêm'));
    await tester.pump();
    expect(find.text('Nạp thành công!'), findsNothing);
    expect(tester.widget<FilledButton>(find.widgetWithText(FilledButton, 'Nạp thẻ')).onPressed, isNull);
  });
}
```

- [ ] **Step 2: FAIL → Implementation**

`packages/mini_topup/lib/src/topup_screen.dart`:
```dart
import 'package:flutter/material.dart';

const carriers = ['Viettel', 'Mobifone', 'Vinaphone'];
const amounts = [50000, 100000, 200000];

String _formatVnd(int amount) {
  final s = amount.toString().replaceAllMapped(
        RegExp(r'\B(?=(\d{3})+(?!\d))'),
        (_) => '.',
      );
  return '$sđ';
}

class TopupScreen extends StatefulWidget {
  const TopupScreen({super.key});

  @override
  State<TopupScreen> createState() => _TopupScreenState();
}

class _TopupScreenState extends State<TopupScreen> {
  String? _carrier;
  int? _amount;
  bool _done = false;

  bool get _canPay => _carrier != null && _amount != null;

  @override
  Widget build(BuildContext context) {
    if (_done) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('✅', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 12),
            Text('Nạp thành công!', style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 8),
            Text('$_carrier — ${_formatVnd(_amount!)}'),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: () => setState(() {
                _carrier = null;
                _amount = null;
                _done = false;
              }),
              child: const Text('Nạp thêm'),
            ),
          ],
        ),
      );
    }
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text('Nhà mạng', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: [
            for (final c in carriers)
              ChoiceChip(
                label: Text(c),
                selected: _carrier == c,
                onSelected: (_) => setState(() => _carrier = c),
              ),
          ],
        ),
        const SizedBox(height: 20),
        Text('Mệnh giá', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: [
            for (final a in amounts)
              ChoiceChip(
                label: Text(_formatVnd(a)),
                selected: _amount == a,
                onSelected: (_) => setState(() => _amount = a),
              ),
          ],
        ),
        const SizedBox(height: 28),
        FilledButton(
          onPressed: _canPay ? () => setState(() => _done = true) : null,
          child: const Text('Nạp thẻ'),
        ),
      ],
    );
  }
}
```

Gắn app chủ như Task 2 (dep `mini_topup: any`, tab 2 → `const TopupScreen(),`, ô Nạp thẻ enabled).

- [ ] **Step 3: Root pub get → test + analyze sạch → simulator + screenshot ep37**: `ep37/host-tab-topup-form.png` (đã chọn Viettel + 100.000đ, nút sáng), `ep37/host-tab-topup-success.png`, `ep37/host-grid-2-on.png`.

- [ ] **Step 4: Commit** — `feat: mini_topup — công thức căn hộ lặp lại lần hai`.

---

### Task 5: mini_ride màn NGOÀI tab + README + regression (trạng thái ep38)

**Files:**
- Create: `packages/mini_ride/pubspec.yaml` (mẫu Task 2, name `mini_ride`), `lib/mini_ride.dart` (`export 'src/ride_screen.dart';`), `lib/src/ride_screen.dart`
- Modify: root pubspec (member), vietsuper pubspec (`mini_ride: any`), `home_shell.dart` (truyền `onOpenRide` push màn Đặt xe), `home_screen.dart` (ô Đặt xe enabled: true)
- Create: `demo-flutter-workspace/README.md`
- Test: `packages/mini_ride/test/ride_screen_test.dart`

**Interfaces:**
- Produces: `RideScreen()` — chọn-MỘT loại xe (`String?`), stepper km clamp 1..50, tổng = giá/km × km.

- [ ] **Step 1: Test fail**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_ride/mini_ride.dart';

void main() {
  testWidgets('chọn một xe, chỉnh km, tổng tiền nhân đúng', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: RideScreen())));
    expect(find.text('Tổng: 0đ'), findsOneWidget);

    await tester.tap(find.text('Chọn').first); // Xe máy 15.000đ/km, km khởi đầu 5
    await tester.pump();
    expect(find.text('Tổng: 75.000đ'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();
    expect(find.text('Tổng: 90.000đ'), findsOneWidget);

    await tester.tap(find.text('Chọn').first); // đổi sang Ô tô 4 chỗ 25.000đ/km — THAY THẾ
    await tester.pump();
    expect(find.text('Tổng: 150.000đ'), findsOneWidget);
  });
}
```

- [ ] **Step 2: FAIL → Implementation**

`packages/mini_ride/lib/src/ride_screen.dart`:
```dart
import 'package:flutter/material.dart';

class Ride {
  const Ride({
    required this.id,
    required this.name,
    required this.emoji,
    required this.pricePerKm,
  });

  final String id;
  final String name;
  final String emoji;
  final int pricePerKm;
}

const rides = [
  Ride(id: 'bike', name: 'Xe máy', emoji: '🛵', pricePerKm: 15000),
  Ride(id: 'car4', name: 'Ô tô 4 chỗ', emoji: '🚗', pricePerKm: 25000),
  Ride(id: 'car7', name: 'Ô tô 7 chỗ', emoji: '🚐', pricePerKm: 32000),
];

String _formatVnd(int amount) {
  final s = amount.toString().replaceAllMapped(
        RegExp(r'\B(?=(\d{3})+(?!\d))'),
        (_) => '.',
      );
  return '$sđ';
}

class RideScreen extends StatefulWidget {
  const RideScreen({super.key});

  @override
  State<RideScreen> createState() => _RideScreenState();
}

class _RideScreenState extends State<RideScreen> {
  String? _ride;
  int _km = 5;

  Ride? get _selected => _ride == null ? null : rides.firstWhere((r) => r.id == _ride);

  int get _total => (_selected?.pricePerKm ?? 0) * _km;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: rides.length,
            separatorBuilder: (_, _) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final ride = rides[index];
              final isSelected = _ride == ride.id;
              return Card(
                child: ListTile(
                  leading: Text(ride.emoji, style: const TextStyle(fontSize: 32)),
                  title: Text(ride.name),
                  subtitle: Text('${_formatVnd(ride.pricePerKm)}/km'),
                  trailing: FilledButton(
                    style: isSelected
                        ? FilledButton.styleFrom(backgroundColor: Colors.green)
                        : null,
                    onPressed: () => setState(() => _ride = ride.id),
                    child: Text(isSelected ? 'Đang chọn ✓' : 'Chọn'),
                  ),
                ),
              );
            },
          ),
        ),
        SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                IconButton(
                  onPressed: () => setState(() => _km = (_km - 1).clamp(1, 50)),
                  icon: const Icon(Icons.remove),
                ),
                Text('$_km km', style: Theme.of(context).textTheme.titleMedium),
                IconButton(
                  onPressed: () => setState(() => _km = (_km + 1).clamp(1, 50)),
                  icon: const Icon(Icons.add),
                ),
                const Spacer(),
                Text('Tổng: ${_formatVnd(_total)}',
                    style: Theme.of(context).textTheme.titleLarge),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
```

Gắn app chủ — `home_shell.dart`: import mini_ride, truyền vào HomeScreen:
```dart
      HomeScreen(
        onOpenTab: (i) => setState(() => _tab = i),
        onOpenRide: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => Scaffold(
              appBar: AppBar(title: const Text('Đặt xe ViệtSuper')),
              body: const RideScreen(),
            ),
          ),
        ),
      ),
```
`home_screen.dart`: ô Đặt xe `enabled: true`.

- [ ] **Step 3: Root pub get → test 3 package + app pass, analyze sạch (root).**

- [ ] **Step 4: Regression simulator + screenshot ep38**: từ lưới tap Đặt xe → màn push có nút back → chọn Xe máy, tăng km (Tổng đổi) → back về lưới nguyên trạng; đảo qua 2 tab mini kia còn sống. Chụp `ep38/host-grid-3-on.png`, `ep38/ride-pushed.png`, `ep38/ride-selected-total.png`.

- [ ] **Step 5: README.md** — sơ đồ thư mục, yêu cầu FVM 3.38.10 (Dart 3.10 cho pub workspace), 2 lệnh (root `fvm flutter pub get`; chạy từng app bằng `fvm flutter run` trong apps/…), bảng mini↔vị trí (tab/push/standalone), giải thích `workspace:`/`resolution: workspace`/dep theo tên, dòng "Series video kèm theo: playlist cập nhật sau khi đăng".

- [ ] **Step 6: Commit** — `feat: mini_ride màn ngoài tab + README — khu chung cư thuần Flutter hoàn chỉnh`.

---

## Sau plan này

Controller merge + tag `flutter-workspace-tap-1..5` (mỗi tag = commit của task tương ứng) + push. Giai đoạn 2 (kịch bản ep34–ep38 + TTS + render + thumbnail + SEO + playlist mới "Mini-App Flutter thuần 🇻🇳") lập plan riêng sau khi demo verified — tập cuối so BỘ BA công thức và link chéo 2 playlist cũ.
