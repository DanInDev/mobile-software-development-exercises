package com.example.l7_kotlin_jetpack_compose.presentation.components
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage

@Composable
fun Picture(identifier: Int, height: Int = 350, width: Int = 300){
    var isVisible by remember { mutableStateOf(false) }
    val scale by animateFloatAsState(
        // 1. Render first frame with is visible set to false (0f)
        // 3. Animate the scale from 0 to 1
        targetValue = if (isVisible) 1f else 0f,
        // 4. Animate the scale over 500 milliseconds
        animationSpec = tween(durationMillis = 500), label = ""
    )

    // Listen to "unit" to trigger the LaunchedEffect, which is when the composable is first composed
    LaunchedEffect(Unit) {
        //2. Set isVisible to true to trigger the animation
        isVisible = true
    }


    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier.scale(scale)
    ) {
        AsyncImage(
            model = identifier,
            contentDescription = "Profile Picture",
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .height(height.dp)
                .width(width.dp)
                .clip(CircleShape)
                .border(2.dp, MaterialTheme.colorScheme.primary, CircleShape)
        )
    }
}
