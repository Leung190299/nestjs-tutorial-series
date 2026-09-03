import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/cinema_screen.dart';

void main() {
  testWidgets('đặt vé rồi hủy: tổng tiền cộng trừ đúng', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: CinemaScreen())));
    expect(find.text('Tổng: 0đ'), findsOneWidget);

    await tester.tap(find.text('Đặt vé').first); // Đào, Phở và Piano 90.000đ
    await tester.pump();
    expect(find.text('Tổng: 90.000đ'), findsOneWidget);

    await tester.tap(find.text('Đã đặt ✓'));
    await tester.pump();
    expect(find.text('Tổng: 0đ'), findsOneWidget);
  });
}
