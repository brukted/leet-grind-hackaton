package com.leetgrind.projectfinder.common.exceptions

import java.io.IOException

class NetworkException : IOException() {
    override val message: String
        get() = "No Internet Connection"
}