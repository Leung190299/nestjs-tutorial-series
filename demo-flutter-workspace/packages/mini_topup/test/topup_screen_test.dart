import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_topup/mini_topup.dart';

void main() {
  testWidgets('nạp thẻ: chọn đủ mới bấm được, success rồi reset', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: TopupScreen())));

    final button = find.widgetWithText(FilledButton, 'Nạp thẻ');
    expect(tester.widget<FilledButton>(button).onPressed, isNull); // chưa chọn gì

    await tester.tap(find.text('Viettel'));
    await tester.tap(find.text('100.000đ'));
    await tester.pump();
    expect(tester.widget<FilledButton>(button).onPressed, isNotNull);

    await tester.tap(button);
    await tester.pump();
    expect(find.text('Nạp thành công!'), findsOneWidget);
    expect(find.text('Viettel — 100.000đ'), findsOneWidget);

    await tester.tap(find.text('Nạp thêm'));
    await tester.pump();
    expect(find.text('Nạp thành công!'), findsNothing);
    expect(tester.widget<FilledButton>(find.widgetWithText(FilledButton, 'Nạp thẻ')).onPressed, isNull);
  });
}
