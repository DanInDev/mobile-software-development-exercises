package com.example.l7_kotlin_jetpack_compose.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.l7_kotlin_jetpack_compose.data.interests.InterestsRepository
import com.example.l7_kotlin_jetpack_compose.data.interests.InterestsViewModel
import com.example.l7_kotlin_jetpack_compose.data.user.UserProfileViewModel
import com.example.l7_kotlin_jetpack_compose.data.user.UserRepository
import com.example.l7_kotlin_jetpack_compose.presentation.components.Description
import com.example.l7_kotlin_jetpack_compose.presentation.components.Interest
import com.example.l7_kotlin_jetpack_compose.presentation.components.Picture
import com.example.l7_kotlin_jetpack_compose.presentation.components.Quote
import com.example.l7_kotlin_jetpack_compose.presentation.theme.L7kotlinjetpackcomposeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val user = UserProfileViewModel(
            UserRepository())

        user.getUser("John")
        println("user: " + user.getCurrent().name)

        val interests = InterestsViewModel(
            InterestsRepository())

        super.onCreate(savedInstanceState)

        println("interests: " + interests.getInterests())
        println("user interests: " + user.getCurrent().interestNames)

        setContent {
            L7kotlinjetpackcomposeTheme (
                dynamicColor = false
            ) {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = androidx.compose.foundation.layout.Arrangement.SpaceEvenly,
                            modifier = Modifier.padding(16.dp)
                            )
                    {
                        Text(text = user.getCurrent().getFullName())
                        Picture(user.getCurrent().profilePicture)
                        Row {
                            for (interest in user.getCurrent().interestNames) {
                                println("interet: " + interest)
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
                        Quote(quote = user.getCurrent().quote)
                        Description(description = user.getCurrent().description)
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
    L7kotlinjetpackcomposeTheme {
        Greeting("L7 kotlin")
    }
}