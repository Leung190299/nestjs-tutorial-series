import 'package:flutter/material.dart';

class Ride {
  const Ride({
    required this.id,
    required this.name,
    required this.emoji,
    required this.pricePerKm,
  });

  final String id;
  final String name;
  final String emoji;
  final int pricePerKm;
}

const rides = [
  Ride(id: 'bike', name: 'Xe máy', emoji: '🛵', pricePerKm: 15000),
  Ride(id: 'car4', name: 'Ô tô 4 chỗ', emoji: '🚗', pricePerKm: 25000),
  Ride(id: 'car7', name: 'Ô tô 7 chỗ', emoji: '🚐', pricePerKm: 32000),
];

String _formatVnd(int amount) {
  final s = amount.toString().replaceAllMapped(
        RegExp(r'\B(?=(\d{3})+(?!\d))'),
        (_) => '.',
      );
  return '$sđ';
}

class RideScreen extends StatefulWidget {
  const RideScreen({super.key});

  @override
  State<RideScreen> createState() => _RideScreenState();
}

class _RideScreenState extends State<RideScreen> {
  String? _ride;
  int _km = 5;

  Ride? get _selected => _ride == null ? null : rides.firstWhere((r) => r.id == _ride);

  int get _total => (_selected?.pricePerKm ?? 0) * _km;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: rides.length,
            separatorBuilder: (_, _) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final ride = rides[index];
              final isSelected = _ride == ride.id;
              return Card(
                child: ListTile(
                  leading: Text(ride.emoji, style: const TextStyle(fontSize: 32)),
                  title: Text(ride.name),
                  subtitle: Text('${_formatVnd(ride.pricePerKm)}/km'),
                  trailing: FilledButton(
                    style: isSelected
                        ? FilledButton.styleFrom(backgroundColor: Colors.green)
                        : null,
                    onPressed: () => setState(() => _ride = ride.id),
                    child: Text(isSelected ? 'Đang chọn ✓' : 'Chọn'),
                  ),
                ),
              );
            },
          ),
        ),
        SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                IconButton(
                  onPressed: () => setState(() => _km = (_km - 1).clamp(1, 50)),
                  icon: const Icon(Icons.remove),
                ),
                Text('$_km km', style: Theme.of(context).textTheme.titleMedium),
                IconButton(
                  onPressed: () => setState(() => _km = (_km + 1).clamp(1, 50)),
                  icon: const Icon(Icons.add),
                ),
                const Spacer(),
                Text('Tổng: ${_formatVnd(_total)}',
                    style: Theme.of(context).textTheme.titleLarge),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
