package com.leetgrind.projectfinder.ui.detail.applicants

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.databinding.FragmentApplicantsBinding
import com.leetgrind.projectfinder.ui.detail.GigsViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ApplicantsFragment : Fragment() {
    private var _binding: FragmentApplicantsBinding? = null
    private val binding get() = _binding!!
    private val gigsViewModel by viewModels<GigsViewModel>()
    private lateinit var adapter: ApplicantsAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentApplicantsBinding.inflate(inflater, container, false)
        adapter = ApplicantsAdapter()

        binding.apply {
            applicantsRecyclerView.adapter = adapter
            swipeRefresh.setOnRefreshListener {
                getApplications()
            }
        }

        getApplications()

        return binding.root
    }

    private fun getApplications() {
        gigsViewModel.getApplicationsByGig("").observe(viewLifecycleOwner) {
            when(it) {
                is Resource.Loading -> {
                    binding.swipeRefresh.isRefreshing = true
                }
                is Resource.Success -> {
                    binding.swipeRefresh.isRefreshing = false
                    adapter.setItems(it.value!!)
                }
                is Resource.Error -> {
                    binding.swipeRefresh.isRefreshing = false
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}