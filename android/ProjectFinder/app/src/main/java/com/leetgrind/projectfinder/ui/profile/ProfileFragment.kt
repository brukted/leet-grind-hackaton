package com.leetgrind.projectfinder.ui.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.leetgrind.projectfinder.common.Resource
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

        getProfile()

        return binding.root
    }

    private fun getProfile() {
        profileViewModel.getProfile().observe(viewLifecycleOwner) {
            when (it) {
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.name.text = it.value!!.name
                }
                is Resource.Loading -> {
                    binding.progressBar.show()
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    binding.name.text = it.message
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}