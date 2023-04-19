package com.leetgrind.projectfinder.ui.applications

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import com.leetgrind.projectfinder.data.repository.ApplicationRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ApplicationsViewModel @Inject constructor(
    private val repository: ApplicationRepository
) : ViewModel() {

    fun getMyApplications(): LiveData<Resource<List<ApplicationResponse>>> =
        repository.getMyApplications().asLiveData()

}