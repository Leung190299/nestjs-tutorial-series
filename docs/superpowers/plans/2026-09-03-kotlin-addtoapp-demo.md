# Demo Kotlin Add-to-App (vietsuper_android) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây `demo-flutter-miniapp/vietsuper_android/` — app chủ Kotlin/Jetpack Compose nhúng NGUYÊN VẸN module `mini_flutter` (không sửa một dòng Dart) qua FlutterEngineGroup, chạy verified trên Android emulator, kèm screenshot cho 2 tập bonus ep32–ep33.

**Architecture:** Host Android thuần Gradle (không cần Android Studio GUI): `settings.gradle` gọi `include_flutter.groovy` của module; mỗi mini mở bằng engine từ `FlutterEngineGroup` với `DartExecutor.DartEntrypoint(bundle, "package:mini_flutter/main_X.dart", "main")`, hiển thị qua `MiniActivity` (subclass `FlutterActivity` cached-engine); channel `vietsuper/host` handler Kotlin.

**Tech Stack:** Kotlin 2.x + Jetpack Compose (BOM), AGP 8.x, Gradle wrapper copy từ `mini_flutter/.android/`, JDK 21 (JBR Android Studio), Flutter 3.38.10 (FVM), emulator AVD `Medium_Phone_API_36.1`.

## Global Constraints

