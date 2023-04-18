package com.leetgrind.projectfinder.ui.authentication

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.repository.DefaultAuthRepository
import com.leetgrind.projectfinder.domain.model.RegistrationForm
import com.leetgrind.projectfinder.domain.model.ValidationResult
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.transform
import javax.inject.Inject

@HiltViewModel
class RegisterViewModel @Inject constructor(
    private val authRepository: DefaultAuthRepository,
    application: Application
) : AndroidViewModel(application) {
    val firstName: MutableLiveData<String> = MutableLiveData("")
    val lastName: MutableLiveData<String> = MutableLiveData("")
    val email: MutableLiveData<String> = MutableLiveData("")
    val github: MutableLiveData<String> = MutableLiveData("")
    val linkedIn: MutableLiveData<String> = MutableLiveData("")
    val cvLink: MutableLiveData<String> = MutableLiveData("")

    val firstNameError = MediatorLiveData<ValidationResult>().apply {
        addSource(firstName) {
            value = validateName(it)
        }
    }

    val lastNameError = MediatorLiveData<ValidationResult>().apply {
        addSource(lastName) {
            value = validateName(it)
        }
    }

    val emailError = MediatorLiveData<ValidationResult>().apply {
        addSource(email) {
            value = validateEmail(it)
        }
    }

    val githubError = MediatorLiveData<ValidationResult>().apply {
        addSource(github) {
            value = validateGithub(it)
        }
    }

    val linkedInError = MediatorLiveData<ValidationResult>().apply {
        addSource(linkedIn) {
            value = validateLinkedIn(it)
        }
    }

    val cvLinkError = MediatorLiveData<ValidationResult>().apply {
        addSource(cvLink) {
            value = validateCvLink(it)
        }
    }

    val isFormValid = MediatorLiveData<Boolean>().apply {
        addSource(firstNameError) {
            value = it.isSuccessful
        }
        addSource(lastNameError) {
            value = it.isSuccessful
        }
        addSource(emailError) {
            value = it.isSuccessful
        }
        addSource(githubError) {
            value = it.isSuccessful
        }
        addSource(linkedInError) {
            value = it.isSuccessful
        }
        addSource(cvLinkError) {
            value = it.isSuccessful
        }
    }

    private fun getRegistrationForm() = RegistrationForm(
        firstName = firstName.value!!,
        lastName = lastName.value!!,
        email = email.value!!,
        github = github.value!!,
        linkedIn = linkedIn.value!!,
        cvLink = cvLink.value!!
    )

    fun register(): Flow<Resource<Unit>> = flow {
        val registrationForm = getRegistrationForm()
        authRepository.register(registrationForm)
            .transform<Resource<Unit>, Resource<Unit>> { resource ->
                when (resource) {
                    is Resource.Loading -> this@flow.emit(Resource.Loading())
                    is Resource.Success -> this@flow.emit(Resource.Success(data = Unit))
                    is Resource.Error -> {
                        this@flow.emit(Resource.Error(message = resource.message ?: "Unknown error"))
                    }
                }
            }.collect()
    }



}