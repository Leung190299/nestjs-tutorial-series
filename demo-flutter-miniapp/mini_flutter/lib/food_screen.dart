import 'package:flutter/material.dart';

import 'format.dart';

class FoodItem {
  const FoodItem({
    required this.id,
    required this.name,
    required this.emoji,
    required this.price,
  });

  final String id;
  final String name;
  final String emoji;
  final int price;
}

const foods = [
  FoodItem(id: 'pho', name: 'Phở bò', emoji: '🍜', price: 45000),
  FoodItem(id: 'banhmi', name: 'Bánh mì thịt', emoji: '🥖', price: 25000),
  FoodItem(id: 'comtam', name: 'Cơm tấm sườn', emoji: '🍛', price: 40000),
];

class FoodScreen extends StatefulWidget {
  const FoodScreen({super.key});

  @override
  State<FoodScreen> createState() => _FoodScreenState();
}

class _FoodScreenState extends State<FoodScreen> {
  final Set<String> _cart = {};

  int get _total => foods
      .where((f) => _cart.contains(f.id))
      .fold(0, (sum, f) => sum + f.price);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: foods.length,
            separatorBuilder: (_, _) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final food = foods[index];
              final inCart = _cart.contains(food.id);
              return Card(
                child: ListTile(
                  leading: Text(food.emoji, style: const TextStyle(fontSize: 32)),
                  title: Text(food.name),
                  subtitle: Text(formatVnd(food.price)),
                  trailing: FilledButton(
                    style: inCart
                        ? FilledButton.styleFrom(backgroundColor: Colors.green)
                        : null,
                    onPressed: () => setState(() {
                      inCart ? _cart.remove(food.id) : _cart.add(food.id);
                    }),
                    child: Text(inCart ? 'Đã thêm ✓' : 'Thêm'),
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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Tổng: ${formatVnd(_total)}',
                    style: Theme.of(context).textTheme.titleLarge),
                FilledButton(
                  onPressed: _cart.isEmpty ? null : () {},
                  child: const Text('Đặt hàng'),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
