package com.vietsuper.host

data class MiniApp(
    val id: String,
    val name: String,
    val emoji: String,
    /** File Dart chứa hàm main của mini này — cùng địa chỉ với bản iOS. */
    val library: String,
)

val miniApps = listOf(
    MiniApp("food", "Đồ ăn", "🍜", "package:mini_flutter/main_food.dart"),
)
