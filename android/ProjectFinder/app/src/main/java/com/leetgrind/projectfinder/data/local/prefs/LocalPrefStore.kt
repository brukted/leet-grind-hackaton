package com.leetgrind.projectfinder.data.local.prefs

import android.util.Log
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.leetgrind.projectfinder.common.Constants.JWT_TOKEN_PREF_KEY
import com.leetgrind.projectfinder.common.Constants.USER_ID_PREF_KEY
import kotlinx.coroutines.flow.first
import java.lang.reflect.Type

class LocalPrefStore(private val prefsDataStore: DataStore<Preferences>) {

    suspend fun getAuthToken() = prefsDataStore.data.first()[JWT_TOKEN_PREF_KEY]

    suspend fun getUserId() = prefsDataStore.data.first()[USER_ID_PREF_KEY]

    suspend fun setAuthToken(token: String) {
        prefsDataStore.edit { preferences ->
            preferences[JWT_TOKEN_PREF_KEY] = token
        }
    }

    suspend fun setUserId(id: String) {
        prefsDataStore.edit { preferences ->
            preferences[USER_ID_PREF_KEY] = id
        }
    }

}