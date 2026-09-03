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
