package com.leetgrind.projectfinder.di

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.core.handlers.ReplaceFileCorruptionHandler
import androidx.datastore.preferences.SharedPreferencesMigration
import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.emptyPreferences
import androidx.datastore.preferences.preferencesDataStoreFile
import com.google.gson.Gson
import com.leetgrind.projectfinder.common.Constants.BASE_URL
import com.leetgrind.projectfinder.common.Constants.USER_PREFERENCES
import com.leetgrind.projectfinder.common.interceptors.AuthTokenInterceptor
import com.leetgrind.projectfinder.common.interceptors.JSendInterceptor
import com.leetgrind.projectfinder.common.interceptors.NetworkInterceptor
import com.leetgrind.projectfinder.data.local.prefs.LocalPrefStore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideGson() = Gson()

    @Provides
    @Singleton
    fun providesHttpClient(
        @ApplicationContext context: Context,
        authTokenInterceptor: AuthTokenInterceptor
    ): OkHttpClient {
        val jSendInterceptor = JSendInterceptor()

        val builder = OkHttpClient.Builder()
            .addInterceptor(NetworkInterceptor(context))
            .addInterceptor(jSendInterceptor)
            .addInterceptor(authTokenInterceptor)

        val logging = HttpLoggingInterceptor()
        logging.setLevel(HttpLoggingInterceptor.Level.BODY)
        logging.redactHeader("Authorization")
        builder.addInterceptor(logging)

        return builder.build()
    }

    @Provides
    @Singleton
    fun provideRetrofit(gson: Gson, httpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }

    @Provides
    @Singleton
    fun providePreferencesDataStore(@ApplicationContext appContext: Context): DataStore<Preferences> {
        return PreferenceDataStoreFactory.create(
            corruptionHandler = ReplaceFileCorruptionHandler(
                produceNewData = { emptyPreferences() }
            ),
            migrations = listOf(SharedPreferencesMigration(appContext, USER_PREFERENCES)),
            scope = CoroutineScope(Dispatchers.IO + SupervisorJob()),
            produceFile = { appContext.preferencesDataStoreFile(USER_PREFERENCES) }
        )
    }

    @Provides
    @Singleton
    fun providesLocalPrefStore(prefsDataStore: DataStore<Preferences>): LocalPrefStore {
        return LocalPrefStore(prefsDataStore)
    }

}