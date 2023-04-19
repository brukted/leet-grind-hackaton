package com.leetgrind.projectfinder.ui.applications

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.leetgrind.projectfinder.databinding.FragmentApplicationsBinding
import com.leetgrind.projectfinder.ui.home.HomeViewModel

class ApplicationsFragment : Fragment() {
    private var _binding: FragmentApplicationsBinding? = null
    private val binding get() = _binding!!
    private val applicationsViewModel by viewModels<ApplicationsViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentApplicationsBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}