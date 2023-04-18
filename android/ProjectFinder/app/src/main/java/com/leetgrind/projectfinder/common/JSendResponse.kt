package com.leetgrind.projectfinder.common

data class JSendResponse<Data>(
    val data: Data?,
    val message: String?,
    val results: Int?,
    val status: Status
) {
    enum class Status { SUCCESS, FAIL, ERROR }
}