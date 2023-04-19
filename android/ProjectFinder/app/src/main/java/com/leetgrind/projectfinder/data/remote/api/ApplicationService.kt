package com.leetgrind.projectfinder.data.remote.api

import com.leetgrind.projectfinder.common.JSendResponse
import com.leetgrind.projectfinder.data.model.request.ApplicationForm
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ApplicationService {

    @GET("me/applications")
    suspend fun getMyApplications(): Response<JSendResponse<List<ApplicationResponse>>>

    @POST("applications")
    suspend fun createApplication(@Body form: ApplicationForm): Response<JSendResponse<Void>>

    @GET("gigs/{gigId}/applications")
    suspend fun getApplicationsByGig(
        @Path("gigId") gigId: String
    ): Response<JSendResponse<List<ApplicationResponse>>>

    @DELETE("applications/{id}")
    suspend fun cancelApplication(@Path("id") id: String): Response<JSendResponse<Void>>

}