package com.leetgrind.projectfinder.ui.authentication

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.leetgrind.projectfinder.domain.model.ValidationResult
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class RegisterViewModel @Inject constructor(
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

}