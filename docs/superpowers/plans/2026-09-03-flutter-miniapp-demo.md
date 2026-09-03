# Demo Flutter Mini-App (Add-to-App) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây `demo-flutter-miniapp/` — app chủ SwiftUI nhúng 3 mini-app Flutter (Đồ ăn, Ví, Xem phim) qua FlutterEngineGroup + MethodChannel, chạy verified trên iOS Simulator, kèm screenshot cho 6 tập video ep26–ep31.

**Architecture:** MỘT Flutter module `mini_flutter` với nhiều entrypoint (mỗi file `main_*.dart` có `main` riêng gắn `@pragma('vm:entry-point')`); host `vietsuper_ios` là app SwiftUI sinh bằng XcodeGen, nhúng module qua CocoaPods podhelper, mở mỗi mini bằng engine từ `FlutterEngineGroup`, giao tiếp qua `MethodChannel('vietsuper/host')`.

**Tech Stack:** Flutter 3.38.10 (FVM), Xcode 26.3, CocoaPods 1.16.2, XcodeGen, SwiftUI, iOS Simulator iPhone 17 Pro.

## Global Constraints

- Flutter chạy qua FVM: mọi lệnh flutter là `fvm flutter …` (đã `fvm use 3.38.10` trong module).
- Simulator đích: UDID `B282E25D-806A-4F2D-AD25-F4411158CDF8` (iPhone 17 Pro). Không boot máy khác.
- KHÔNG sửa bất kỳ file nào trong `demo-miniapps/`, `demo-superapp/` (nguồn sự thật video đã đăng).
- Không chiếm cổng 3000; không kill process của session khác.
- Màu thương hiệu: seed `Color(0xffea2845)`; app tên "ViệtSuper".
- Channel name đúng một chuỗi: `vietsuper/host`; methods: `getUserInfo`, `close`.
- Entrypoint libraryURI dạng `package:mini_flutter/main_<id>.dart`, entrypoint luôn là `"main"`.
- Screenshot lưu `video/public/screens/epNN/…​.png`, chụp bằng `xcrun simctl io <UDID> screenshot`.
- Commit thường xuyên, message tiếng Việt kiểu `feat: …`, kết thúc bằng dòng `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Flutter module + mini Đồ ăn chạy lẻ

**Files:**
- Create: `demo-flutter-miniapp/mini_flutter/` (scaffold bằng `flutter create --template=module`)
- Create: `demo-flutter-miniapp/mini_flutter/lib/format.dart`
- Create: `demo-flutter-miniapp/mini_flutter/lib/food_screen.dart`
- Create: `demo-flutter-miniapp/mini_flutter/lib/mini_shell.dart`
- Create: `demo-flutter-miniapp/mini_flutter/lib/main_food.dart`
- Modify: `demo-flutter-miniapp/mini_flutter/lib/main.dart` (thay toàn bộ scaffold mặc định)
- Test: `demo-flutter-miniapp/mini_flutter/test/format_test.dart`, `test/food_screen_test.dart`

**Interfaces:**
- Produces: `formatVnd(int) -> String` (vd `1250000` → `'1.250.000đ'`); widget `FoodScreen()`; widget `MiniAppShell({required String title, required Widget child})`; hằng `hostChannel = MethodChannel('vietsuper/host')` (export từ `mini_shell.dart`); entrypoint chạy lẻ `fvm flutter run -t lib/main_food.dart`.

- [ ] **Step 1: Scaffold module + pin FVM**

```bash
mkdir -p /Users/lee/Project/Apps/tutorial/demo-flutter-miniapp
cd /Users/lee/Project/Apps/tutorial/demo-flutter-miniapp
fvm spawn 3.38.10 create --template=module --org com.vietsuper --project-name mini_flutter mini_flutter
cd mini_flutter && fvm use 3.38.10 --force
```
Expected: thư mục `mini_flutter/` với `lib/main.dart`, `.ios/`, `pubspec.yaml`; file `.fvmrc` ghi `3.38.10`.

- [ ] **Step 2: Viết test format tiền + test FoodScreen (fail trước)**

`test/format_test.dart`:
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/format.dart';

void main() {
  test('formatVnd chèn dấu chấm ngăn nghìn', () {
    expect(formatVnd(0), '0đ');
    expect(formatVnd(45000), '45.000đ');
    expect(formatVnd(1250000), '1.250.000đ');
  });
}
```

