import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:vietsuper/home_shell.dart';

void main() {
  testWidgets('3 tab chuyển được, tab Tin tức và tab Nạp thẻ đã có mini-app',
      (tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomeShell()));
    expect(find.text('ViệtSuper 🇻🇳'), findsOneWidget);
    expect(find.text('Dịch vụ'), findsOneWidget);

    await tester.tap(find.text('Tin tức').last); // nút trên NavigationBar
    await tester.pumpAndSettle();
    expect(find.text('Flutter có pub workspace chính chủ'), findsOneWidget);

    await tester.tap(find.text('Nạp thẻ').last); // nút trên NavigationBar
    await tester.pumpAndSettle();
    expect(find.text('Nhà mạng'), findsOneWidget);
  });
}