- KHÔNG sửa bất kỳ file nào trong `mini_flutter/` (kể cả `.android/`), `vietsuper_ios/`, hay demo cũ. Nếu kỹ thuật BẮT BUỘC phải sửa → dừng, báo concern, không tự quyết.
- JDK cho Gradle: `/Applications/Android Studio.app/Contents/jbr/Contents/Home` (JDK 21) — khai trong `vietsuper_android/gradle.properties` bằng `org.gradle.java.home=...`. Java mặc định của máy là 25, KHÔNG dùng.
- Channel đúng một chuỗi `vietsuper/host`; methods `getUserInfo` → map name "Lee", balance 1_250_000; `close` → đóng mini. Entrypoint luôn `"main"`, library `package:mini_flutter/main_<id>.dart`.
- Chuỗi tiếng Việt/emoji/giá tiền y hệt bản iOS: Đồ ăn 🍜 / Ví 👛 / Xem phim 🎬; app tên "ViệtSuper".
- Emulator: AVD `Medium_Phone_API_36.1` (boot bằng `~/Library/Android/sdk/emulator/emulator -avd Medium_Phone_API_36.1 &` nếu chưa chạy, đợi `adb wait-for-device` + boot hoàn tất). KHÔNG tạo AVD mới, KHÔNG đụng iOS simulator, KHÔNG kill process không phải của mình.
- Screenshot: `adb exec-out screencap -p > <path>`; thao tác `adb shell input tap X Y` (xem tọa độ bằng screenshot trước). Lưu vào `video/public/screens/ep32/`, `ep33/`.
- Commit message tiếng Việt `feat: …`, kết thúc bằng `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- `.gitignore` của vietsuper_android: `build/`, `.gradle/`, `local.properties`.

---

### Task 1: Host Compose + nhúng mini Đồ ăn chạy trên emulator

**Files:**
- Create: `demo-flutter-miniapp/vietsuper_android/settings.gradle`, `build.gradle`, `gradle.properties`, `.gitignore`, `local.properties` (KHÔNG commit — sdk.dir)
- Copy: `gradlew`, `gradlew.bat`, `gradle/wrapper/*` từ `demo-flutter-miniapp/mini_flutter/.android/`
- Create: `app/build.gradle`, `app/src/main/AndroidManifest.xml`
- Create: `app/src/main/java/com/vietsuper/host/{MiniApp.kt,MiniAppLauncher.kt,MiniActivity.kt,MainActivity.kt}`

**Interfaces:**
- Produces: `MiniAppLauncher.openMini(activity, mini)`; `data class MiniApp(id, name, emoji, library)`; danh sách `miniApps` (task này 1 phần tử food); lệnh build chuẩn `./gradlew :app:assembleDebug`.

- [ ] **Step 1: Chuẩn bị module + đọc version tham chiếu**

```bash
cd /Users/lee/Project/Apps/tutorial/demo-flutter-miniapp/mini_flutter && fvm flutter pub get
cat .android/build.gradle .android/settings.gradle | head -40
```
Ghi lại version AGP/Kotlin module dùng — nếu khác xa code Step 2 thì ĐỒNG BỘ theo module (ghi vào report).

- [ ] **Step 2: Viết project**

`settings.gradle`:
```groovy
rootProject.name = 'vietsuper_android'
include ':app'

// Cắm dãy căn hộ Flutter vào tòa nhà Android — tương đương podhelper bên iOS.
setBinding(new Binding([gradle: this]))
evaluate(new File(
  settingsDir.parentFile,
  'mini_flutter/.android/include_flutter.groovy'
))
```

`build.gradle` (root):
```groovy
buildscript {
    repositories { google(); mavenCentral() }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.7.3'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.0'
        classpath 'org.jetbrains.kotlin:compose-compiler-gradle-plugin:2.1.0'
    }
}
allprojects { repositories { google(); mavenCentral() } }
```

`gradle.properties`:
```properties
org.gradle.java.home=/Applications/Android Studio.app/Contents/jbr/Contents/Home
org.gradle.jvmargs=-Xmx4g
android.useAndroidX=true
```

`local.properties` (không commit):
```properties
sdk.dir=/Users/lee/Library/Android/sdk
flutter.sdk=/Users/lee/fvm/versions/3.38.10
```

`app/build.gradle`:
```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'org.jetbrains.kotlin.plugin.compose'

android {
    namespace 'com.vietsuper.host'
    compileSdk 36

    defaultConfig {
        applicationId 'com.vietsuper.host'
        minSdk 24
        targetSdk 36
        versionCode 1
        versionName '1.0'
    }
    buildFeatures { compose true }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = '17' }
}

dependencies {
    implementation project(':flutter')
    implementation platform('androidx.compose:compose-bom:2024.12.01')
    implementation 'androidx.activity:activity-compose:1.9.3'
    implementation 'androidx.compose.material3:material3'
}
```

`app/src/main/AndroidManifest.xml`:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <application android:label="ViệtSuper"
      android:theme="@android:style/Theme.Material.Light.NoActionBar">
    <activity android:name=".MainActivity" android:exported="true">
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>
    </activity>
    <activity android:name=".MiniActivity"
        android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
        android:hardwareAccelerated="true"
        android:windowSoftInputMode="adjustResize"/>
    <meta-data android:name="flutterEmbedding" android:value="2"/>
  </application>
</manifest>
```

`MiniApp.kt`:
```kotlin
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
```

`MiniAppLauncher.kt`:
```kotlin
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
```

`MiniActivity.kt`:
```kotlin
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
```

`MainActivity.kt`:
```kotlin
package com.vietsuper.host

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { MaterialTheme { HomeScreen { MiniAppLauncher.openMini(this, it) } } }
    }
}

@Composable
fun HomeScreen(onOpen: (MiniApp) -> Unit) {
    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Text("ViệtSuper 🇻🇳", style = MaterialTheme.typography.headlineMedium)
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.padding(top = 16.dp),
        ) {
            items(miniApps) { mini ->
                Card(onClick = { onOpen(mini) }, modifier = Modifier.fillMaxWidth()) {
                    Column(
                        Modifier.fillMaxWidth().padding(vertical = 24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        Text(mini.emoji, fontSize = 44.sp)
                        Text(mini.name, style = MaterialTheme.typography.titleMedium)
                    }
                }
            }
        }
    }
}
```

- [ ] **Step 3: Build** — `cd vietsuper_android && ./gradlew :app:assembleDebug` (timeout dài, lần đầu tải dependencies). Expected: BUILD SUCCESSFUL. Nếu fail vì version AGP/Kotlin/Compose: đồng bộ theo `mini_flutter/.android`, ghi report từng thay đổi.

- [ ] **Step 4: Emulator + cài + verify**

```bash
adb devices  # nếu trống: ~/Library/Android/sdk/emulator/emulator -avd Medium_Phone_API_36.1 (nền) rồi adb wait-for-device
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.vietsuper.host/.MainActivity
```
Verify bằng screenshot + `adb shell input tap`: lưới 1 card 🍜 → tap → mini Đồ ăn Flutter full-screen (AppBar "Đồ ăn ViệtSuper") → tap "Thêm" (tổng 45.000đ) → tap nút X (channel close → activity finish) → về lưới; thử cả nút Back Android. Chụp: `video/public/screens/ep32/android-host-grid-food-only.png`, `ep32/android-mini-food.png`, `ep32/android-mini-food-cart.png`.

- [ ] **Step 5: Commit** — `feat: host Kotlin Compose vietsuper_android nhúng mini Đồ ăn qua FlutterEngineGroup` (KHÔNG commit local.properties, build/, .gradle/).

---

### Task 2: Đủ 3 mini + verify channel + README + tags

**Files:**
- Modify: `app/src/main/java/com/vietsuper/host/MiniApp.kt` (thêm wallet + cinema)
- Modify: `demo-flutter-miniapp/README.md` (mục host Android: yêu cầu JDK 21, 3 lệnh build/cài/chạy, ghi chú local.properties)

**Interfaces:**
- Consumes: entrypoints `main_wallet.dart`, `main_cinema.dart` (đã có, không sửa).

- [ ] **Step 1: Thêm 2 phần tử**

```kotlin
    MiniApp("wallet", "Ví", "👛", "package:mini_flutter/main_wallet.dart"),
    MiniApp("cinema", "Xem phim", "🎬", "package:mini_flutter/main_cinema.dart"),
```

- [ ] **Step 2: Rebuild + regression cả 3 mini**

Mở Ví: PHẢI hiện "Lee" + "1.250.000đ" + chip "Số dư lấy từ app chủ (Swift)" (chuỗi chip nói "Swift" vì bản Dart hard-code — GHI NHẬN vào report, quyết định xử lý thuộc phase video, KHÔNG sửa Dart). Mở Xem phim: đặt vé Đào Phở và Piano → 90.000đ. Đóng/mở xen kẽ + Back không crash. Chụp: `ep33/android-host-grid-3-cards.png`, `ep33/android-mini-wallet-from-host.png`, `ep33/android-mini-cinema-ticket.png`.

- [ ] **Step 3: README + commit + tags**

README thêm mục "Host Android (vietsuper_android)". Commit `feat: host Android đủ 3 mini — channel Kotlin verified`. Tag: `git tag flutter-miniapp-android-1 <commit task 1>` và `flutter-miniapp-android-2 <commit task 2>`, push tags sau khi merge (controller làm).

---

## Sau plan này

Giai đoạn 2 (kịch bản ep32–ep33 + TTS + render + thumbnail + SEO + đăng nối playlist) lập plan riêng sau khi demo verified. Lưu ý chuyển tiếp: chip Ví ghi "(Swift)" trên Android — kịch bản ep33 phải xử lý khéo (thú nhận hard-code phía Dart, cơ hội dạy "đừng nêu tên nền tảng trong chuỗi UI"); PhoneScene khung iPhone vs ảnh Android cần kiểm ở phase 2.
