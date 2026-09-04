import 'package:flutter/material.dart';
import 'package:mini_news/mini_news.dart';
import 'package:mini_ride/mini_ride.dart';
import 'package:mini_topup/mini_topup.dart';

import 'home_screen.dart';

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
      HomeScreen(
        onOpenTab: (i) => setState(() => _tab = i),
        onOpenRide: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => Scaffold(
              appBar: AppBar(title: const Text('Đặt xe ViệtSuper')),
              body: const RideScreen(),
            ),
          ),
        ),
      ),
      const NewsScreen(),
      const TopupScreen(),
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
