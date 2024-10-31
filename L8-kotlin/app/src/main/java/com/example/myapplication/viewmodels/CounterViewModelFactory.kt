package com.example.myapplication.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class CounterViewModelFactory(private val initialValue: Int) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CounterViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return CounterViewModel(initialValue) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}