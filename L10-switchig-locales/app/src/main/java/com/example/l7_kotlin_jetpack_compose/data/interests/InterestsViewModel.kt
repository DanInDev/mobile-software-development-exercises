package com.example.l7_kotlin_jetpack_compose.data.interests

class InterestsViewModel (
    private val interestsRepository: InterestsRepository
) {
    fun getInterests() = interestsRepository.getInterests()
}