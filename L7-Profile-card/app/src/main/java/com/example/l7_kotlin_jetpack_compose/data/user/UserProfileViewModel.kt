package com.example.l7_kotlin_jetpack_compose.data.user

import androidx.lifecycle.ViewModel

class UserProfileViewModel(repository: UserRepository) : ViewModel() {

    private val userRepository = repository
    private var currentUser = User("Placeholder", "User", listOf("Cool interest"), 1, "no user selected"
        , "no user selected")

    fun getCurrent() = this.currentUser

    fun getUser(name: String){
        currentUser = userRepository.getUser(name)
    }

}