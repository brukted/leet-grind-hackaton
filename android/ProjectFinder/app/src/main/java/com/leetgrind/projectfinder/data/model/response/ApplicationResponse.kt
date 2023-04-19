package com.leetgrind.projectfinder.data.model.response

import com.google.gson.annotations.SerializedName

data class ApplicationResponse(
    @SerializedName("gigModel")
    val gig: GigResponse,
    @SerializedName("applicantModel")
    val applicant: ProfileResponse,
    val note: String,
    val status: ApplicationStatus,
)

enum class ApplicationStatus {
    @SerializedName("pending")
    PENDING,
    @SerializedName("accepted")
    ACCEPTED,
    @SerializedName("rejected")
    REJECTED
}