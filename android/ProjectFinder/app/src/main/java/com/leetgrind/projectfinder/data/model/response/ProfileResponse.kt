package com.leetgrind.projectfinder.data.model.response

import com.google.gson.annotations.SerializedName

data class ProfileResponse(
    @SerializedName("name")
    val firstName: String,
    @SerializedName("lastname")
    val lastName: String,
    val email: String,
    val password: String?,
    val phone: String?,
    val resume: String?,
    val linkedin: String,
    val github: String?,
    val telegram: String,
    val gigs: List<Any>?,
    val applications: List<Any>?
)