`test/food_screen_test.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/food_screen.dart';

void main() {
  testWidgets('thêm món cập nhật tổng tiền, nút đổi trạng thái', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: FoodScreen())));
    expect(find.text('Tổng: 0đ'), findsOneWidget);

    await tester.tap(find.text('Thêm').first); // Phở bò 45.000đ
    await tester.pump();

    expect(find.text('Tổng: 45.000đ'), findsOneWidget);
    expect(find.text('Đã thêm ✓'), findsOneWidget);
  });
}
```

- [ ] **Step 3: Chạy test, xác nhận FAIL** — `fvm flutter test` → lỗi biên dịch (chưa có `format.dart`, `food_screen.dart`).

- [ ] **Step 4: Viết implementation**

`lib/format.dart`:
```dart
String formatVnd(int amount) {
  final s = amount.toString().replaceAllMapped(
        RegExp(r'\B(?=(\d{3})+(?!\d))'),
        (_) => '.',
      );
  return '$sđ';
}
```

`lib/food_screen.dart`:
```dart
import 'package:flutter/material.dart';

import 'format.dart';

class FoodItem {
  const FoodItem({
    required this.id,
    required this.name,
    required this.emoji,
    required this.price,
  });

  final String id;
  final String name;
  final String emoji;
  final int price;
}

const foods = [
  FoodItem(id: 'pho', name: 'Phở bò', emoji: '🍜', price: 45000),
  FoodItem(id: 'banhmi', name: 'Bánh mì thịt', emoji: '🥖', price: 25000),
  FoodItem(id: 'comtam', name: 'Cơm tấm sườn', emoji: '🍛', price: 40000),
];

class FoodScreen extends StatefulWidget {
  const FoodScreen({super.key});

  @override
  State<FoodScreen> createState() => _FoodScreenState();
}

class _FoodScreenState extends State<FoodScreen> {
  final Set<String> _cart = {};

  int get _total => foods
      .where((f) => _cart.contains(f.id))
      .fold(0, (sum, f) => sum + f.price);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: foods.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final food = foods[index];
              final inCart = _cart.contains(food.id);
              return Card(
                child: ListTile(
                  leading: Text(food.emoji, style: const TextStyle(fontSize: 32)),
                  title: Text(food.name),
                  subtitle: Text(formatVnd(food.price)),
                  trailing: FilledButton(
                    style: inCart
                        ? FilledButton.styleFrom(backgroundColor: Colors.green)
                        : null,
                    onPressed: () => setState(() {
                      inCart ? _cart.remove(food.id) : _cart.add(food.id);
                    }),
                    child: Text(inCart ? 'Đã thêm ✓' : 'Thêm'),
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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Tổng: ${formatVnd(_total)}',
                    style: Theme.of(context).textTheme.titleLarge),
                FilledButton(
                  onPressed: _cart.isEmpty ? null : () {},
                  child: const Text('Đặt hàng'),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
```

`lib/mini_shell.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Kênh nói chuyện với app chủ. Chạy lẻ thì đầu dây bên kia không tồn tại.
const hostChannel = MethodChannel('vietsuper/host');

class MiniAppShell extends StatelessWidget {
  const MiniAppShell({super.key, required this.title, required this.child});

  final String title;
  final Widget child;

  Future<void> _close() async {
    try {
      await hostChannel.invokeMethod('close');
    } on MissingPluginException {
      // Chạy lẻ: không có host để đóng.
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
          leading: IconButton(icon: const Icon(Icons.close), onPressed: _close),
        ),
        body: child,
      ),
    );
  }
}
```

`lib/main_food.dart`:
```dart
import 'package:flutter/material.dart';

import 'food_screen.dart';
import 'mini_shell.dart';

@pragma('vm:entry-point')
void main() =>
    runApp(const MiniAppShell(title: 'Đồ ăn ViệtSuper', child: FoodScreen()));
```

