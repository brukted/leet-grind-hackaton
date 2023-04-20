package com.leetgrind.projectfinder.data.model.response

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class GigResponse(
    val id: String,
    val title: String,
    val description: String,
    val tags: List<String>,
    val idea: String?,
    val applications: List<String>?,
    val hasUserApplied: Boolean?,
) : Parcelable