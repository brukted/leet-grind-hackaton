package com.leetgrind.projectfinder.data.model.response

import com.google.gson.annotations.SerializedName

data class ApplicationResponse(
    val id: String,
    @SerializedName("gigModel")
    val gig: GigResponse,
    @SerializedName("applicantModel")
    val applicant: ProfileResponse,
    val note: String,
    val status: ApplicationStatus,
)

enum class ApplicationStatus(text: String) {
    @SerializedName("pending")
    PENDING("pending"),
    @SerializedName("accepted")
    ACCEPTED("accepted"),
    @SerializedName("rejected")
    REJECTED("rejected")
}