`lib/main.dart` (thay toàn bộ — menu debug, task này chỉ có mini Đồ ăn):
```dart
import 'package:flutter/material.dart';

import 'food_screen.dart';

void main() => runApp(const DebugMenuApp());

class DebugMenuApp extends StatelessWidget {
  const DebugMenuApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: const _MenuScreen(),
    );
  }
}

class _MenuScreen extends StatelessWidget {
  const _MenuScreen();

  @override
  Widget build(BuildContext context) {
    final minis = <(String, String, Widget)>[
      ('🍜', 'Đồ ăn', const FoodScreen()),
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('mini_flutter — menu debug')),
      body: ListView(
        children: [
          for (final (emoji, name, screen) in minis)
            ListTile(
              leading: Text(emoji, style: const TextStyle(fontSize: 28)),
              title: Text(name),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => Scaffold(
                    appBar: AppBar(title: Text(name)),
                    body: screen,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
```

Xóa `test/widget_test.dart` scaffold mặc định (đã bị thay bằng 2 test trên).

- [ ] **Step 5: Test pass + analyze sạch** — `fvm flutter test` → `All tests passed!`; `fvm flutter analyze` → `No issues found!`.

- [ ] **Step 6: Chạy lẻ trên simulator + screenshot ep26**

```bash
xcrun simctl boot B282E25D-806A-4F2D-AD25-F4411158CDF8 2>/dev/null; open -a Simulator
cd /Users/lee/Project/Apps/tutorial/demo-flutter-miniapp/mini_flutter
fvm flutter run -d B282E25D-806A-4F2D-AD25-F4411158CDF8 -t lib/main_food.dart &
```
Đợi app lên, rồi:
```bash
mkdir -p /Users/lee/Project/Apps/tutorial/video/public/screens/ep26
xcrun simctl io B282E25D-806A-4F2D-AD25-F4411158CDF8 screenshot .../ep26/standalone-food.png
```
Dùng MCP iOS Simulator tap nút "Thêm" của Phở bò (tọa độ điểm = pixel ÷3), chụp `.../ep26/standalone-food-cart.png` (tổng 45.000đ, nút xanh). Chạy thêm `-t lib/main.dart`, chụp `.../ep26/debug-menu.png`. Dừng flutter run (quit process của mình, không đụng process khác).
Expected: 3 file PNG, app hiện đúng UI tiếng Việt.

- [ ] **Step 7: Commit** — `git add demo-flutter-miniapp video/public/screens/ep26 && git commit -m "feat: mini_flutter module + mini Đồ ăn chạy lẻ (Flutter add-to-app tập 1)"`.

---

### Task 2: MiniAppShell hoàn chỉnh — Ví + Xem phim + entrypoints

**Files:**
- Create: `mini_flutter/lib/wallet_screen.dart`, `lib/cinema_screen.dart`, `lib/main_wallet.dart`, `lib/main_cinema.dart`
- Modify: `mini_flutter/lib/main.dart` (menu 3 mini)
- Test: `test/wallet_screen_test.dart`, `test/cinema_screen_test.dart`

**Interfaces:**
- Consumes: `formatVnd`, `MiniAppShell`, `hostChannel` từ Task 1.
- Produces: `WalletScreen()` — gọi `hostChannel.invokeMapMethod('getUserInfo')`, fallback khi `MissingPluginException`; `CinemaScreen()`; entrypoints `lib/main_wallet.dart`, `lib/main_cinema.dart` (đều `@pragma('vm:entry-point') void main()`).

- [ ] **Step 1: Viết test fail**

`test/wallet_screen_test.dart` (trong test không ai trả lời channel → đi đường fallback):
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/wallet_screen.dart';

void main() {
  testWidgets('chạy lẻ không có host: hiện dữ liệu mẫu', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: WalletScreen())));
    await tester.pumpAndSettle();

    expect(find.text('Khách chạy lẻ'), findsOneWidget);
    expect(find.text('500.000đ'), findsOneWidget);
    expect(find.text('Dữ liệu mẫu — đang chạy lẻ'), findsOneWidget);
  });
}
```

`test/cinema_screen_test.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/cinema_screen.dart';

