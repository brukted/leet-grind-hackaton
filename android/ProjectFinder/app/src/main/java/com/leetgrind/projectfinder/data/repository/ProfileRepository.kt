package com.leetgrind.projectfinder.data.repository

import com.leetgrind.projectfinder.common.networkBoundResource
import com.leetgrind.projectfinder.data.remote.api.ProfileService
import javax.inject.Inject

class ProfileRepository @Inject constructor(private val profileService: ProfileService) {

        fun getProfile() = networkBoundResource(
            fetch = {
                profileService.getProfile().body()!!
            },
            mapFetchedValue = {
                it.data!!
            }
        )

        fun getProfile(id: String) = networkBoundResource(
            fetch = {
                profileService.getProfile(id).body()!!
            },
            mapFetchedValue = {
                it.data!!
            }
        )

}