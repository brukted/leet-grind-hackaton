package com.leetgrind.projectfinder.data.model.response

import com.google.gson.annotations.SerializedName

data class IdeaResponse(
    val id: String,
    @SerializedName("authorModel")
    val author: ProfileResponse,
    val title: String,
    val tags: List<String>,
    val description: String,
    val github: String,
    val gigs: List<String>?,
    val attachments: List<String>?,
)