void main() {
  testWidgets('đặt vé rồi hủy: tổng tiền cộng trừ đúng', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: CinemaScreen())));
    expect(find.text('Tổng: 0đ'), findsOneWidget);

    await tester.tap(find.text('Đặt vé').first); // Đào, Phở và Piano 90.000đ
    await tester.pump();
    expect(find.text('Tổng: 90.000đ'), findsOneWidget);

    await tester.tap(find.text('Đã đặt ✓'));
    await tester.pump();
    expect(find.text('Tổng: 0đ'), findsOneWidget);
  });
}
```

- [ ] **Step 2: `fvm flutter test`** → FAIL (thiếu file).

- [ ] **Step 3: Implementation**

`lib/wallet_screen.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'format.dart';
import 'mini_shell.dart';

class WalletScreen extends StatefulWidget {
  const WalletScreen({super.key});

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  String _name = 'Đang tải…';
  int _balance = 0;
  bool _fromHost = false;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    try {
      final info = await hostChannel.invokeMapMethod<String, Object?>('getUserInfo');
      if (!mounted) return;
      setState(() {
        _name = info?['name'] as String? ?? 'Khách';
        _balance = (info?['balance'] as num?)?.toInt() ?? 0;
        _fromHost = true;
      });
    } on MissingPluginException {
      if (!mounted) return;
      setState(() {
        _name = 'Khách chạy lẻ';
        _balance = 500000;
        _fromHost = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            color: const Color(0xffea2845),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(_name,
                      style: const TextStyle(color: Colors.white70, fontSize: 16)),
                  const SizedBox(height: 8),
                  Text(formatVnd(_balance),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      )),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Chip(
            avatar: Text(_fromHost ? '🏢' : '🏕️'),
            label: Text(_fromHost
                ? 'Số dư lấy từ app chủ (Swift)'
                : 'Dữ liệu mẫu — đang chạy lẻ'),
          ),
        ],
      ),
    );
  }
}
```

`lib/cinema_screen.dart` (cùng 3 phim với series React Native để khán giả so sánh):
```dart
import 'package:flutter/material.dart';

import 'format.dart';

class Movie {
  const Movie({
    required this.id,
    required this.title,
    required this.emoji,
    required this.price,
  });

  final String id;
  final String title;
  final String emoji;
  final int price;
}

const movies = [
  Movie(id: 'dao-pho', title: 'Đào, Phở và Piano', emoji: '🎹', price: 90000),
  Movie(id: 'mat-biec', title: 'Mắt Biếc', emoji: '👁️', price: 85000),
  Movie(id: 'bo-gia', title: 'Bố Già', emoji: '👨', price: 95000),
];

class CinemaScreen extends StatefulWidget {
  const CinemaScreen({super.key});

  @override
  State<CinemaScreen> createState() => _CinemaScreenState();
}

class _CinemaScreenState extends State<CinemaScreen> {
  final Set<String> _selected = {};

