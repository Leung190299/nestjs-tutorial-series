import 'package:flutter/material.dart';
import 'package:mini_news/mini_news.dart';

void main() => runApp(const NewsStandaloneApp());

class NewsStandaloneApp extends StatelessWidget {
  const NewsStandaloneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tin tức',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(colorSchemeSeed: const Color(0xffea2845), useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(title: const Text('Tin tức ViệtSuper')),
        body: const NewsScreen(),
      ),
    );
  }
}
