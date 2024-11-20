package com.example.l7_kotlin_jetpack_compose.presentation.components

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp


@Composable
fun Quote(quote: String) {
    Box (
        modifier = Modifier.padding(8.dp)
    ) {
        Text(
            text = "\""+quote+"\"",
            style = MaterialTheme.typography.bodyLarge
        )
    }
}