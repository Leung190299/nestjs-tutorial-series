import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/food_screen.dart';

void main() {
  testWidgets('thêm món cập nhật tổng tiền, nút đổi trạng thái', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: FoodScreen())));
    expect(find.text('Tổng: 0đ'), findsOneWidget);

    await tester.tap(find.text('Thêm').first); // Phở bò 45.000đ
    await tester.pump();

    expect(find.text('Tổng: 45.000đ'), findsOneWidget);
    expect(find.text('Đã thêm ✓'), findsOneWidget);
  });
}
