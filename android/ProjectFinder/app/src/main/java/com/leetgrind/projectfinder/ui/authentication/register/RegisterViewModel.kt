package com.leetgrind.projectfinder.ui.authentication.register

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.repository.DefaultAuthRepository
import com.leetgrind.projectfinder.domain.model.RegistrationForm
import com.leetgrind.projectfinder.domain.model.ValidationResult
import com.leetgrind.projectfinder.domain.model.validateCvLink
import com.leetgrind.projectfinder.domain.model.validateEmail
import com.leetgrind.projectfinder.domain.model.validateGithub
import com.leetgrind.projectfinder.domain.model.validateLinkedIn
import com.leetgrind.projectfinder.domain.model.validateName
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

    val firstNameError = MutableLiveData<ValidationResult>()
    val lastNameError = MutableLiveData<ValidationResult>()
    val emailError = MutableLiveData<ValidationResult>()
    val githubError = MutableLiveData<ValidationResult>()
    val linkedInError = MutableLiveData<ValidationResult>()
    val cvLinkError = MutableLiveData<ValidationResult>()

    private val isFormValid = MediatorLiveData<Boolean>().apply {
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

    private fun validateForm(): Boolean {
        firstNameError.value = validateName(firstName.value!!)
        lastNameError.value = validateName(lastName.value!!)
        emailError.value = validateEmail(email.value!!)
        githubError.value = validateGithub(github.value!!)
        linkedInError.value = validateLinkedIn(linkedIn.value!!)
        cvLinkError.value = validateCvLink(cvLink.value!!)

        return firstNameError.value!!.isSuccessful &&
                lastNameError.value!!.isSuccessful &&
                emailError.value!!.isSuccessful &&
                githubError.value!!.isSuccessful &&
                linkedInError.value!!.isSuccessful &&
                cvLinkError.value!!.isSuccessful
    }

    fun register(): Flow<Resource<Unit>> = flow {
        if (!validateForm()) {
            emit(Resource.Error(null))
            return@flow
        }

        val registrationForm = getRegistrationForm()
        authRepository.register(registrationForm)
            .transform<Resource<Unit>, Resource<Unit>> { resource ->
                when (resource) {
                    is Resource.Loading -> this@flow.emit(Resource.Loading())
                    is Resource.Success -> this@flow.emit(Resource.Success(data = Unit))
                    is Resource.Error -> {
                        this@flow.emit(
                            Resource.Error(
                                message = resource.message ?: "Unknown error"
                            )
                        )
                    }
                }
            }.collect()
    }


}