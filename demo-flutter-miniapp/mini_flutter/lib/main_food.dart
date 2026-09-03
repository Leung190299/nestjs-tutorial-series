import 'package:flutter/material.dart';

import 'food_screen.dart';
import 'mini_shell.dart';

@pragma('vm:entry-point')
void main() =>
    runApp(const MiniAppShell(title: 'Đồ ăn ViệtSuper', child: FoodScreen()));
