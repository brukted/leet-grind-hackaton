package com.leetgrind.projectfinder.data.model.request

data class CreateGigForm(
    val title: String,
    val description: String,
    val tags: List<String>,
)
