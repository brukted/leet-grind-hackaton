package com.leetgrind.projectfinder.common

import android.util.Log
import com.leetgrind.projectfinder.common.exceptions.APIException
import com.leetgrind.projectfinder.common.exceptions.NetworkException
import com.leetgrind.projectfinder.common.exceptions.ServerError

inline fun <R> buildResource(block: () -> R): Resource<R> {
    return try {
        Resource.Success(block())
    } catch (e: APIException) {
        Resource.Error(e.message)
    } catch (e: ServerError) {
        Resource.Error(e.message)
    } catch (e: NetworkException) {
        Resource.Error(e.message)
    } catch (e: java.io.IOException) {
        Resource.Error("Network error")
    } catch (e: Exception) {
        Log.e("ResourceBuilder", "Unknown error", e)
        Resource.Error("Unknown Error")
    }
}