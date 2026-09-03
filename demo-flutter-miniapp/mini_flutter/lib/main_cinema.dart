import 'package:flutter/material.dart';

import 'cinema_screen.dart';
import 'mini_shell.dart';

@pragma('vm:entry-point')
void main() =>
    runApp(const MiniAppShell(title: 'Xem phim ViệtSuper', child: CinemaScreen()));
