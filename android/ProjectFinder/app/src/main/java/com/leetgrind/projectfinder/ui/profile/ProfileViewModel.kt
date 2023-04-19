package com.leetgrind.projectfinder.ui.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import androidx.lifecycle.viewModelScope
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.ProfileResponse
import com.leetgrind.projectfinder.data.repository.DefaultAuthRepository
import com.leetgrind.projectfinder.data.repository.ProfileRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val profileRepository: ProfileRepository,
    private val authRepository: DefaultAuthRepository
) : ViewModel() {

    fun getProfile(): LiveData<Resource<ProfileResponse>> =
        profileRepository.getProfile().asLiveData()

    fun logOut() {
        viewModelScope.launch {
            authRepository.logOut()
        }
    }
}