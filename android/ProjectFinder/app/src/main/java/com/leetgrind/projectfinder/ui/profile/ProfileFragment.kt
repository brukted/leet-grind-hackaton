package com.leetgrind.projectfinder.ui.profile

import android.app.AlertDialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.leetgrind.projectfinder.R
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.ProfileResponse
import com.leetgrind.projectfinder.databinding.FragmentProfileBinding
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private val profileViewModel by viewModels<ProfileViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)

        binding.swipeRefresh.setOnRefreshListener {
            getProfile()
        }

        getProfile()

        return binding.root
    }

    private fun getProfile() {
        profileViewModel.getProfile().observe(viewLifecycleOwner) {
            when (it) {
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.mainLayout.show()
                    binding.swipeRefresh.isRefreshing = false
                    fillOutProfile(it.value!!)
                    createLinks(it.value)
                }
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.mainLayout.gone()
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    binding.mainLayout.show()
                    binding.swipeRefresh.isRefreshing = false
                }
            }
        }
    }

    private fun fillOutProfile(profile: ProfileResponse) {
        binding.apply {
            fullName.text = getString(R.string.full_name, profile.firstName, profile.lastName)
            detailsCardEmailText.text = profile.email
            detailsCardTelegramText.text = profile.telegram
            if (profile.phone != null) {
                detailsCardPhoneText.text = profile.phone
            } else {
                detailsCardPhone.gone()
                detailsCardPhoneDivider.gone()
            }

            binding.logOutCard.setOnClickListener {
                AlertDialog.Builder(context)
                    .setTitle("Confirm Logout")
                    .setMessage("Are you sure you want to log out?")
                    .setPositiveButton("Log Out") { _, _ ->
                        profileViewModel.logOut()
                        findNavController().navigate(R.id.authActivity)
                        requireActivity().finish()
                    }.setNegativeButton("Cancel", null)
                    .setIcon(0).show()
            }
        }
    }

    private fun createLinks(profile: ProfileResponse) {
        binding.apply {
            detailsCardEmail.setOnClickListener {
                val emailIntent = Intent(Intent.ACTION_SENDTO).apply {
                    data = Uri.parse("mailto:")
                    putExtra(Intent.EXTRA_EMAIL, arrayOf(profile.email))
                }
                startActivity(emailIntent)
            }

            detailsCardTelegram.setOnClickListener {
                val telegramIntent = Intent(Intent.ACTION_VIEW).apply {
                    data = Uri.parse(profile.telegram)
                }
                startActivity(telegramIntent)
            }

            if (profile.phone != null) {
                detailsCardPhone.setOnClickListener {
                    val phoneIntent = Intent(Intent.ACTION_DIAL).apply {
                        data = Uri.parse("tel:${profile.phone}")
                    }
                    startActivity(phoneIntent)
                }
            }

            if (profile.github != null) {
                linksCardGithub.setOnClickListener {
                    startActivity(
                        Intent(Intent.ACTION_VIEW, Uri.parse(profile.github))
                    )
                }
            }

            if (profile.resume != null) {
                linksCardResume.setOnClickListener {
                    startActivity(
                        Intent(Intent.ACTION_VIEW, Uri.parse(profile.resume))
                    )
                }
            }

            if (profile.linkedin != null) {
                linksCardLinkedin.setOnClickListener {
                    startActivity(
                        Intent(Intent.ACTION_VIEW, Uri.parse(profile.linkedin))
                    )
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}