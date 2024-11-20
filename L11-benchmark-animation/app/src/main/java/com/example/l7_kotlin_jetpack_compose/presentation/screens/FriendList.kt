package com.example.l7_kotlin_jetpack_compose.presentation.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.l7_kotlin_jetpack_compose.R
import com.example.l7_kotlin_jetpack_compose.data.user.UserProfileViewModel
import com.example.l7_kotlin_jetpack_compose.presentation.components.Picture
import com.example.l7_kotlin_jetpack_compose.presentation.components.Quote

@Composable
fun FriendList(userVM: UserProfileViewModel, navigation: NavController) {
    val context = LocalContext.current
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ){
        Column (
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top,
            modifier = Modifier
                .padding(16.dp)
        ){
            Text(
                text = context.getString(R.string.friends),
                style = MaterialTheme.typography.headlineLarge
            )
            userVM.getAllUsers().forEach{ user ->
                Button(
                    onClick = {
                        userVM.setUser(user.name)
                        navigation.navigate("Profile")
                    },
                    modifier = Modifier.semantics { contentDescription = "UserButton_${user.name}" }
                ){
                    Row(
                        modifier = Modifier
                            .height(125.dp)
                            .clip(MaterialTheme.shapes.small),
                        verticalAlignment = Alignment.CenterVertically,
                    ){
                        Column(
                            verticalArrangement = Arrangement.Center,
                            horizontalAlignment = Alignment.CenterHorizontally
                        ){
                            Picture(user.profilePicture, 75, 75)
                            Text(text = user.getFullName())
                        }
                        Quote(quote = user.quote)
                    }
                }
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}