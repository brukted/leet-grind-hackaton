package com.leetgrind.projectfinder.common.interceptors

import android.util.Log
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.leetgrind.projectfinder.common.JSendResponse
import com.leetgrind.projectfinder.common.exceptions.APIException
import com.leetgrind.projectfinder.common.exceptions.ServerError
import okhttp3.Interceptor
import okhttp3.Response
import java.lang.reflect.Type

class JSendInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val builder = chain.request().newBuilder()
        val result = chain.proceed(builder.build())

        if (!result.isSuccessful) {
            val responseType: Type = object : TypeToken<JSendResponse<Unit>>() {}.type

            try {
                val serializedResponse: JSendResponse<Unit>? =
                    Gson().fromJson(result.body?.string(), responseType)

                if (serializedResponse?.status == null) {
                    if (result.code >= 500)
                        throw ServerError("Server Error")
                    else
                        throw APIException("Unknown Error")
                }

                when (serializedResponse.status) {
                    JSendResponse.Status.ERROR -> {
                        throw ServerError(serializedResponse.message)
                    }
                    JSendResponse.Status.FAIL -> {
                        throw APIException(serializedResponse.message)
                    }
                    JSendResponse.Status.SUCCESS -> {
                        Log.e(
                            "JsendInterceptor",
                            "Success status in not successful response, request sent to url ${result.request.url}"
                        )
                        throw RuntimeException("Success status in not successful response")
                    }
                }
            } catch (e: Exception) {
                if (e is ServerError || e is APIException)
                    throw  e

                throw ServerError("Server Error")
            }
        }

        return result
    }
}