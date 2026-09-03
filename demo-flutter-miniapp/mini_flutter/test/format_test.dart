import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/format.dart';

void main() {
  test('formatVnd chèn dấu chấm ngăn nghìn', () {
    expect(formatVnd(0), '0đ');
    expect(formatVnd(45000), '45.000đ');
    expect(formatVnd(1250000), '1.250.000đ');
  });
}
