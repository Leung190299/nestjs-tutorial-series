import 'package:flutter/material.dart';

import '../data.dart';

/// Toàn bộ "server" giả lập: 500 bản ghi, 25 item/trang (20 trang).
final List<Record> _all = makeItems(500);
const int _pageSize = 25;
const int _totalPages = 20;

/// Fetch giả lập: 800ms rồi trả 25 item của trang [p] (1-based).
Future<List<Record>> fetchPage(int p) async {
  await Future.delayed(const Duration(milliseconds: 800));
  final start = (p - 1) * _pageSize;
  if (start >= _all.length) return const [];
  final end = (start + _pageSize).clamp(0, _all.length);
  return _all.sublist(start, end);
}

/// Một hàng trong list — không đếm build (bằng chứng F4 nằm ở bộ đếm calls).
class _RowTile extends StatelessWidget {
  final Record item;

  const _RowTile({required this.item});

  @override
  Widget build(BuildContext context) {
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
              style:
                  const TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
          Text(item.subtitle,
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
        ],
      ),
    );
  }
}

/// List phân trang thật sự — remount (key đổi) là reset về trang 1 / calls 0.
class _PagedList extends StatefulWidget {
  final bool guard;

  const _PagedList({super.key, required this.guard});

  @override
  State<_PagedList> createState() => _PagedListState();
}

class _PagedListState extends State<_PagedList> {
  final ScrollController _controller = ScrollController();

  /// Trang 1 có sẵn ngay khi vào (như N4) — loadMore chỉ lo trang 2 trở đi.
  final List<Record> _items = List.of(_all.take(_pageSize));
  int _page = 1;

  /// Số lần _loadMore thật sự bắn fetch (ON: lần bị guard chặn KHÔNG đếm —
  /// đúng nghĩa "số request bắn ra", đối xứng cách đếm của N4).
  int _calls = 0;

  /// Số fetch đang bay — OFF có thể chồng nhiều cái cùng lúc.
  int _inFlight = 0;

  bool get _loading => _inFlight > 0;

  @override
  void initState() {
    super.initState();
    _controller.addListener(_onScroll);
  }

  @override
  void dispose() {
    _controller.removeListener(_onScroll);
    _controller.dispose();
    super.dispose();
  }

  /// Listener chạy MỖI scroll event (theo pixel) — đây chính là nguồn bệnh:
  /// trong 800ms chờ fetch, vùng "còn cách đáy < 200px" thỏa điều kiện
  /// hàng chục lần nếu không guard.
  void _onScroll() {
    if (_controller.position.pixels >
        _controller.position.maxScrollExtent - 200) {
      _loadMore();
    }
  }

  void _loadMore() {
    if (widget.guard) {
      if (_loading) return; // guard: cờ chặn gọi chồng
    }
    // Guard ON: cờ _loading bật ngay trong _fire (TRƯỚC await) qua _inFlight++.
    _fire();
  }

  Future<void> _fire() async {
    // Trang xin = trang đã commit + 1 → các call chồng của OFF đều xin
    // CÙNG một trang (mô phỏng đúng bug "bắn N request cho 1 trang").
    final req = _page + 1;
    if (req > _totalPages) return; // hết data
    setState(() {
      _calls++;
      _inFlight++; // set cờ TRƯỚC await
    });
    final fetched = await fetchPage(req);
    if (!mounted) return;
    setState(() {
      _inFlight--;
      // Dedupe theo id khi append: response trùng trang không làm vỡ list —
      // bug thể hiện ở bộ đếm calls, không phải ở số hàng (giống N4).
      final ids = _items.map((e) => e.id).toSet();
      _items.addAll(fetched.where((e) => !ids.contains(e.id)));
      if (req > _page) _page = req;
    });
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
            'Trang $_page · ${_items.length} item · gọi loadMore: $_calls lần',
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
          ),
        ),
        Expanded(
          child: ListView.builder(
            controller: _controller,
            itemCount: _items.length + (_loading ? 1 : 0),
            itemBuilder: (context, i) {
              if (i >= _items.length) {
                // Footer spinner khi đang tải trang tiếp.
                return Container(
                  height: 72,
                  alignment: Alignment.center,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const SizedBox(
                        width: 22,
                        height: 22,
                        child: CircularProgressIndicator(strokeWidth: 3),
                      ),
                      const SizedBox(width: 12),
                      Text('đang tải trang tiếp…',
                          style: TextStyle(color: Colors.grey.shade700)),
                    ],
                  ),
                );
              }
              return _RowTile(item: _items[i]);
            },
          ),
        ),
      ],
    );
  }
}

class F4Page extends StatefulWidget {
  const F4Page({super.key});

  @override
  State<F4Page> createState() => _F4PageState();
}

class _F4PageState extends State<F4Page> {
  bool? _guard;
  int _run = 0;

  void _select(bool guard) {
    _run++; // key đổi → remount _PagedList: về trang 1 · 25 item · calls 0
    setState(() => _guard = guard);
  }

  String get _banner {
    switch (_guard) {
      case null:
        return 'Chọn Guard OFF/ON rồi kéo tới đáy';
      case false:
        return 'Guard OFF — listener bắn thẳng, gọi chồng khi loading';
      case true:
        return 'Guard ON — if (_loading) return; chặn gọi chồng';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('F4 · Infinite scroll + guard'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(40),
          child: Container(
            width: double.infinity,
            color: switch (_guard) {
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
                          _guard == false ? Colors.red.shade200 : null,
                    ),
                    onPressed: () => _select(false),
                    child: const Text('Guard: OFF'),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: FilledButton.tonal(
                    style: FilledButton.styleFrom(
                      backgroundColor:
                          _guard == true ? Colors.green.shade200 : null,
                    ),
                    onPressed: () => _select(true),
                    child: const Text('Guard: ON'),
                  ),
                ),
              ],
            ),
          ),
          if (_guard == null)
            const Expanded(
              child: Center(child: Text('Bấm một chế độ để bắt đầu')),
            )
          else
            Expanded(
              child: _PagedList(
                key: ValueKey('guard-$_guard-$_run'),
                guard: _guard!,
              ),
            ),
        ],
      ),
    );
  }
}
