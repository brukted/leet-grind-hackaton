package com.leetgrind.projectfinder.data.model.response

data class GigResponse(
    val title: String,
    val description: String,
    val tags: List<String>,
    val idea: Any?,
    val applications: List<Any>?,
)
