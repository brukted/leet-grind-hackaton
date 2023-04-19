package com.leetgrind.projectfinder.data.model.response

data class IdeaResponse(
    val author: ProfileResponse,
    val title: String,
    val tags: List<String>,
    val description: String,
    val github: String,
    val gigs: List<Any>?,
    val attachments: List<String>?,
)
