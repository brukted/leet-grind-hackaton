package com.leetgrind.projectfinder.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import com.leetgrind.projectfinder.data.model.response.ProfileResponse
import com.leetgrind.projectfinder.data.repository.IdeaRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val repository: IdeaRepository
) : ViewModel() {

    fun getAllIdeas(): LiveData<Resource<List<IdeaResponse>>> =
        repository.getAllIdeas().asLiveData()

}