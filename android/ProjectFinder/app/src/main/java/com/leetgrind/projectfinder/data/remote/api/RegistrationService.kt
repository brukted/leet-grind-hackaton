package com.leetgrind.projectfinder.data.remote.api

import com.leetgrind.projectfinder.data.model.request.RegistrationRequest
import retrofit2.http.Body
import retrofit2.http.POST

interface RegistrationService {
    @POST("api/v1/signup")
    suspend fun signUp(@Body registrationRequest: RegistrationRequest)

    @POST("api/v1/login")
    suspend fun login(@Body registrationRequest: RegistrationRequest)
}