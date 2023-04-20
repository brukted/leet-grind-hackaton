package com.leetgrind.projectfinder.domain.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Idea(
    val id: String,
    val authorName: String,
    val title: String,
    val tags: List<String>,
    val description: String,
    val github: String,
    val gigs: List<String>?,
) : Parcelable