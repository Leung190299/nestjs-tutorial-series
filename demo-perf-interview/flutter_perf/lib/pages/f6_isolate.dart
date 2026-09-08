import 'dart:convert';
import 'dart:isolate';

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import '../data.dart';

/// Kết quả gọn từ phần decode: (số bản ghi, checksum, ms decode+checksum).
typedef _Summary = (int, int, int);

/// jsonDecode + checksum nhẹ (tổng độ dài title+subtitle) — CHẠY Ở ĐÂU là
/// điểm khác biệt duy nhất giữa 2 nhánh: nhánh 1 gọi thẳng trên main isolate,
/// nhánh 2 gọi bên trong Isolate.run và chỉ trả bộ số gọn này về
/// ("đừng chuyển cả núi object về, trả kết quả gọn").
_Summary _decodeAndSum(String big) {
  final sw = Stopwatch()..start();
  final list = jsonDecode(big) as List<dynamic>;
  var checksum = 0;
  for (final m in list) {
    final map = m as Map<String, dynamic>;
    checksum +=
        (map['title'] as String).length + (map['subtitle'] as String).length;
  }
  sw.stop();
  return (list.length, checksum, sw.elapsedMilliseconds);
}

/// Helper TOP-LEVEL: closure gửi vào Isolate.run phải tạo ở scope chỉ chứa
/// `big` — nếu tạo trực tiếp trong method của State, context của closure kéo
/// theo `this` (State chứa Ticker) → "Illegal argument in isolate message:
/// object is unsendable" (đã dính thật khi viết trang này, ghi report).
Future<_Summary> _decodeInIsolate(String big) =>
    Isolate.run(() => _decodeAndSum(big));

enum _Mode { main, isolate }

extension on _Mode {
  String get label => switch (this) {
        _Mode.main => 'jsonDecode trên MAIN isolate',
        _Mode.isolate => 'Isolate.run (isolate nền)',
      };
}

class F6Page extends StatefulWidget {
  const F6Page({super.key});

  @override
  State<F6Page> createState() => _F6PageState();
}

class _F6PageState extends State<F6Page> with SingleTickerProviderStateMixin {
  late final Ticker _ticker;
  Duration? _lastTick;
  bool _windowActive = false;
  int _liveMaxGap = 0;

  String? _big;
  int? _prepMs;

  bool _running = false;
  _Mode? _mode;
  int? _maxGap;
  int? _totalMs;
  int? _decodeMs;
  int? _count;
  int? _checksum;

