import 'package:flutter/material.dart';
import 'package:mini_news/mini_news.dart';

import 'home_screen.dart';
import 'under_construction.dart';

class HomeShell extends StatefulWidget {
  const HomeShell({super.key});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final screens = <Widget>[
      HomeScreen(onOpenTab: (i) => setState(() => _tab = i)),
      const NewsScreen(),
      const UnderConstruction(title: 'Nạp thẻ'),
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('ViệtSuper 🇻🇳')),
      body: screens[_tab],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: const [
          NavigationDestination(icon: Text('🏠', style: TextStyle(fontSize: 24)), label: 'Trang chủ'),
          NavigationDestination(icon: Text('📰', style: TextStyle(fontSize: 24)), label: 'Tin tức'),
          NavigationDestination(icon: Text('📱', style: TextStyle(fontSize: 24)), label: 'Nạp thẻ'),
        ],
      ),
    );
  }
}
