package com.leetgrind.projectfinder.data.remote.api

import com.leetgrind.projectfinder.common.JSendResponse
import com.leetgrind.projectfinder.data.model.response.ProfileResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface ProfileService {

    @GET("profile")
    suspend fun getProfile(): Response<JSendResponse<ProfileResponse>>

    @GET("profile/{id}")
    suspend fun getProfile(@Path("id") id: String): Response<JSendResponse<ProfileResponse>>

}