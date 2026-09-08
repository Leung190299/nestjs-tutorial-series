import 'package:flutter/material.dart';

import '../data.dart';

/// Bộ đếm build PER-ITEM cho F3 — key = index, value = số lần build().
/// Reset khi đổi chế độ (kèm remount list) để mỗi chế độ đo từ đầu.
class BuildCountsF3 {
  static Map<int, int> counts = {};

  static void reset() => counts = {};
}

/// Một hàng trong list 40 item — hiện build-count CỦA CHÍNH NÓ.
///
/// CỐ Ý không dùng const constructor và không cache instance: mỗi lần build()
/// của trang, itemBuilder tạo widget MỚI → Flutter phải gọi build() của hàng —
/// đây chính là hành vi "setState cả trang kéo mọi item rebuild" cần minh hoạ.
class RowTileF3 extends StatelessWidget {
  final Record item;
  final int index;

  // ignore: prefer_const_constructors_in_immutables
  RowTileF3({super.key, required this.item, required this.index});

  @override
  Widget build(BuildContext context) {
    final k = BuildCountsF3.counts[index] = (BuildCountsF3.counts[index] ?? 0) + 1;
    return Container(
      height: 52,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        border: Border(
          left: BorderSide(color: item.color, width: 4),
          bottom: BorderSide(color: Colors.grey.shade200),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item.title,
                    style: const TextStyle(
                        fontSize: 14, fontWeight: FontWeight.w600)),
                Text(item.subtitle,
                    style:
                        TextStyle(fontSize: 11, color: Colors.grey.shade600)),
              ],
            ),
          ),
          DecoratedBox(
            decoration: BoxDecoration(
              color: k == 1 ? Colors.green.shade100 : Colors.red.shade100,
              borderRadius: const BorderRadius.all(Radius.circular(6)),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              child: Text(
                'build $k×',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color:
                      k == 1 ? Colors.green.shade900 : Colors.red.shade900,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Khối UI counter dùng chung cho cả 2 chế độ — nút "+1" to + "Counter: {n}".
class _CounterPanel extends StatelessWidget {
  final int counter;
  final VoidCallback onAdd;

  const _CounterPanel({required this.counter, required this.onAdd});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      color: Colors.blueGrey.shade50,
      child: Row(
        children: [
          FilledButton(
            style: FilledButton.styleFrom(
              padding:
                  const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
              textStyle: const TextStyle(
                  fontSize: 22, fontWeight: FontWeight.w800),
            ),
            onPressed: onAdd,
            child: const Text('+1'),
          ),
          const SizedBox(width: 16),
          Text(
            'Counter: $counter',
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
          ),
        ],
      ),
    );
  }
}

/// Chế độ "tách widget": counter là state RIÊNG của box này —
/// bấm +1 chỉ setState TRONG box, page (và 40 item) đứng yên.
class _CounterBox extends StatefulWidget {
  const _CounterBox({super.key});

  @override
  State<_CounterBox> createState() => _CounterBoxState();
}

class _CounterBoxState extends State<_CounterBox> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return _CounterPanel(
      counter: _count,
      onAdd: () => setState(() => _count++),
    );
  }
}

enum _Mode { page, scoped }

class F3Page extends StatefulWidget {
  const F3Page({super.key});

  @override
  State<F3Page> createState() => _F3PageState();
}

class _F3PageState extends State<F3Page> {
  final List<Record> _items = makeItems(40);

  _Mode? _mode;
  int _run = 0;

  /// Counter của chế độ "setState cả trang" — state của CHÍNH page.
  int _pageCounter = 0;

  void _select(_Mode mode) {
    BuildCountsF3.reset();
    _run++; // key đổi theo run → remount list + box, đo lại từ đầu
    setState(() {
      _mode = mode;
      _pageCounter = 0;
    });
  }

  String get _banner {
    switch (_mode) {
      case null:
        return 'Chọn chế độ rồi bấm "+1" đúng 3 lần';
      case _Mode.page:
        return 'setState CẢ TRANG — mỗi +1 rebuild mọi item';
      case _Mode.scoped:
        return 'tách widget — +1 chỉ setState trong _CounterBox';
    }
  }

  @override
  Widget build(BuildContext context) {
    // LƯU Ý: list KHÔNG cache instance (khác pattern F1) — mỗi build() của
    // page tạo ListView + RowTileF3 mới, để chế độ "setState cả trang"
    // phản ánh trung thực chi phí rebuild toàn subtree.
    return Scaffold(
      appBar: AppBar(
        title: const Text('F3 · phạm vi setState'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(40),
          child: Container(
            width: double.infinity,
            color: switch (_mode) {
              null => Colors.blueGrey.shade100,
              _Mode.page => Colors.red.shade100,
              _Mode.scoped => Colors.green.shade100,
            },
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            child: Text(
              _banner,
              style:
                  const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
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
                      backgroundColor:
                          _mode == _Mode.page ? Colors.red.shade200 : null,
                    ),
                    onPressed: () => _select(_Mode.page),
                    child: const Text('setState cả trang'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: FilledButton.tonal(
                    style: FilledButton.styleFrom(
                      backgroundColor:
                          _mode == _Mode.scoped ? Colors.green.shade200 : null,
                    ),
                    onPressed: () => _select(_Mode.scoped),
                    child: const Text('tách widget'),
                  ),
                ),
              ],
            ),
          ),
          if (_mode == null)
            const Expanded(
              child: Center(child: Text('Bấm một chế độ để bắt đầu')),
            )
          else ...[
            if (_mode == _Mode.page)
              _CounterPanel(
                counter: _pageCounter,
                // setState của PAGE → toàn bộ build() này chạy lại,
                // itemBuilder phát widget mới → 40 item rebuild theo.
                onAdd: () => setState(() => _pageCounter++),
              )
            else
              _CounterBox(key: ValueKey('box-$_run')),
            Expanded(
              child: ListView.builder(
                key: ValueKey('list-$_mode-$_run'),
                itemCount: _items.length,
                itemBuilder: (context, i) =>
                    RowTileF3(item: _items[i], index: i),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