  @override
  void initState() {
    super.initState();
    // Ticker chạy LIÊN TỤC mỗi frame — gap = chênh lệch elapsed giữa 2 tick.
    // Khi main isolate bị chặn thì không có frame nào → gap lộ ra ở tick
    // ĐẦU TIÊN sau khi thread rảnh (vì vậy KHÔNG reset _lastTick khi mở cửa sổ đo).
    _ticker = createTicker(_onTick)..start();
    WidgetsBinding.instance.addPostFrameCallback((_) => _prepare());
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  void _onTick(Duration elapsed) {
    final last = _lastTick;
    _lastTick = elapsed;
    if (last != null && _windowActive) {
      final gap = (elapsed - last).inMilliseconds;
      if (gap > _liveMaxGap) _liveMaxGap = gap;
    }
  }

  /// Chuẩn bị TRƯỚC, ngoài phần đo: chuỗi JSON lớn từ makeItems(200000),
  /// jsonEncode MỘT lần, giữ String cho cả các lần chạy sau.
  void _prepare() {
    final sw = Stopwatch()..start();
    final items = makeItems(200000);
    final big = jsonEncode([
      for (final it in items)
        {
          'id': it.id,
          'title': it.title,
          'subtitle': it.subtitle,
          'color': it.color.toARGB32(),
        },
    ]);
    sw.stop();
    if (!mounted) return;
    setState(() {
      _big = big;
      _prepMs = sw.elapsedMilliseconds;
    });
  }

  Future<void> _run(_Mode mode) async {
    final big = _big;
    if (big == null || _running) return;
    setState(() {
      _running = true;
      _mode = mode;
      _maxGap = null;
      _totalMs = null;
      _decodeMs = null;
      _count = null;
      _checksum = null;
    });
    // Cho frame "đang chạy…" kịp vẽ trước khi (có thể) chặn main isolate.
    await Future.delayed(const Duration(milliseconds: 80));
    _liveMaxGap = 0;
    _windowActive = true;
    final sw = Stopwatch()..start();
    final _Summary summary;
    try {
      switch (mode) {
        case _Mode.main:
          summary = _decodeAndSum(big);
        case _Mode.isolate:
          summary = await _decodeInIsolate(big);
      }
    } catch (e) {
      _windowActive = false;
      if (mounted) {
        setState(() => _running = false);
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('Lỗi: $e')));
      }
      return;
    }
    sw.stop();
    // Giữ cửa sổ đo thêm vài frame: gap của khối đồng bộ chỉ hiện ra ở tick
    // đầu tiên SAU khi main isolate rảnh trở lại.
    await Future.delayed(const Duration(milliseconds: 300));
    _windowActive = false;
    if (!mounted) return;
    setState(() {
      _running = false;
      _maxGap = _liveMaxGap;
      _totalMs = sw.elapsedMilliseconds;
      _count = summary.$1;
      _checksum = summary.$2;
      _decodeMs = summary.$3;
    });
  }

  @override
  Widget build(BuildContext context) {
    final prepText = _prepMs == null
        ? 'đang chuẩn bị dữ liệu (jsonEncode 200k)…'
        : 'chuẩn bị dữ liệu: ${_prepMs}ms · '
            'JSON ${(_big!.length / (1024 * 1024)).toStringAsFixed(1)}MB '
            '(ngoài phần đo)';
    final ready = _big != null && !_running;
    return Scaffold(
      appBar: AppBar(title: const Text('F6 · jsonDecode vs Isolate.run')),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            color: Colors.blueGrey.shade100,
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            child: Text(
              prepText,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
          ),
          Expanded(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(
                    width: 96,
                    height: 96,
                    child: CircularProgressIndicator(strokeWidth: 8),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _running
                        ? 'đang chạy: ${_mode?.label}…'
                        : 'spinner luôn quay — đứng hình = main isolate bị chặn',
                    style: TextStyle(fontSize: 13, color: Colors.grey.shade700),
                  ),
                ],
              ),
            ),
          ),
          if (_maxGap != null) _ResultBox(
            mode: _mode!,
            maxGap: _maxGap!,
            totalMs: _totalMs!,
            decodeMs: _decodeMs!,
            count: _count!,
            checksum: _checksum!,
          ),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: FilledButton.tonal(
                        style: FilledButton.styleFrom(
                          backgroundColor: Colors.red.shade200,
                        ),
                        onPressed: ready ? () => _run(_Mode.main) : null,
                        child: const Text('jsonDecode 200k (main isolate)'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: FilledButton.tonal(
                        style: FilledButton.styleFrom(
                          backgroundColor: Colors.green.shade200,
                        ),
                        onPressed: ready ? () => _run(_Mode.isolate) : null,
                        child: const Text('Isolate.run'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ResultBox extends StatelessWidget {
  final _Mode mode;
  final int maxGap;
  final int totalMs;
  final int decodeMs;
  final int count;
  final int checksum;

  const _ResultBox({
    required this.mode,
    required this.maxGap,
    required this.totalMs,
    required this.decodeMs,
    required this.count,
    required this.checksum,
  });

  @override
  Widget build(BuildContext context) {
    final blocked = maxGap > 100;
    final color = blocked ? Colors.red : Colors.green;
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(horizontal: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: blocked ? Colors.red.shade50 : Colors.green.shade50,
        border: Border.all(color: color, width: 2),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(mode.label,
              style:
                  const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
          Text(
            '⏱ frame gap: ${maxGap}ms',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: blocked ? Colors.red.shade700 : Colors.green.shade700,
            ),
          ),
          Text(
            'tổng: ${totalMs}ms · decode+checksum: ${decodeMs}ms',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
          ),
          Text(
            'checksum: $checksum · $count bản ghi',
            style: TextStyle(fontSize: 13, color: Colors.grey.shade700),
          ),
        ],
      ),
    );
  }
}
