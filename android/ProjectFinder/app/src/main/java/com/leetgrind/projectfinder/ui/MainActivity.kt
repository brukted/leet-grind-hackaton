package com.leetgrind.projectfinder.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.findNavController
import androidx.navigation.fragment.FragmentNavigator
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.leetgrind.projectfinder.R
import com.leetgrind.projectfinder.data.repository.DefaultAuthRepository
import com.leetgrind.projectfinder.databinding.ActivityMainBinding
import com.leetgrind.projectfinder.ui.authentication.login.LoginFragment
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private var _binding: ActivityMainBinding? = null
    private val binding: ActivityMainBinding get() = _binding!!
    private lateinit var appBarConfiguration: AppBarConfiguration

    @Inject
    lateinit var authRepository: DefaultAuthRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        _binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.mainActivityToolbar)

//        runBlocking {
//            if (authRepository.getAuthToken() == null) {
//                supportFragmentManager.beginTransaction()
//                    .replace(R.id.main_activity_nav_host, LoginFragment())
//                    .commit()
//            }
//        }

        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.main_activity_nav_host) as NavHostFragment
        val navController = navHostFragment.navController

        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.homeFragment,
                R.id.ideasFragment,
                R.id.applicationsFragment,
                R.id.profileFragment,
            )
        )

        binding.mainActivityBottomNav.setupWithNavController(navController)
        setupActionBarWithNavController(navController, appBarConfiguration)
    }

    override fun onSupportNavigateUp(): Boolean =
        findNavController(R.id.main_activity_nav_host).navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
}