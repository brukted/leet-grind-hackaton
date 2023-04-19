package com.leetgrind.projectfinder.common

import androidx.datastore.preferences.core.stringPreferencesKey

object Constants {
    const val BASE_URL = "https://projectfinder-api.onrender.com/api/v1/"
    const val USER_PREFERENCES = "user_prefs"
    val JWT_TOKEN_PREF_KEY by lazy { stringPreferencesKey("jwt_key") }
    val USER_ID_PREF_KEY by lazy { stringPreferencesKey("user_id") }
}