import 'package:flutter/material.dart';

import '../data.dart';

/// Bộ đếm build cho F2 — reset khi đổi chế độ và NGAY TRƯỚC mỗi lần jumpTo,
/// nên số hiện sau khi nhảy = số item build THÊM dọc đường nhảy.
class BuildCounterF2 {
  static int count = 0;
}

/// Phần KHUNG tĩnh của hàng — const 100% (không phụ thuộc dữ liệu item).
/// Chỉ phần này const được: title/subtitle/màu viền là dữ liệu động theo item
/// nên KHÔNG thể const cả hàng (const đòi mọi tham số là hằng compile-time).
class RowBadgeConst extends StatelessWidget {
  const RowBadgeConst({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(right: 10),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: Color(0xFFE0F2F1),
          borderRadius: BorderRadius.all(Radius.circular(6)),
        ),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 6, vertical: 3),
          child: Text(
            '64pt',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: Color(0xFF00695C),
            ),
          ),
        ),
      ),
    );
  }
}

/// Một hàng cao 64 — tăng BuildCounterF2.count MỖI lần build().
/// Chế độ ON gắn thêm khung const [RowBadgeConst].
class RowTileF2 extends StatelessWidget {
  final Record item;
  final bool constFrame;

  const RowTileF2({super.key, required this.item, required this.constFrame});

  @override
  Widget build(BuildContext context) {
    BuildCounterF2.count++;
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        border: Border(
          left: BorderSide(color: item.color, width: 4),
          bottom: BorderSide(color: Colors.grey.shade200),
        ),
      ),
      child: Row(
        children: [
          if (constFrame) const RowBadgeConst(),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item.title,
                    style: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w600)),
                Text(item.subtitle,
                    style:
                        TextStyle(fontSize: 12, color: Colors.grey.shade600)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

enum _Mode { off, on }

class F2Page extends StatefulWidget {
  const F2Page({super.key});

  @override
  State<F2Page> createState() => _F2PageState();
}

class _F2PageState extends State<F2Page> {
  final List<Record> _items = makeItems(5000);
  final ScrollController _controller = ScrollController();

  _Mode? _mode;
  int _run = 0;

  /// List widget dựng MỘT lần khi chọn chế độ và cache lại — setState hậu
  /// frame (cập nhật header) dùng lại đúng instance nên Flutter skip rebuild
  /// subtree, không đếm đôi (pattern F1).
  Widget? _body;

  int? _initialBuilt; // build lần dựng đầu của chế độ
  int? _jumpBuilt; // build THÊM dọc đường nhảy cuối
  int? _jumpMs;
  double? _extentBefore; // maxScrollExtent NGAY TRƯỚC jumpTo
  double? _extentAfter; // maxScrollExtent SAU frame nhảy
  double? _pixelsAfter; // vị trí đứng thực sau frame nhảy

  void _select(_Mode mode) {
    BuildCounterF2.count = 0;
    _run++;
    // Key đổi theo run → remount hoàn toàn, bấm lại cùng chế độ vẫn đo từ đầu.
    final key = ValueKey('$mode-$_run');
    final body = ListView.builder(
      key: key,
      controller: _controller,
      // Điểm khác biệt DUY NHẤT của cấu hình list giữa 2 chế độ:
      itemExtent: mode == _Mode.on ? 64 : null,
      itemCount: _items.length,
      itemBuilder: (context, i) =>
          RowTileF2(item: _items[i], constFrame: mode == _Mode.on),
    );
    setState(() {
      _mode = mode;
      _body = body;
      _initialBuilt = null;
      _jumpBuilt = null;
      _jumpMs = null;
      _extentBefore = null;
      _extentAfter = null;
      _pixelsAfter = null;
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      setState(() => _initialBuilt = BuildCounterF2.count);
    });
  }

  void _jumpToEnd() {
    if (_mode == null || !_controller.hasClients) return;
    final before = _controller.position.maxScrollExtent;
    BuildCounterF2.count = 0;
    final sw = Stopwatch()..start();
    _controller.jumpTo(before);
    // Chốt số liệu SAU frame layout ở offset mới — đăng ký trong handler,
    // đúng 1 setState hậu frame, không loop (pattern F1).
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      sw.stop();
      setState(() {
        _jumpBuilt = BuildCounterF2.count;
        _jumpMs = sw.elapsedMilliseconds;
        _extentBefore = before;
        _extentAfter = _controller.position.maxScrollExtent;
        _pixelsAfter = _controller.position.pixels;
      });
    });
  }

  String get _modeLabel => _mode == _Mode.on ? 'ON' : 'OFF';

  String get _headerLine1 {
    if (_mode == null) return 'Chọn chế độ rồi bấm "Nhảy cuối"';
    if (_jumpBuilt == null) {
      final init = _initialBuilt == null ? '…' : '$_initialBuilt';
      return 'chế độ $_modeLabel · dựng đầu build $init item · chưa nhảy';
    }
    return 'chế độ $_modeLabel · nhảy cuối build thêm $_jumpBuilt item · ${_jumpMs}ms';
  }

  String? get _headerLine2 {
    if (_jumpBuilt == null) return null;
    final a = _extentBefore!.toStringAsFixed(0);
    final b = _extentAfter!.toStringAsFixed(0);
    final p = _pixelsAfter!.toStringAsFixed(0);
    return 'maxScrollExtent trước/sau: $a→${b}px · đứng ${p}px';
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final line2 = _headerLine2;
    return Scaffold(
      appBar: AppBar(
        title: const Text('F2 · itemExtent + const'),
        bottom: PreferredSize(
          // Đủ chỗ cho 2 dòng số liệu wrap thành 4 dòng text — không tràn AppBar.
          preferredSize: const Size.fromHeight(88),
          child: Container(
            width: double.infinity,
            color: _jumpBuilt == null
                ? Colors.blueGrey.shade100
                : (_mode == _Mode.on
                    ? Colors.green.shade100
                    : Colors.red.shade100),
            padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(_headerLine1,
                    style: const TextStyle(
                        fontSize: 14, fontWeight: FontWeight.w700)),
                if (line2 != null)
                  Text(line2,
                      style: const TextStyle(
                          fontSize: 12, fontWeight: FontWeight.w600)),
              ],
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
                          _mode == _Mode.off ? Colors.red.shade200 : null,
                    ),
                    onPressed: () => _select(_Mode.off),
                    child: const Text('itemExtent OFF'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: FilledButton.tonal(
                    style: FilledButton.styleFrom(
                      backgroundColor:
                          _mode == _Mode.on ? Colors.green.shade200 : null,
                    ),
                    onPressed: () => _select(_Mode.on),
                    child: const Text('itemExtent 64 + const'),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: _mode == null ? null : _jumpToEnd,
                child: const Text('Nhảy cuối (jumpTo maxScrollExtent)'),
              ),
            ),
          ),
          const SizedBox(height: 8),
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
