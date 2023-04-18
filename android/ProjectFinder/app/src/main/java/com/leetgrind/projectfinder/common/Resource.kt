package com.leetgrind.projectfinder.common

sealed class Resource<T>(val value: T? = null, val message: String? = null) {

    class Loading<T> : Resource<T>()

    class Success<T>(data: T) : Resource<T>(data)

    class Error<T>(message: String?, value: T? = null) : Resource<T>(value, message) {
        val errMsg: String
            get() = super.message ?: "Unknown Error"
    }

}
