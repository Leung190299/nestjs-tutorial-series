import 'package:flutter/material.dart';

class UnderConstruction extends StatelessWidget {
  const UnderConstruction({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('🏗️', style: TextStyle(fontSize: 64)),
          const SizedBox(height: 12),
          Text(title, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 8),
          const Text('Đang xây — quay lại tập sau nhé!'),
        ],
      ),
    );
  }
}
