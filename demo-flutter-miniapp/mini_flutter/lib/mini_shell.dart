import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Kênh nói chuyện với app chủ. Chạy lẻ thì đầu dây bên kia không tồn tại.
const hostChannel = MethodChannel('vietsuper/host');

class MiniAppShell extends StatelessWidget {
  const MiniAppShell({super.key, required this.title, required this.child});

  final String title;
  final Widget child;

  Future<void> _close() async {
    try {
      await hostChannel.invokeMethod('close');
    } on MissingPluginException {
      // Chạy lẻ: không có host để đóng.
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
          leading: IconButton(icon: const Icon(Icons.close), onPressed: _close),
        ),
        body: child,
      ),
    );
  }
}
