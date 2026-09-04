import 'package:flutter/material.dart';

const carriers = ['Viettel', 'MobiFone', 'VinaPhone'];
const amounts = [50000, 100000, 200000];

String _formatVnd(int amount) {
  final s = amount.toString().replaceAllMapped(
        RegExp(r'\B(?=(\d{3})+(?!\d))'),
        (_) => '.',
      );
  return '$sđ';
}

class TopupScreen extends StatefulWidget {
  const TopupScreen({super.key});

  @override
  State<TopupScreen> createState() => _TopupScreenState();
}

class _TopupScreenState extends State<TopupScreen> {
  String? _carrier;
  int? _amount;
  bool _done = false;

  bool get _canPay => _carrier != null && _amount != null;

  @override
  Widget build(BuildContext context) {
    if (_done) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('✅', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 12),
            Text('Nạp thành công!', style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 8),
            Text('$_carrier — ${_formatVnd(_amount!)}'),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: () => setState(() {
                _carrier = null;
                _amount = null;
                _done = false;
              }),
              child: const Text('Nạp thêm'),
            ),
          ],
        ),
      );
    }
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text('Nhà mạng', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: [
            for (final c in carriers)
              ChoiceChip(
                label: Text(c),
                selected: _carrier == c,
                onSelected: (_) => setState(() => _carrier = c),
              ),
          ],
        ),
        const SizedBox(height: 20),
        Text('Mệnh giá', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: [
            for (final a in amounts)
              ChoiceChip(
                label: Text(_formatVnd(a)),
                selected: _amount == a,
                onSelected: (_) => setState(() => _amount = a),
              ),
          ],
        ),
        const SizedBox(height: 28),
        FilledButton(
          onPressed: _canPay ? () => setState(() => _done = true) : null,
          child: const Text('Nạp thẻ'),
        ),
      ],
    );
  }
}
