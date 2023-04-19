package com.leetgrind.projectfinder.data.mapper

import com.leetgrind.projectfinder.data.model.request.LoginRequest
import com.leetgrind.projectfinder.domain.model.LoginForm

fun LoginForm.toLoginRequest() = LoginRequest(email = email, password = password)