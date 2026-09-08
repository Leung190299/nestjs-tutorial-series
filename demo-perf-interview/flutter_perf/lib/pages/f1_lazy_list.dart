import 'package:flutter/material.dart';

import '../data.dart';

/// Bộ đếm build toàn cục cho RowTile — reset khi đổi chế độ.
class BuildCounter {
  static int count = 0;
}

/// Một hàng trong danh sách — tăng BuildCounter.count MỖI lần build().
class RowTile extends StatelessWidget {
  final Record item;

  const RowTile({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    BuildCounter.count++;
    return Container(
      height: 56,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        border: Border(
          left: BorderSide(color: item.color, width: 4),
          bottom: BorderSide(color: Colors.grey.shade200),
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(item.title,
              style: const TextStyle(
                  fontSize: 15, fontWeight: FontWeight.w600)),
          Text(item.subtitle,
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
        ],
      ),
    );
  }
}

enum _Mode { column, builder }

class F1Page extends StatefulWidget {
  const F1Page({super.key});

  @override
  State<F1Page> createState() => _F1PageState();
}

class _F1PageState extends State<F1Page> {
  final List<Record> _items = makeItems(5000);

  _Mode? _mode;
  int _run = 0;

  /// Widget list được dựng MỘT lần tại thời điểm bấm nút và cache lại —
  /// setState hậu frame (cập nhật header) dùng lại đúng instance này nên
  /// Flutter bỏ qua rebuild subtree, không đếm đôi / không khựng lần hai.
  Widget? _body;

  int? _builtCount;
  int? _firstFrameMs;

  void _select(_Mode mode) {
    BuildCounter.count = 0;
    _run++;
    final sw = Stopwatch()..start();
    // Key đổi theo run → remount hoàn toàn, bấm lại cùng chế độ vẫn đo từ đầu.
    final key = ValueKey('$mode-$_run');
    final Widget body;
    if (mode == _Mode.column) {
      body = SingleChildScrollView(
        key: key,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: _items.map((it) => RowTile(item: it)).toList(),
        ),
      );
    } else {
      body = ListView.builder(
        key: key,
        itemCount: _items.length,
        itemBuilder: (context, i) => RowTile(item: _items[i]),
      );
    }
    setState(() {
      _mode = mode;
      _body = body;
      _builtCount = null;
      _firstFrameMs = null;
    });
    // Chốt số liệu SAU khung hình đầu tiên của chế độ mới — đúng 1 setState
    // hậu frame, không đăng ký trong build() nên không loop.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      sw.stop();
      setState(() {
        _builtCount = BuildCounter.count;
        _firstFrameMs = sw.elapsedMilliseconds;
      });
    });
  }

  String get _headerText {
    if (_mode == null) return 'Chọn chế độ để đo';
    if (_builtCount == null) return 'Đang dựng…';
    return 'đã build $_builtCount/${_items.length} · first frame ${_firstFrameMs}ms';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('F1 · Column vs builder'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(36),
          child: Container(
            width: double.infinity,
            color: _builtCount == null
                ? Colors.blueGrey.shade100
                : (_builtCount! >= _items.length
                    ? Colors.red.shade100
                    : Colors.green.shade100),
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            child: Text(
              _headerText,
              style: const TextStyle(
                  fontSize: 15, fontWeight: FontWeight.w700),
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8),
            child: Row(
              children: [
                Expanded(
                  child: FilledButton.tonal(
                    style: FilledButton.styleFrom(
                      backgroundColor: _mode == _Mode.column
                          ? Colors.red.shade200
                          : null,
                    ),
                    onPressed: () => _select(_Mode.column),
                    child: const Text('Column 5000'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: FilledButton.tonal(
                    style: FilledButton.styleFrom(
                      backgroundColor: _mode == _Mode.builder
                          ? Colors.green.shade200
                          : null,
                    ),
                    onPressed: () => _select(_Mode.builder),
                    child: const Text('ListView.builder'),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: _body ??
                const Center(
                  child: Text('Bấm một chế độ để dựng 5.000 item'),
                ),
          ),
        ],
      ),
    );
  }
}
