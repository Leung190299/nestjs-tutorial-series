import Flutter
import SwiftUI

struct MiniAppView: UIViewControllerRepresentable {
  let library: String
  let onClose: () -> Void

  func makeUIViewController(context: Context) -> FlutterViewController {
    MiniAppLauncher.shared.makeMiniViewController(library: library, onClose: onClose)
  }

  func updateUIViewController(_ controller: FlutterViewController, context: Context) {}
}
