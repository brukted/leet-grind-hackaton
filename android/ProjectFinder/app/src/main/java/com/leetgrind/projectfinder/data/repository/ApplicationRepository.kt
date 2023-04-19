package com.leetgrind.projectfinder.data.repository

import com.leetgrind.projectfinder.common.networkBoundResource
import com.leetgrind.projectfinder.data.model.request.ApplicationForm
import com.leetgrind.projectfinder.data.remote.api.ApplicationService
import javax.inject.Inject

class ApplicationRepository @Inject constructor(private val applicationService: ApplicationService) {

    fun getMyApplications() = networkBoundResource(
        fetch = {
            applicationService.getMyApplications().body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

    fun createApplication(form: ApplicationForm) = networkBoundResource(
        fetch = {
            applicationService.createApplication(form).body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

    fun getApplicationsByGig(gigId: String) = networkBoundResource(
        fetch = {
            applicationService.getApplicationsByGig(gigId).body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

    fun cancelApplication(id: String) = networkBoundResource(
        fetch = {
            applicationService.cancelApplication(id).body()!!
        },
        mapFetchedValue = {
            it.data!!
        }
    )

}