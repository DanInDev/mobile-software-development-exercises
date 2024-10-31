package com.example.l7_kotlin_jetpack_compose.data.user

class User(val name: String, val lastName: String, val interestNames: List<String>, val profilePicture: Int, val quote: String, val description: String) {
    fun getFullName(): String {
        return "$name $lastName"
    }
}