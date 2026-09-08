import 'package:flutter/material.dart';

/// Bản ghi demo — cùng quy tắc sinh với rn-perf (lib/data.ts).
class Record {
  final String id;
  final String title;
  final String subtitle;
  final Color color;

  const Record({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.color,
  });
}

const List<Color> _colors = [
  Color(0xFFEF4444),
  Color(0xFFF97316),
  Color(0xFFEAB308),
  Color(0xFF22C55E),
  Color(0xFF06B6D4),
  Color(0xFF3B82F6),
  Color(0xFF8B5CF6),
  Color(0xFFEC4899),
];

List<Record> makeItems(int n) {
  return List.generate(n, (i) {
    return Record(
      id: '$i',
      title: 'Bản ghi #$i',
      subtitle: 'Khách hàng ${i % 100} · đơn ${1000 + i}',
      color: _colors[i % _colors.length],
    );
  });
}
