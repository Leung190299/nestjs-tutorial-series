import Flutter

final class MiniAppLauncher {
  static let shared = MiniAppLauncher()

  /// Một "nhà máy engine" dùng chung: các engine sinh ra chia sẻ tài nguyên,
  /// mở mini thứ hai gần như miễn phí RAM.
  private let engines = FlutterEngineGroup(name: "vietsuper", project: nil)

  func makeMiniViewController(
    library: String,
    onClose: @escaping () -> Void
  ) -> FlutterViewController {
    let options = FlutterEngineGroupOptions()
    options.entrypoint = "main"
    options.libraryURI = library
    let engine = engines.makeEngine(with: options)

    let controller = FlutterViewController(engine: engine, nibName: nil, bundle: nil)
    let channel = FlutterMethodChannel(
      name: "vietsuper/host",
      binaryMessenger: controller.binaryMessenger
    )
    channel.setMethodCallHandler { call, result in
      switch call.method {
      case "getUserInfo":
        result(["name": "Lee", "balance": 1_250_000])
      case "close":
        onClose()
        result(nil)
      default:
        result(FlutterMethodNotImplemented)
      }
    }
    return controller
  }
}
