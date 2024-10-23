package com.example.l7_kotlin_jetpack_compose.presentation.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp

@Composable
fun Description(description: String) {
    Column(
        modifier = Modifier
            .defaultMinSize(minHeight = 60.dp, minWidth = 40.dp)
            .padding(0.dp)
            .clip(
                RoundedCornerShape(16.dp)
            )
            .background(Color(0xFFE0E0E0))
            .padding(16.dp)



    ) {
        Text(text = "Description", style = MaterialTheme.typography.bodySmall)
        HorizontalDivider(
            color = Color(0xFFBDBDBD),
            thickness = 1.dp,
            modifier = Modifier.padding(vertical = 8.dp)
        )
        Text(
            text = description,
            style = MaterialTheme.typography.bodySmall
        )
    }
}