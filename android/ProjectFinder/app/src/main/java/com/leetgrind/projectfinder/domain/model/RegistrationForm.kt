package com.leetgrind.projectfinder.domain.model

data class RegistrationForm(
    val firstName: String,
    val lastName: String,
    val email: String,
    val telegramHandle: String,
    val password: String,
)
