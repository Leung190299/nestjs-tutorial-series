package com.vietsuper.host

import android.app.Activity
import io.flutter.FlutterInjector
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.embedding.engine.FlutterEngineCache
import io.flutter.embedding.engine.FlutterEngineGroup
import io.flutter.embedding.engine.dart.DartExecutor
import io.flutter.plugin.common.MethodChannel

object MiniAppLauncher {
    /** "Nhà máy engine" dùng chung — các engine sinh ra chia sẻ tài nguyên. */
    private var engines: FlutterEngineGroup? = null

    fun openMini(activity: Activity, mini: MiniApp) {
        // Chặn double-tap: mini này đang mở thì không tạo engine thứ hai.
        if (FlutterEngineCache.getInstance().contains(mini.id)) return
        val group = engines
            ?: FlutterEngineGroup(activity.applicationContext).also { engines = it }
        val bundle = FlutterInjector.instance().flutterLoader().findAppBundlePath()
        val entrypoint = DartExecutor.DartEntrypoint(bundle, mini.library, "main")
        val engine = group.createAndRunEngine(activity, entrypoint)
        attachHostChannel(engine)
        FlutterEngineCache.getInstance().put(mini.id, engine)
        activity.startActivity(MiniActivity.intent(activity, mini.id))
    }

    private fun attachHostChannel(engine: FlutterEngine) {
        MethodChannel(engine.dartExecutor.binaryMessenger, "vietsuper/host")
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "getUserInfo" ->
                        result.success(mapOf("name" to "Lee", "balance" to 1_250_000))
                    "close" -> {
                        MiniActivity.current?.finish()
                        result.success(null)
                    }
                    else -> result.notImplemented()
                }
            }
    }
}
