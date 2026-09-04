import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_ride/mini_ride.dart';

void main() {
  testWidgets('chọn một xe, chỉnh km, tổng tiền nhân đúng', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: RideScreen())));
    expect(find.text('Tổng: 0đ'), findsOneWidget);

    await tester.tap(find.text('Chọn').first); // Xe máy 15.000đ/km, km khởi đầu 5
    await tester.pump();
    expect(find.text('Tổng: 75.000đ'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();
    expect(find.text('Tổng: 90.000đ'), findsOneWidget);

    await tester.tap(find.text('Chọn').first); // đổi sang Ô tô 4 chỗ 25.000đ/km — THAY THẾ
    await tester.pump();
    expect(find.text('Tổng: 150.000đ'), findsOneWidget);
  });
}
