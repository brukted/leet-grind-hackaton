package com.leetgrind.projectfinder.data.model.request

data class CreateIdeaForm(
    val title: String,
    val description: String,
    val tags: List<String>,
    val github: String,
)
