package com.leetgrind.projectfinder.common.interceptors

import com.leetgrind.projectfinder.data.local.prefs.LocalPrefStore
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthTokenInterceptor @Inject constructor(
    private val localPrefStore: LocalPrefStore
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val builder = chain.request().newBuilder()
        runBlocking {
            localPrefStore.getAuthToken()
        }?.let {
            builder.addHeader("Authorization", "Bearer $it")
        }

        return chain.proceed(builder.build())
    }
}