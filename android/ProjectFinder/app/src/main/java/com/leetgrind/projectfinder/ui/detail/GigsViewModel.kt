package com.leetgrind.projectfinder.ui.detail

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.GigResponse
import com.leetgrind.projectfinder.data.repository.GigRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class GigsViewModel @Inject constructor(
    private val repository: GigRepository
) : ViewModel() {

    fun getGigsByIdea(ideaId: String): LiveData<Resource<List<GigResponse>>> =
        repository.getGigsByIdea(ideaId).asLiveData()

}