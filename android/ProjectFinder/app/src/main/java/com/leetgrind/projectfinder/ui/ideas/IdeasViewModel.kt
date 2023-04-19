package com.leetgrind.projectfinder.ui.ideas

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import com.leetgrind.projectfinder.data.repository.ApplicationRepository
import com.leetgrind.projectfinder.data.repository.IdeaRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class IdeasViewModel @Inject constructor(
    private val repository: IdeaRepository
) : ViewModel() {

    fun getMyIdeas(): LiveData<Resource<List<IdeaResponse>>> =
        repository.getMyIdeas().asLiveData()

}