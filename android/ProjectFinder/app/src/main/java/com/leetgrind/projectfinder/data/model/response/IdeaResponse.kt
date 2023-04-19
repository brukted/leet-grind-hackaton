package com.leetgrind.projectfinder.data.model.response

import com.google.gson.annotations.SerializedName

data class IdeaResponse(
    @SerializedName("authorModel")
    val author: ProfileResponse,
    val title: String,
    val tags: List<String>,
    val description: String,
    val github: String,
    val gigs: List<Any>?,
    val attachments: List<String>?,
)
