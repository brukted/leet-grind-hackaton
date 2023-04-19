package com.leetgrind.projectfinder.domain.model

data class ValidationResult(
    val isSuccessful: Boolean = true,
    val errorMessage: String? = null)
