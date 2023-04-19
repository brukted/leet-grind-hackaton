package com.leetgrind.projectfinder.ui.authentication.login

import android.app.Application
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.repository.DefaultAuthRepository
import com.leetgrind.projectfinder.domain.model.LoginForm
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.transform
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val authRepository: DefaultAuthRepository,
    application: Application
) : ViewModel() {
    val email: MutableLiveData<String> = MutableLiveData("")
    val password: MutableLiveData<String> = MutableLiveData("")


    fun login(): Flow<Resource<Unit>> = flow {

        val form = LoginForm(email = email.value!!, password = password.value!!)

        authRepository.login(form)
            .transform<Resource<Unit>, Resource<Unit>> { resource ->
                when (resource) {
                    is Resource.Loading -> this@flow.emit(Resource.Loading())
                    is Resource.Success -> {
                        this@flow.emit(Resource.Success(data = Unit))
                    }
                    is Resource.Error -> {
                        this@flow.emit(Resource.Error(resource.errMsg))
                    }
                }
            }.collect()
    }


}