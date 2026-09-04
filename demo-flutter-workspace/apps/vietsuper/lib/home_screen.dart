import 'package:flutter/material.dart';

class Service {
  const Service({
    required this.emoji,
    required this.name,
    this.tabIndex,
    this.enabled = true,
  });

  final String emoji;
  final String name;
  /// Dịch vụ sống trên tab nào (null = mở kiểu màn riêng).
  final int? tabIndex;
  final bool enabled;
}

const services = [
  Service(emoji: '📰', name: 'Tin tức', tabIndex: 1, enabled: true),
  Service(emoji: '📱', name: 'Nạp thẻ', tabIndex: 2, enabled: true),
  Service(emoji: '🛵', name: 'Đặt xe', enabled: true),
  Service(emoji: '🎁', name: 'Sắp ra mắt', enabled: false),
];

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.onOpenTab, this.onOpenRide});

  final void Function(int tabIndex) onOpenTab;
  final VoidCallback? onOpenRide;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text('Dịch vụ', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children: [
            for (final s in services)
              Opacity(
                opacity: s.enabled ? 1 : 0.35,
                child: Card(
                  child: InkWell(
                    onTap: !s.enabled
                        ? null
                        : s.tabIndex != null
                            ? () => onOpenTab(s.tabIndex!)
                            : onOpenRide,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(s.emoji, style: const TextStyle(fontSize: 44)),
                        const SizedBox(height: 8),
                        Text(s.name, style: Theme.of(context).textTheme.titleMedium),
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }
}
