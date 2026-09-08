import 'dart:async';

import 'package:flutter/material.dart';

/// 12 nguồn ảnh PNG 2000×2000 sinh cục bộ (dùng lại của N5), lặp modulo cho
/// 120 ô grid. Mỗi ảnh decode full-size = 2000×2000×4B ≈ 16MB RGBA.
const int _sources = 12;
const int _cellCount = 120;

/// Số ảnh "màn đầu": grid 2 cột, ô vuông ~190px → viewport thấy ~3 hàng = 6 ô
/// đầu tiên (big0..big5) — đo ms từ lúc mount tới khi 6 ảnh này decode xong.
const int _firstScreen = 6;

/// cacheWidth cho chế độ decode nhỏ: ô ~190pt hiển thị @2x ≈ 380px vật lý.
const int _cacheWidth = 380;

String _assetPath(int i) => 'assets/big/big${i % _sources}.png';

/// Provider ĐÚNG bằng provider mà Image.asset dựng bên trong, để precacheImage
/// đo trên cùng cache entry: cacheWidth → ResizeImage bọc AssetImage.
ImageProvider _providerFor(int i, {required bool resized}) {
  final base = AssetImage(_assetPath(i));
  return resized ? ResizeImage(base, width: _cacheWidth) : base;
}

/// Grid 120 ô — remount (key đổi) khi đổi chế độ; cha đã evict cache trước đó
/// nên mỗi lần đo đều xuất phát từ imageCache RỖNG.
class _ImageGrid extends StatefulWidget {
  final bool resized;

  const _ImageGrid({super.key, required this.resized});

  @override
  State<_ImageGrid> createState() => _ImageGridState();
}

class _ImageGridState extends State<_ImageGrid> {
  final Stopwatch _watch = Stopwatch();
  Timer? _ticker;
  bool _precacheStarted = false;
  int? _firstScreenMs;
  double _cacheMB = 0;

  @override
  void initState() {
    super.initState();
    _watch.start();
    // imageCache.currentSizeBytes là số ĐO chính chủ của engine — cập nhật
    // định kỳ để header luôn hiện kích thước cache hiện tại (grid còn decode
    // tiếp các ô ngoài viewport sau khi màn đầu xong).
    _ticker = Timer.periodic(const Duration(milliseconds: 500), (_) {
      final mb = imageCache.currentSizeBytes / (1024 * 1024);
      if ((mb - _cacheMB).abs() > 0.05) setState(() => _cacheMB = mb);
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_precacheStarted) return;
    _precacheStarted = true;
    // Đo (a): ms từ bấm chế độ tới khi 6 ảnh màn đầu decode xong — đếm qua
    // precacheImage trên CÙNG provider với Image.asset bên dưới.
    Future.wait([
      for (var i = 0; i < _firstScreen; i++)
        precacheImage(_providerFor(i, resized: widget.resized), context),
    ]).then((_) {
      if (!mounted) return;
      setState(() {
        _firstScreenMs = _watch.elapsedMilliseconds;
        _cacheMB = imageCache.currentSizeBytes / (1024 * 1024);
      });
    });
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  String get _measureLine {
    final ms = _firstScreenMs;
    final mb = _cacheMB.toStringAsFixed(1);
    if (ms == null) return 'đang decode $_firstScreen ảnh màn đầu…';
    return '$_firstScreen ảnh màn đầu: ${ms}ms · imageCache: ${mb}MB';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          color: Colors.amber.shade100,
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
          child: Text(
            _measureLine,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
          ),
        ),
        Expanded(
          child: GridView.builder(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 4,
              crossAxisSpacing: 4,
            ),
            itemCount: _cellCount,
            itemBuilder: (context, i) {
              return Image.asset(
                _assetPath(i),
                // Khác biệt DUY NHẤT giữa 2 chế độ: cacheWidth bảo engine
                // "decode and store the image at the specified size" thay vì
                // kích thước gốc 2000px cho ô ~190px.
                cacheWidth: widget.resized ? _cacheWidth : null,
                fit: BoxFit.cover,
              );
            },
          ),
        ),
      ],
    );
  }
}

class F5Page extends StatefulWidget {
  const F5Page({super.key});

  @override
  State<F5Page> createState() => _F5PageState();
}

class _F5PageState extends State<F5Page> {
  /// null = chưa chọn; false = Image.asset gốc 2000px; true = cacheWidth 380.
  bool? _resized;
  int _run = 0;

  /// Mặc định imageCache trần 100MiB — 12 ảnh full-size ≈ 183MiB sẽ bị evict
  /// LRU làm số đo sai. Nâng trần trong phạm vi trang này để currentSizeBytes
  /// phản ánh ĐỦ chi phí decode thật; dispose trả về mặc định.
  static const int _defaultCacheCap = 100 << 20;

  @override
  void initState() {
    super.initState();
    imageCache.maximumSizeBytes = 512 << 20;
  }

  @override
  void dispose() {
    imageCache.maximumSizeBytes = _defaultCacheCap;
    imageCache.clear();
    imageCache.clearLiveImages();
    super.dispose();
  }

  void _select(bool resized) {
    // Evict cache khi đổi chế độ để 2 chế độ so từ cache RỖNG.
    imageCache.clear();
    imageCache.clearLiveImages();
    _run++; // key đổi → remount _ImageGrid: đo lại từ đầu
    setState(() => _resized = resized);
  }

  String get _banner {
    switch (_resized) {
      case null:
        return 'Chọn chế độ decode — cache evict sạch mỗi lần đổi';
      case false:
        return 'Image.asset gốc — decode full 2000px cho ô ~190px';
      case true:
        return 'cacheWidth: 380 — decode đúng cỡ hiển thị @2x';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('F5 · Ảnh — cacheWidth decode nhỏ'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(40),
          child: Container(
            width: double.infinity,
            color: switch (_resized) {
              null => Colors.blueGrey.shade100,
              false => Colors.red.shade100,
              true => Colors.green.shade100,
            },
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
            child: Text(
              _banner,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
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
                          _resized == false ? Colors.red.shade200 : null,
                    ),
                    onPressed: () => _select(false),
                    child: const Text('Gốc 2000px'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: FilledButton.tonal(
                    style: FilledButton.styleFrom(
                      backgroundColor:
                          _resized == true ? Colors.green.shade200 : null,
                    ),
                    onPressed: () => _select(true),
                    child: const Text('cacheWidth 380'),
                  ),
                ),
              ],
            ),
          ),
          if (_resized == null)
            const Expanded(
              child: Center(child: Text('Bấm một chế độ để bắt đầu')),
            )
          else
            Expanded(
              child: _ImageGrid(
                key: ValueKey('resized-$_resized-$_run'),
                resized: _resized!,
              ),
            ),
        ],
      ),
    );
  }
}
