package com.leetgrind.projectfinder.data.mapper

import com.leetgrind.projectfinder.data.model.request.RegistrationRequest
import com.leetgrind.projectfinder.domain.model.RegistrationForm

fun RegistrationForm.toRegistrationRequest(): RegistrationRequest =
    RegistrationRequest(
        firstName,
        lastName,
        email,
        password,
        telegramHandle
    )