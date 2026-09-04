import 'package:flutter/material.dart';

import 'home_shell.dart';

void main() => runApp(const VietSuperApp());

class VietSuperApp extends StatelessWidget {
  const VietSuperApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ViệtSuper',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: const HomeShell(),
    );
  }
}
