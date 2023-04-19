package com.leetgrind.projectfinder.data.remote.api

import com.leetgrind.projectfinder.common.JSendResponse
import com.leetgrind.projectfinder.data.model.request.CreateGigForm
import com.leetgrind.projectfinder.data.model.response.GigResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface GigService {

    @POST("ideas/{ideaId}/gigs")
    suspend fun createGig(
        @Path("ideaId") ideaId: String,
        @Body form: CreateGigForm
    ): Response<JSendResponse<Void>>

    @GET("ideas/{ideaId}/gigs")
    suspend fun getGigsByIdea(
        @Path("ideaId") ideaId: String
    ): Response<JSendResponse<List<GigResponse>>>



}