package com.leetgrind.projectfinder.data.repository

import com.leetgrind.projectfinder.common.networkBoundResource
import com.leetgrind.projectfinder.data.model.request.CreateGigForm
import com.leetgrind.projectfinder.data.remote.api.GigService
import javax.inject.Inject

class GigRepository @Inject constructor(private val gigService: GigService) {

    fun getGigsByIdea(ideaId: String) = networkBoundResource(
        fetch = {
            gigService.getGigsByIdea(ideaId).body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

    fun createGig(ideaId: String, form: CreateGigForm) = networkBoundResource(
        fetch = {
            gigService.createGig(ideaId, form).body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

}