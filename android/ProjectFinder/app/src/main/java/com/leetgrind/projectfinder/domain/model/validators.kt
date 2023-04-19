package com.leetgrind.projectfinder.domain.model

import android.util.Patterns

fun validateEmail(email: String) = when {
    email.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Email cannot be blank"
    )
    !Patterns.EMAIL_ADDRESS.matcher(email).matches() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Email is invalid"
    )
    else -> ValidationResult(isSuccessful = true)
}

fun validateName(name: String) = when {
    name.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Name cannot be blank"
    )
    else -> ValidationResult(isSuccessful = true)
}

fun validatePassword(password: String) = when {
    password.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Password cannot be blank"
    )
    else -> ValidationResult(isSuccessful = true)
}

fun validateConfirmPassword(password: String, confirmPassword: String) = when {
    confirmPassword.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Confirm password cannot be blank"
    )
    password != confirmPassword -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Passwords do not match"
    )
    else -> ValidationResult(isSuccessful = true)
}

fun validateGithub(github: String) = when {
    github.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "Github cannot be blank"
    )
    else -> ValidationResult(isSuccessful = true)
}

fun validateLinkedIn(linkedIn: String) = when {
    linkedIn.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "LinkedIn cannot be blank"
    )
    else -> ValidationResult(isSuccessful = true)
}

fun validateCvLink(cvLink: String) = when {
    cvLink.isBlank() -> ValidationResult(
        isSuccessful = false,
        errorMessage = "CV Link cannot be blank"
    )
    else -> ValidationResult(isSuccessful = true)
}