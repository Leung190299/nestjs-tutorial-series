import 'package:flutter/material.dart';

import 'pages/f1_lazy_list.dart';
import 'pages/f2_item_extent.dart';
import 'pages/f3_rebuild_scope.dart';
import 'pages/f4_infinite_scroll.dart';
import 'pages/f5_images.dart';
import 'pages/f6_isolate.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Perf QA',
      theme: ThemeData(colorSchemeSeed: Colors.blue, useMaterial3: true),
      home: const HomePage(),
    );
  }
}

class _Question {
  final String code;
  final String label;
  final Widget Function() builder;

  const _Question(this.code, this.label, this.builder);
}

final List<_Question> _questions = [
  _Question('F1', 'Column vs ListView.builder 5.000 item', () => const F1Page()),
  _Question('F2', 'itemExtent + const item', () => const F2Page()),
  _Question('F3', 'setState cả trang vs tách widget', () => const F3Page()),
  _Question('F4', 'Infinite scroll ScrollController + guard', () => const F4Page()),
  _Question('F5', 'Ảnh — cacheWidth + cached_network_image', () => const F5Page()),
  _Question('F6', 'jsonDecode chặn UI vs Isolate.run', () => const F6Page()),
];

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Flutter Perf QA')),
      body: ListView(
        children: [
          for (final q in _questions)
            ListTile(
              leading: CircleAvatar(child: Text(q.code)),
              title: Text(q.label),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => q.builder()),
                );
              },
            ),
        ],
      ),
    );
  }
}
