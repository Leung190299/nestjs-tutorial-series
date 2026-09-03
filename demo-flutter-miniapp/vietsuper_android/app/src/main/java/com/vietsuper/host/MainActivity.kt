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
