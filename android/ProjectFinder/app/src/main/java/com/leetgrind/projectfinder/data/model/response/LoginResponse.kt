package com.leetgrind.projectfinder.data.model.response

data class LoginResponse(
    val user: ProfileResponse,
    val token: String
)
