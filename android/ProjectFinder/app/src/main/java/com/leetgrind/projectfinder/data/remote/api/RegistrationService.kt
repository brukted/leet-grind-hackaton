package com.leetgrind.projectfinder.data.remote.api

import com.leetgrind.projectfinder.common.JSendResponse
import com.leetgrind.projectfinder.data.model.request.LoginRequest
import com.leetgrind.projectfinder.data.model.request.RegistrationRequest
import com.leetgrind.projectfinder.data.model.response.LoginResponse
import com.leetgrind.projectfinder.data.model.response.RegistrationResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface RegistrationService {
    @POST("api/v1/signup")
    suspend fun signUp(@Body registrationRequest: RegistrationRequest): Response<JSendResponse<RegistrationResponse>>

    @POST("api/v1/login")
    suspend fun login(@Body loginRequest: LoginRequest ): Response<JSendResponse<LoginResponse>>
}