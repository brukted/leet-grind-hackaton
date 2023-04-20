package com.leetgrind.projectfinder.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.navigation.NavController
import androidx.navigation.NavDestination
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.leetgrind.projectfinder.R
import com.leetgrind.projectfinder.data.repository.DefaultAuthRepository
import com.leetgrind.projectfinder.databinding.ActivityMainBinding
import com.leetgrind.projectfinder.ui.authentication.AuthActivity
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

        runBlocking {
            if (authRepository.getAuthToken() == null) {
                val i = Intent(baseContext, AuthActivity::class.java)
                i.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(i)
                finish()
            }
        }

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

        val fragmentsWithoutBottomNav = setOf(
            R.id.ideaDetail,
            R.id.applicantsFragment,
            R.id.applyGigBottomSheet,
            R.id.createGigBottomSheet,
        )

        val fragmentsWithoutAppbar = emptySet<Int>()

        navController.addOnDestinationChangedListener { _: NavController, destination: NavDestination, _: Bundle? ->
            if (fragmentsWithoutAppbar.contains(destination.id)) binding.mainActivityToolbar.visibility =
                View.GONE
            else binding.mainActivityToolbar.visibility = View.VISIBLE

            if (fragmentsWithoutBottomNav.contains(destination.id)) binding.mainActivityBottomNav.visibility =
                View.GONE
            else binding.mainActivityBottomNav.visibility = View.VISIBLE
        }
    }

    override fun onSupportNavigateUp(): Boolean =
        findNavController(R.id.main_activity_nav_host).navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
}