  int get _total => movies
      .where((m) => _selected.contains(m.id))
      .fold(0, (sum, m) => sum + m.price);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: movies.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final movie = movies[index];
              final isSelected = _selected.contains(movie.id);
              return Card(
                child: ListTile(
                  leading: Text(movie.emoji, style: const TextStyle(fontSize: 32)),
                  title: Text(movie.title),
                  subtitle: Text(formatVnd(movie.price)),
                  trailing: FilledButton(
                    style: isSelected
                        ? FilledButton.styleFrom(backgroundColor: Colors.green)
                        : null,
                    onPressed: () => setState(() {
                      isSelected
                          ? _selected.remove(movie.id)
                          : _selected.add(movie.id);
                    }),
                    child: Text(isSelected ? 'Đã đặt ✓' : 'Đặt vé'),
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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Tổng: ${formatVnd(_total)}',
                    style: Theme.of(context).textTheme.titleLarge),
                FilledButton(
                  onPressed: _selected.isEmpty ? null : () {},
                  child: const Text('Thanh toán'),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
```

`lib/main_wallet.dart`:
```dart
import 'package:flutter/material.dart';

import 'mini_shell.dart';
import 'wallet_screen.dart';

@pragma('vm:entry-point')
void main() =>
    runApp(const MiniAppShell(title: 'Ví ViệtSuper', child: WalletScreen()));
```

`lib/main_cinema.dart`:
```dart
import 'package:flutter/material.dart';

import 'cinema_screen.dart';
import 'mini_shell.dart';

@pragma('vm:entry-point')
void main() =>
    runApp(const MiniAppShell(title: 'Xem phim ViệtSuper', child: CinemaScreen()));
```

`lib/main.dart` — đổi danh sách menu thành 3 dòng (thêm import `wallet_screen.dart`, `cinema_screen.dart`):
```dart
    final minis = <(String, String, Widget)>[
      ('🍜', 'Đồ ăn', const FoodScreen()),
      ('👛', 'Ví', const WalletScreen()),
      ('🎬', 'Xem phim', const CinemaScreen()),
    ];
```

- [ ] **Step 4: `fvm flutter test` → All tests passed; `fvm flutter analyze` → sạch.**

- [ ] **Step 5: Commit** — `feat: mini Ví (channel + fallback) và mini Xem phim + entrypoints`.

---

### Task 3: Host SwiftUI nhúng mini Đồ ăn

**Files:**
- Create: `demo-flutter-miniapp/vietsuper_ios/project.yml`
- Create: `vietsuper_ios/VietSuper/VietSuperApp.swift`, `VietSuper/MiniApp.swift`, `VietSuper/MiniAppLauncher.swift`, `VietSuper/MiniAppView.swift`, `VietSuper/ContentView.swift`
- Create: `vietsuper_ios/Podfile`
- Create: `vietsuper_ios/.gitignore` (Pods/, *.xcworkspace, xcuserdata/)

**Interfaces:**
- Consumes: entrypoint `package:mini_flutter/main_food.dart` (Task 1); channel `vietsuper/host` với `getUserInfo`/`close` (Task 2 fallback đã sẵn phía Dart).
- Produces: `MiniAppLauncher.shared.makeMiniViewController(library:onClose:) -> FlutterViewController`; struct `MiniApp {id, name, emoji, library}`; mảng `miniApps` (task này 1 phần tử food); build script chuẩn `xcodebuild -workspace VietSuper.xcworkspace -scheme VietSuper`.

- [ ] **Step 1: Cài XcodeGen nếu chưa có** — `which xcodegen || brew install xcodegen`.

- [ ] **Step 2: Viết project.yml + Swift**

`project.yml`:
```yaml
name: VietSuper
options:
  bundleIdPrefix: com.vietsuper
targets:
  VietSuper:
    type: application
    platform: iOS
    deploymentTarget: "16.0"
    sources: [VietSuper]
    settings:
      base:
        GENERATE_INFOPLIST_FILE: YES
        INFOPLIST_KEY_UILaunchScreen_Generation: YES
        INFOPLIST_KEY_CFBundleDisplayName: ViệtSuper
        PRODUCT_BUNDLE_IDENTIFIER: com.vietsuper.host
        SWIFT_VERSION: "5.9"
        TARGETED_DEVICE_FAMILY: "1"
```

`VietSuper/VietSuperApp.swift`:
```swift
import SwiftUI

@main
struct VietSuperApp: App {
  var body: some Scene {
    WindowGroup { ContentView() }
  }
}
```

`VietSuper/MiniApp.swift` (task này chỉ có Đồ ăn):
```swift
import Foundation

struct MiniApp: Identifiable {
  let id: String
  let name: String
  let emoji: String
  /// File Dart chứa hàm main của mini này.
  let library: String
}

let miniApps: [MiniApp] = [
  MiniApp(id: "food", name: "Đồ ăn", emoji: "🍜",
          library: "package:mini_flutter/main_food.dart"),
]
```

`VietSuper/MiniAppLauncher.swift`:
```swift
import Flutter

final class MiniAppLauncher {
  static let shared = MiniAppLauncher()

  /// Một "nhà máy engine" dùng chung: các engine sinh ra chia sẻ tài nguyên,
  /// mở mini thứ hai gần như miễn phí RAM.
  private let engines = FlutterEngineGroup(name: "vietsuper", project: nil)

  func makeMiniViewController(
    library: String,
    onClose: @escaping () -> Void
  ) -> FlutterViewController {
    let options = FlutterEngineGroupOptions()
    options.entrypoint = "main"
    options.libraryURI = library
    let engine = engines.makeEngine(with: options)

    let controller = FlutterViewController(engine: engine, nibName: nil, bundle: nil)
    let channel = FlutterMethodChannel(
      name: "vietsuper/host",
      binaryMessenger: controller.binaryMessenger
    )
    channel.setMethodCallHandler { call, result in
      switch call.method {
      case "getUserInfo":
        result(["name": "Lee", "balance": 1_250_000])
      case "close":
        onClose()
        result(nil)
      default:
        result(FlutterMethodNotImplemented)
      }
    }
    return controller
  }
}
```

`VietSuper/MiniAppView.swift`:
```swift
import Flutter
import SwiftUI

struct MiniAppView: UIViewControllerRepresentable {
  let library: String
  let onClose: () -> Void

  func makeUIViewController(context: Context) -> FlutterViewController {
    MiniAppLauncher.shared.makeMiniViewController(library: library, onClose: onClose)
  }

  func updateUIViewController(_ controller: FlutterViewController, context: Context) {}
}
```

`VietSuper/ContentView.swift`:
```swift
import SwiftUI

struct ContentView: View {
  @State private var selected: MiniApp?

  var body: some View {
    NavigationStack {
      ScrollView {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())],
                  spacing: 16) {
          ForEach(miniApps) { app in
            Button { selected = app } label: {
              VStack(spacing: 8) {
                Text(app.emoji).font(.system(size: 44))
                Text(app.name).font(.headline).foregroundStyle(.primary)
              }
              .frame(maxWidth: .infinity)
              .padding(.vertical, 24)
              .background(Color(.secondarySystemBackground))
              .clipShape(RoundedRectangle(cornerRadius: 16))
            }
          }
        }
        .padding()
      }
      .navigationTitle("ViệtSuper 🇻🇳")
    }
    .fullScreenCover(item: $selected) { app in
      MiniAppView(library: app.library) { selected = nil }
        .ignoresSafeArea()
    }
  }
}
```

`Podfile`:
```ruby
platform :ios, '16.0'

flutter_application_path = '../mini_flutter'
load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')

target 'VietSuper' do
  install_all_flutter_pods(flutter_application_path)
end

post_install do |installer|
  flutter_post_install(installer) if defined?(flutter_post_install)
end
```

- [ ] **Step 3: Generate + pod install**

```bash
cd /Users/lee/Project/Apps/tutorial/demo-flutter-miniapp/mini_flutter && fvm flutter pub get
cd ../vietsuper_ios && xcodegen generate && LANG=en_US.UTF-8 pod install
```
Expected: `VietSuper.xcodeproj`, `VietSuper.xcworkspace`, pods Flutter cài xong.

- [ ] **Step 4: Build + cài + chạy trên simulator**

```bash
xcodebuild -workspace VietSuper.xcworkspace -scheme VietSuper \
  -configuration Debug -destination 'id=B282E25D-806A-4F2D-AD25-F4411158CDF8' \
  -derivedDataPath build build
xcrun simctl install B282E25D-806A-4F2D-AD25-F4411158CDF8 \
  build/Build/Products/Debug-iphonesimulator/VietSuper.app
xcrun simctl launch B282E25D-806A-4F2D-AD25-F4411158CDF8 com.vietsuper.host
```
Expected: BUILD SUCCEEDED; app hiện lưới 1 card "🍜 Đồ ăn".

- [ ] **Step 5: Verify luồng mở/đóng bằng MCP tap + screenshot ep27**

Tap card Đồ ăn → mini Flutter mở full-screen (AppBar đỏ "Đồ ăn ViệtSuper") → tap "Thêm" một món → tap nút X → về lưới. Chụp: `ep27/host-grid-food-only.png`, `ep27/mini-food-embedded.png`, `ep27/mini-food-embedded-cart.png`.
Expected: đóng/mở mượt, không crash (kiểm tra `xcrun simctl spawn ... log` không cần nếu UI đúng).

- [ ] **Step 6: Commit** — `feat: host SwiftUI VietSuper nhúng mini Đồ ăn qua FlutterEngineGroup`.

---

### Task 4: Mini Ví lên lưới — engine group + platform channel sống thật

**Files:**
- Modify: `vietsuper_ios/VietSuper/MiniApp.swift` (thêm phần tử wallet)

**Interfaces:**
- Consumes: entrypoint `package:mini_flutter/main_wallet.dart`; handler `getUserInfo` đã có trong `MiniAppLauncher` (Task 3).

- [ ] **Step 1: Thêm card Ví**

```swift
  MiniApp(id: "wallet", name: "Ví", emoji: "👛",
          library: "package:mini_flutter/main_wallet.dart"),
```

- [ ] **Step 2: Rebuild + verify + screenshot ep28/ep29**

Build/cài/chạy như Task 3 Step 4. Verify bằng MCP tap:
1. Mở Ví: màn hình hiện **"Lee"** và **"1.250.000đ"** + chip "Số dư lấy từ app chủ (Swift)" → chụp `ep29/mini-wallet-from-host.png` (bằng chứng channel hoạt động).
2. Đóng Ví, mở Đồ ăn, đóng, mở lại Ví — hai mini thay nhau chạy không crash → chụp `ep28/host-grid-2-cards.png`, `ep28/mini-wallet-open.png`.
3. Chạy lẻ đối chứng: `fvm flutter run -t lib/main_wallet.dart` → hiện "Khách chạy lẻ / 500.000đ / Dữ liệu mẫu" → chụp `ep29/mini-wallet-standalone-fallback.png`, rồi dừng flutter run.

- [ ] **Step 3: Commit** — `feat: mini Ví lên lưới host — FlutterEngineGroup + MethodChannel getUserInfo`.

---

### Task 5: Mini Xem phim + regression toàn bộ + README + push

**Files:**
- Modify: `vietsuper_ios/VietSuper/MiniApp.swift` (thêm cinema)
- Create: `demo-flutter-miniapp/README.md`

**Interfaces:**
- Consumes: entrypoint `package:mini_flutter/main_cinema.dart`.

- [ ] **Step 1: Thêm card Xem phim**

```swift
  MiniApp(id: "cinema", name: "Xem phim", emoji: "🎬",
          library: "package:mini_flutter/main_cinema.dart"),
```

- [ ] **Step 2: Rebuild + regression cả 3 mini + screenshot ep30/ep31**

Build/cài/chạy. MCP tap lần lượt: mở Đồ ăn (thêm món) → đóng; mở Ví (thấy Lee 1.250.000đ) → đóng; mở Xem phim (đặt 1 vé, tổng 90.000đ) → đóng. Không crash, lưới giữ nguyên.
Chụp: `ep30/host-grid-3-cards.png`, `ep30/mini-cinema-embedded.png`, `ep30/mini-cinema-ticket.png`, `ep31/host-grid-final.png`. Chạy lẻ `-t lib/main_cinema.dart` → chụp `ep31/mini-cinema-standalone.png`, dừng.

- [ ] **Step 3: `fvm flutter test` + `fvm flutter analyze` lần cuối** — pass sạch.

- [ ] **Step 4: README.md**

Nội dung: sơ đồ thư mục, yêu cầu (FVM 3.38.10, Xcode 26, CocoaPods, XcodeGen), 3 lệnh chạy (pub get → xcodegen+pod install → xcodebuild), cách chạy lẻ từng mini bằng `-t`, bảng entrypoint↔card, ghi chú channel `vietsuper/host`. Nhắc: repo có series video kèm theo (link playlist thêm sau khi đăng).

- [ ] **Step 5: Commit + push** — `feat: demo-flutter-miniapp hoàn chỉnh — 3 mini add-to-app verified` rồi `git push`.

---

## Sau plan này

Giai đoạn 2 (mỗi tập: kịch bản `tts/scripts/ep26–31.json` → TTS → composition + thumbnail `shot` + SEO) lập plan riêng sau khi demo verified — đúng quy tắc "code chạy thật trước, kịch bản sau". CodeScene cần thêm language `swift` khi làm ep27.
