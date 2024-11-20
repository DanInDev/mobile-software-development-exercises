package com.example.benchmark

import androidx.benchmark.macro.*
import androidx.benchmark.macro.junit4.MacrobenchmarkRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.uiautomator.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import androidx.test.platform.app.InstrumentationRegistry

@RunWith(AndroidJUnit4::class)
class SwitchProfileBenchmark {

    @get:Rule
    val benchmarkRule = MacrobenchmarkRule()

    @OptIn(ExperimentalMetricApi::class)
    @Test
    fun switchProfile10Times() = benchmarkRule.measureRepeated(
        packageName = "com.example.l7_kotlin_jetpack_compose", // Package name of our app. The same since Lesson 7 hehe...
        metrics = listOf(
            FrameTimingMetric(), // Measure frame times
            MemoryUsageMetric(
                MemoryUsageMetric.Mode.Last
            ), // Measure memory usage
            PowerMetric(
                PowerMetric.Type.Energy()
            ), // Measure power usage
        ),
        iterations = 1, // Run this benchmark only once
        setupBlock = {
            pressHome() // Go to the home screen
            startActivityAndWait() // Start the activity and wait for it to load
        }
    ) {
        val device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())

        val users = listOf("John", "Jane") // Names from our Go backend

        repeat(5) {
            for (user in users) {
                // Find the button by content description
                val userButton = device.findObject(
                    UiSelector().description("UserButton_$user")
                )
                if (userButton.exists()) {
                    userButton.clickAndWaitForNewWindow()
                    // Wait for the profile screen to load
                    device.waitForIdle(500)

                    // Go back to the previous screen
                    device.pressBack()
                    // Wait for the friendlist screen to load
                    device.waitForIdle(1000)
                } else {
                    throw AssertionError("Button for user $user not found")
                }
            }
        }
    }
}