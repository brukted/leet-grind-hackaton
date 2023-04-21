package com.leetgrind.projectfinder.data.model.request

data class RegistrationRequest(
    val name: String,
    val lastname: String,
    val email: String,
    val password: String,
    val telegram: String,
)
