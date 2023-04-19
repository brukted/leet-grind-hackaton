package com.leetgrind.projectfinder.data.remote.api

import com.leetgrind.projectfinder.common.JSendResponse
import com.leetgrind.projectfinder.data.model.request.CreateIdeaForm
import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface IdeaService {

    @GET("ideas")
    suspend fun getAllIdeas(): Response<JSendResponse<List<IdeaResponse>>>

    @GET("me/ideas")
    suspend fun getMyIdeas(): Response<JSendResponse<List<IdeaResponse>>>

    @POST("ideas")
    suspend fun createIdea(@Body form: CreateIdeaForm): Response<JSendResponse<Void>>

}