package com.example.myapplication

import android.graphics.Color.rgb
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Button
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.myapplication.ui.theme.MyApplicationTheme
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                var counter by rememberSaveable { mutableIntStateOf(0) }
                var interval by remember { mutableIntStateOf(1) }
                Scaffold(
                    topBar = {
                        CustomTopBar(
                            title = "Main Menu",
                            onNavigationClick = { /* Handle navigation click */ },
                            onSearchClick = { /* Handle search click */ },
                            onSettingsClick = { /* Handle settings click */ },
                        )
                    },
                    bottomBar = { CustomBottomBar(
                        resetValue = { counter = it },
                        currentInterval = interval,
                        decrementValue = { interval = it },
                        incrementValue = { interval = it }
                    ) },
                    modifier = Modifier.fillMaxSize()
                ) { contentPadding ->
                    Column (
                        modifier = Modifier
                            .padding(contentPadding)
                            .fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        CounterBundle(value = counter, newAssigned = { counter = it }, incrementInterval = interval)
                        Spacer(modifier = Modifier.height(16.dp)) // Add some space between the CounterBundle and the text.
                        Text(text = "Counter value: $counter")
                    }
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyApplicationTheme {
        Greeting("Android")
    }
}

@Composable
fun CounterBundle(value: Int, newAssigned: (Int) -> Unit, incrementInterval: Int = 1) {
    var pressed by remember { mutableStateOf(false) }

    val scale by animateFloatAsState(
        targetValue = if (pressed) incrementInterval+0.2f else 1f,
        animationSpec = tween(durationMillis = 200)
    )

    Column(
        modifier = Modifier
            .padding(16.dp)
            .scale(scale)
    ) {
        Button(
            enabled = !pressed,
            onClick = {
                pressed = true
                newAssigned(value + incrementInterval)
            }
        ) {
            Text("Increment")
        }
    }

    LaunchedEffect(pressed) {
        if (pressed) {
            delay(incrementInterval * 50L)
            pressed = false
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CustomTopBar(
    title: String,
    onNavigationClick: () -> Unit,
    onSearchClick: () -> Unit,
    onSettingsClick: () -> Unit
) {
    TopAppBar(
        title = {
            Text(
                text = title,
                color = Color.White,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        },
        navigationIcon = {
            IconButton(onClick = onNavigationClick) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back Icon")
            }
        },
        actions = {
            IconButton(onClick = onSearchClick) {
                Icon(Icons.Filled.Search, contentDescription = "Search Icon")
            }
            IconButton(onClick = onSettingsClick) {
                Icon(Icons.Filled.Settings, contentDescription = "Settings Icon")
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color(rgb(74,89,141)),
            navigationIconContentColor = Color.White,
            titleContentColor = Color.White,
            actionIconContentColor = Color.White,
        ),
        modifier = Modifier
            .alpha(1f)
            .shadow(4.dp, shape = RoundedCornerShape(0.dp))
    )
}

@Composable
fun CustomBottomBar(
    resetValue: (Int) -> Unit,
    currentInterval: Int,
    decrementValue: (Int) -> Unit,
    incrementValue: (Int) -> Unit
) {
    BottomAppBar (
        containerColor = Color(rgb(83,104,120)),
        contentColor = Color.White,

    ) {
        Button(onClick = { resetValue(0) }) {
            Text(text = "Reset")
        }
        Spacer(modifier = Modifier.weight(1f))
        Button(onClick = { incrementValue(currentInterval + 1) }) {
            Text(text = "+1")
        }
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(horizontal = 8.dp)
        ) {
            Text(text = "Current interval")
            Text(text = "$currentInterval")
        }
        Button(onClick = { decrementValue(currentInterval - 1) }) {
            Text(text = "-1")
        }
    }
}
