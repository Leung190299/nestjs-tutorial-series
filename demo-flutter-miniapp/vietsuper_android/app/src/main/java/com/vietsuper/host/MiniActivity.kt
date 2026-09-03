package com.vietsuper.host

import android.content.Context
import android.content.Intent
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngineCache

class MiniActivity : FlutterActivity() {
    companion object {
        var current: MiniActivity? = null

        fun intent(context: Context, engineId: String): Intent =
            CachedEngineIntentBuilder(MiniActivity::class.java, engineId)
                .destroyEngineWithActivity(true)
                .build(context)
    }

    override fun onResume() {
        super.onResume()
        current = this
    }

    override fun onDestroy() {
        if (current === this) current = null
        cachedEngineId?.let { FlutterEngineCache.getInstance().remove(it) }
        super.onDestroy()
    }
}
