import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_news/mini_news.dart';

void main() {
  testWidgets('đọc bài: mở sheet chi tiết rồi đánh dấu đã đọc', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: NewsScreen())));
    expect(find.text('Flutter có pub workspace chính chủ'), findsOneWidget);
    expect(find.text('Đã đọc ✓'), findsNothing);

    await tester.tap(find.text('Flutter có pub workspace chính chủ'));
    await tester.pumpAndSettle();
    expect(find.textContaining('một lần pub get'), findsOneWidget); // nội dung sheet

    await tester.tapAt(const Offset(10, 10)); // đóng sheet
    await tester.pumpAndSettle();
    expect(find.text('Đã đọc ✓'), findsOneWidget);
  });
}
