package com.example.l7_kotlin_jetpack_compose.presentation.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.l7_kotlin_jetpack_compose.R
import com.example.l7_kotlin_jetpack_compose.data.interests.InterestsViewModel
import com.example.l7_kotlin_jetpack_compose.data.user.User
import com.example.l7_kotlin_jetpack_compose.data.user.UserProfileViewModel
import com.example.l7_kotlin_jetpack_compose.presentation.components.Description
import com.example.l7_kotlin_jetpack_compose.presentation.components.Interest
import com.example.l7_kotlin_jetpack_compose.presentation.components.Picture
import com.example.l7_kotlin_jetpack_compose.presentation.components.Quote

@Composable
fun Profile(user: UserProfileViewModel, interests: InterestsViewModel, navigation: NavController) {
    val context = LocalContext.current
    Scaffold(
        modifier = Modifier.fillMaxSize(),
    ) { contentPadding ->
        Box {
            FloatingActionButton(
                onClick = { navigation.popBackStack() },
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .padding(16.dp)
            ){
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            }
        }
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceEvenly,
            modifier = Modifier
                .padding(contentPadding)
                .fillMaxSize()
        ){
            Text(text = user.getCurrent().getFullName())
            Picture(user.getCurrent().profilePicture)
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceEvenly,
                modifier = Modifier
                    .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.3f),
                        RoundedCornerShape(32.dp))
                    .padding(16.dp)

            )
            {
                Text(
                    text = context.getString(R.string.interests),
                )
                Row {
                    for (interest in user.getCurrent().interestNames) {
                        println("interest: $interest")
                        interests.getInterests().find { it.name == interest }?.let {
                            println("interest found: " + it.name)
                            Interest(interest = it)
                            if (interest != user.getCurrent().interestNames.last()) {
                                VerticalDivider(
                                    modifier = Modifier
                                        .height(100.dp)
                                        .padding(
                                            start = 8.dp,
                                            end = 8.dp
                                        )
                                )
                            }
                        }
                    }
                }
            }
            Quote(quote = user.getCurrent().quote)
            Description(description = user.getCurrent().description)
        }
    }
}
