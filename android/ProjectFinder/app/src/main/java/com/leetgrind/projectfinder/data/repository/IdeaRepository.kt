package com.leetgrind.projectfinder.data.repository

import com.leetgrind.projectfinder.common.networkBoundResource
import com.leetgrind.projectfinder.data.model.request.CreateIdeaForm
import com.leetgrind.projectfinder.data.remote.api.IdeaService
import javax.inject.Inject

class IdeaRepository @Inject constructor(private val ideaService: IdeaService) {

    fun getAllIdeas() = networkBoundResource(
        fetch = {
            ideaService.getAllIdeas().body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

    fun getMyIdeas() = networkBoundResource(
        fetch = {
            ideaService.getMyIdeas().body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

    fun createIdea(form: CreateIdeaForm) = networkBoundResource(
        fetch = {
            ideaService.createIdea(form).body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

}