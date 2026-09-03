import Foundation

struct MiniApp: Identifiable {
  let id: String
  let name: String
  let emoji: String
  /// File Dart chứa hàm main của mini này.
  let library: String
}

let miniApps: [MiniApp] = [
  MiniApp(id: "food", name: "Đồ ăn", emoji: "🍜",
          library: "package:mini_flutter/main_food.dart"),
]
