package com.leetgrind.projectfinder.data.repository

import android.content.Context
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.common.buildResource
import com.leetgrind.projectfinder.data.local.prefs.LocalPrefStore
import com.leetgrind.projectfinder.data.mapper.toLoginRequest
import com.leetgrind.projectfinder.data.mapper.toRegistrationRequest
import com.leetgrind.projectfinder.data.remote.api.RegistrationService
import com.leetgrind.projectfinder.domain.model.LoginForm
import com.leetgrind.projectfinder.domain.model.RegistrationForm
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

class DefaultAuthRepository @Inject constructor(
    private val context: Context,
    private val registrationService: RegistrationService,
    private val ioDispatcher: CoroutineDispatcher,
    private val localPrefStore: LocalPrefStore,
) {
    suspend fun register(registrationForm: RegistrationForm): Flow<Resource<Unit>> =
        flow {
            emit(Resource.Loading())

            val registrationRequest = registrationForm.toRegistrationRequest()
            val result = buildResource {
                registrationService.signUp(registrationRequest)
                return@buildResource
            }
            emit(result)
        }.flowOn(ioDispatcher)

    suspend fun login(loginForm: LoginForm): Flow<Resource<Unit>> =
        flow {
            emit(Resource.Loading())

            val loginRequest = loginForm.toLoginRequest()
            val result = buildResource {
                val response = registrationService.login(loginRequest)

                response.body()!!.apply {
                    localPrefStore.setAuthToken(this.data!!.token)
                }
                return@buildResource
            }
            emit(result)
        }.flowOn(ioDispatcher)

    suspend fun getAuthToken() = localPrefStore.getAuthToken()

    suspend fun logOut() = localPrefStore.removeToken()
}