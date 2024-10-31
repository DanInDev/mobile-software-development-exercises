package com.example.l7_kotlin_jetpack_compose.presentation.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.modifier.modifierLocalConsumer
import androidx.compose.ui.unit.dp
import com.example.l7_kotlin_jetpack_compose.data.interests.Interest

@Composable
fun Interest(interest: Interest) {
    Column(
        horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally,
        verticalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceEvenly,
        modifier = Modifier.width(100.dp)
            .height(100.dp)
            .border(2.dp, MaterialTheme.colorScheme.primary, RoundedCornerShape(20.dp))
            .background(
                MaterialTheme.colorScheme.secondary,
                RoundedCornerShape(20.dp))

    )
    {
        println("interest color: " + MaterialTheme.colorScheme.secondary)
        println("expected interest color: " + Color(0xFFEFB8C8).toString())
        Text(text = interest.icon)
        Text(
            text = interest.name,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center

        )
    }
}
