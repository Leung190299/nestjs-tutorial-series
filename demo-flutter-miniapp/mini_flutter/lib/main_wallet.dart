import 'package:flutter/material.dart';

import 'mini_shell.dart';
import 'wallet_screen.dart';

@pragma('vm:entry-point')
void main() =>
    runApp(const MiniAppShell(title: 'Ví ViệtSuper', child: WalletScreen()));
