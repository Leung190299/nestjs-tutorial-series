import 'package:flutter/material.dart';

import 'cinema_screen.dart';
import 'food_screen.dart';
import 'wallet_screen.dart';

// Kéo các entrypoint mini (main_food/main_wallet/main_cinema) vào cùng kernel
// snapshot debug (JIT) được biên dịch từ FLUTTER_TARGET=lib/main.dart. Nếu
// không import ở đây, host app dùng FlutterEngineGroup.makeEngine(libraryURI:)
// sẽ gặp lỗi "Dart_LookupLibrary: ... not found" vì các file đó không nằm
// trong đồ thị import xuất phát từ main.dart.
// ignore: unused_import
import 'main_cinema.dart' as _mini_cinema;
// ignore: unused_import
import 'main_food.dart' as _mini_food;
// ignore: unused_import
import 'main_wallet.dart' as _mini_wallet;

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
      ('👛', 'Ví', const WalletScreen()),
      ('🎬', 'Xem phim', const CinemaScreen()),
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
