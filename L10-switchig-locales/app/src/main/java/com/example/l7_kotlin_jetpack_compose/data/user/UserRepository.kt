package com.example.l7_kotlin_jetpack_compose.data.user

import com.example.l7_kotlin_jetpack_compose.R
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query

class UserRepository {
    private val userClient: UserApi = RetroFitUser.client.create(UserApi::class.java)

    fun getUser(name: String): User? {
        val call = userClient.getUser(name)
        val response = call.execute()
        val user = response.body()
        println("From name: $name got user: $user")
        if (user != null)
            return user
        return null
    }

    fun getAllUsers(): List<User> {
        val call = userClient.getUsers()
        val response = call.execute()
        val users = response.body()
        println("Got users: $users, names: ${users?.map { it.name }}")
        if (users != null)
            return  users
        return emptyList()
    }
}

private class RetroFitUser{
    companion object {
        private val baseUrl = "http://10.0.2.2:8080/"
        init {
            println("Base URL: $baseUrl")
        }
        val client = Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(baseUrl)
            .build()
    }
}

interface UserApi {
    @GET("people")
    fun getUsers(): Call<List<User>>

    @GET("person")
    fun getUser(
        @Query("name") name: String
    ): Call<User>
}