package com.example.l7_kotlin_jetpack_compose.app

import android.os.Bundle
import android.os.StrictMode
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.l7_kotlin_jetpack_compose.data.interests.InterestsRepository
import com.example.l7_kotlin_jetpack_compose.data.interests.InterestsViewModel
import com.example.l7_kotlin_jetpack_compose.data.user.UserProfileViewModel
import com.example.l7_kotlin_jetpack_compose.data.user.UserRepository
import com.example.l7_kotlin_jetpack_compose.presentation.screens.FriendList
import com.example.l7_kotlin_jetpack_compose.presentation.screens.Profile
import com.example.l7_kotlin_jetpack_compose.presentation.theme.L7kotlinjetpackcomposeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val user = UserProfileViewModel(
            UserRepository())
        val interests = InterestsViewModel(
            InterestsRepository())
        // Since I am poor and can't afford a certificate, I have to use this to allow network traffic
        // Plz gib coffee :)
        StrictMode.setThreadPolicy(StrictMode.ThreadPolicy.Builder().permitAll().build())
        setContent {
            L7kotlinjetpackcomposeTheme (
                dynamicColor = false
            ) {
                val navController = rememberNavController()
                NavHost(navController = navController, startDestination = "FriendList") {
                    composable("Profile") {
                        Profile(user = user, interests = interests, navigation = navController)
                    }
                    composable("FriendList") {
                        FriendList(userVM = user, navigation = navController)
                    }
                }
            }
        }
    }
}
