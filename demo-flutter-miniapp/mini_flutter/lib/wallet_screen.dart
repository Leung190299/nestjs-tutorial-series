import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'format.dart';
import 'mini_shell.dart';

class WalletScreen extends StatefulWidget {
  const WalletScreen({super.key});

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  String _name = 'Đang tải…';
  int _balance = 0;
  bool _fromHost = false;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    try {
      final info = await hostChannel.invokeMapMethod<String, Object?>('getUserInfo');
      if (!mounted) return;
      setState(() {
        _name = info?['name'] as String? ?? 'Khách';
        _balance = (info?['balance'] as num?)?.toInt() ?? 0;
        _fromHost = true;
      });
    } on MissingPluginException {
      if (!mounted) return;
      setState(() {
        _name = 'Khách chạy lẻ';
        _balance = 500000;
        _fromHost = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            color: const Color(0xffea2845),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(_name,
                      style: const TextStyle(color: Colors.white70, fontSize: 16)),
                  const SizedBox(height: 8),
                  Text(formatVnd(_balance),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      )),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Chip(
            avatar: Text(_fromHost ? '🏢' : '🏕️'),
            label: Text(_fromHost
                ? 'Số dư lấy từ app chủ (Swift)'
                : 'Dữ liệu mẫu — đang chạy lẻ'),
          ),
        ],
      ),
    );
  }
}
