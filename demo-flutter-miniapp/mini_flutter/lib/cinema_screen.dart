import 'package:flutter/material.dart';

import 'format.dart';

class Movie {
  const Movie({
    required this.id,
    required this.title,
    required this.emoji,
    required this.price,
  });

  final String id;
  final String title;
  final String emoji;
  final int price;
}

const movies = [
  Movie(id: 'dao-pho', title: 'Đào, Phở và Piano', emoji: '🎹', price: 90000),
  Movie(id: 'mat-biec', title: 'Mắt Biếc', emoji: '👁️', price: 85000),
  Movie(id: 'bo-gia', title: 'Bố Già', emoji: '👨', price: 95000),
];

class CinemaScreen extends StatefulWidget {
  const CinemaScreen({super.key});

  @override
  State<CinemaScreen> createState() => _CinemaScreenState();
}

class _CinemaScreenState extends State<CinemaScreen> {
  final Set<String> _selected = {};

  int get _total => movies
      .where((m) => _selected.contains(m.id))
      .fold(0, (sum, m) => sum + m.price);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: movies.length,
            separatorBuilder: (_, _) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final movie = movies[index];
              final isSelected = _selected.contains(movie.id);
              return Card(
                child: ListTile(
                  leading: Text(movie.emoji, style: const TextStyle(fontSize: 32)),
                  title: Text(movie.title),
                  subtitle: Text(formatVnd(movie.price)),
                  trailing: FilledButton(
                    style: isSelected
                        ? FilledButton.styleFrom(backgroundColor: Colors.green)
                        : null,
                    onPressed: () => setState(() {
                      isSelected
                          ? _selected.remove(movie.id)
                          : _selected.add(movie.id);
                    }),
                    child: Text(isSelected ? 'Đã đặt ✓' : 'Đặt vé'),
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
                  onPressed: _selected.isEmpty ? null : () {},
                  child: const Text('Thanh toán'),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
