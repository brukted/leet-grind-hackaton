package com.leetgrind.projectfinder.ui.detail

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.request.ApplicationForm
import com.leetgrind.projectfinder.data.model.request.CreateGigForm
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import com.leetgrind.projectfinder.data.model.response.GigResponse
import com.leetgrind.projectfinder.data.repository.ApplicationRepository
import com.leetgrind.projectfinder.data.repository.GigRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class GigsViewModel @Inject constructor(
    private val gigRepository: GigRepository,
    private val applicationRepository: ApplicationRepository
) : ViewModel() {

    fun getGigsByIdea(ideaId: String): LiveData<Resource<List<GigResponse>>> =
        gigRepository.getGigsByIdea(ideaId).asLiveData()

    fun getApplicationsByGig(gigId: String): LiveData<Resource<List<ApplicationResponse>>> =
        applicationRepository.getApplicationsByGig(gigId).asLiveData()

    fun createGig(ideaId: String, form: CreateGigForm): LiveData<Resource<GigResponse>> =
        gigRepository.createGig(ideaId, form).asLiveData()

    fun createApplication(form: ApplicationForm): LiveData<Resource<ApplicationResponse>> =
        applicationRepository.createApplication(form).asLiveData()

}