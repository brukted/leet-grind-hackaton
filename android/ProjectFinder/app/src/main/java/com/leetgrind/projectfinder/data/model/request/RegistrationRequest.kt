package com.leetgrind.projectfinder.data.model.request

data class RegistrationRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val github: String,
    val linkedIn: String,
    val cvLink: String,
)
