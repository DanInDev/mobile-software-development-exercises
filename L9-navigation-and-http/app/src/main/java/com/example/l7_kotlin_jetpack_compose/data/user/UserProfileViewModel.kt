package com.example.l7_kotlin_jetpack_compose.data.user

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.l7_kotlin_jetpack_compose.R
import kotlinx.coroutines.launch

class UserProfileViewModel(repository: UserRepository) : ViewModel() {
    private val userRepository = repository
    private var currentUser = User("Placeholder", "User", listOf("Cool interest"), 1, "no user selected",
        "no user selected")

    fun getCurrent() = this.currentUser

    fun setUser(name: String) {
        viewModelScope.launch {
            val rawUser = userRepository.getUser(name)
            if (rawUser != null) {
                currentUser = User(
                    rawUser.name,
                    rawUser.lastName,
                    rawUser.interestNames,
                    mapProfilePicture(rawUser.profilePicture),
                    rawUser.quote,
                    rawUser.description
                )
            }
        }
    }

    fun getAllUsers(): List<User> {
        val users: MutableList<User> = mutableListOf()
        viewModelScope.launch {
            val rawUsers = userRepository.getAllUsers()
            if (rawUsers.isEmpty()) {
                return@launch
            }
            for (rawUser in rawUsers) {
                users += User(
                    rawUser.name,
                    rawUser.lastName,
                    rawUser.interestNames,
                    mapProfilePicture(rawUser.profilePicture),
                    rawUser.quote,
                    rawUser.description
                )
            }
        }
        return users
    }

    private fun mapProfilePicture(profilePicture: Int): Int {
        return when (profilePicture) {
        1 -> R.drawable.cool_image
        else -> {
            R.drawable.cool_image
            }
        }
    }
}