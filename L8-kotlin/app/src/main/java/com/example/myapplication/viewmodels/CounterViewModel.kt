package com.example.myapplication.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class CounterViewModel (private var initial: Int) : ViewModel(){
    private val _currentValue = MutableLiveData(initial)
    val currentValue: LiveData<Int> get() = _currentValue

    fun getCurrent(): Int = _currentValue.value ?: 0

    fun reset(value: Int) {
        _currentValue.value = value
    }
}