import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mini_flutter/mini_shell.dart';
import 'package:mini_flutter/wallet_screen.dart';

void main() {
  testWidgets('chạy lẻ không có host: hiện dữ liệu mẫu', (tester) async {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMethodCallHandler(
      hostChannel,
      (_) async => throw MissingPluginException(),
    );

    await tester.pumpWidget(const MaterialApp(home: Scaffold(body: WalletScreen())));
    await tester.pumpAndSettle();

    expect(find.text('Khách chạy lẻ'), findsOneWidget);
    expect(find.text('500.000đ'), findsOneWidget);
    expect(find.text('Dữ liệu mẫu — đang chạy lẻ'), findsOneWidget);
  });
}
