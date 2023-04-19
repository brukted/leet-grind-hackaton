package com.leetgrind.projectfinder.ui.profile

import android.os.Bundle
import android.util.Log
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
        setupListeners()

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
        binding.fullName.text = getString(R.string.full_name, profile.firstName, profile.lastName)
        binding.detailsCardEmailText.text = profile.email
        binding.detailsCardTelegramText.text = profile.telegram
        if (profile.phone != null) {
            binding.detailsCardPhoneText.text = profile.phone
        } else {
            binding.detailsCardPhone.gone()
            binding.detailsCardPhoneDivider.gone()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun setupListeners() {
        binding.logOutCard.setOnClickListener {
            profileViewModel.logOut()
            findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }
    }
}