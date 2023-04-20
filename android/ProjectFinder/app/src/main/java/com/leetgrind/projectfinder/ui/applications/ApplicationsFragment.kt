package com.leetgrind.projectfinder.ui.applications

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import com.leetgrind.projectfinder.data.model.response.ApplicationStatus
import com.leetgrind.projectfinder.databinding.FragmentApplicationsBinding
import com.leetgrind.projectfinder.ui.applications.ApplicationsAdapter.RetractionListener
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ApplicationsFragment : Fragment(), RetractionListener {
    private var _binding: FragmentApplicationsBinding? = null
    private val binding get() = _binding!!
    private lateinit var adapter: ApplicationsAdapter
    private val applicationsViewModel by viewModels<ApplicationsViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentApplicationsBinding.inflate(inflater, container, false)
        adapter = ApplicationsAdapter(this)

        binding.apply {
            applicationsRecyclerview.adapter = adapter
            swipeRefresh.setOnRefreshListener {
                getApplications()
            }
        }

        getApplications()

        return binding.root
    }

    private fun getApplications() {
        applicationsViewModel.getMyApplications().observe(viewLifecycleOwner) {
            when(it) {
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.applicationsRecyclerview.gone()
                    binding.errorText.gone()
                    binding.noIdeasText.gone()
                }
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.errorText.gone()
                    binding.swipeRefresh.isRefreshing = false
                    if (it.value!!.isNotEmpty()) {
                        binding.applicationsRecyclerview.show()
                        binding.noIdeasText.gone()
                        adapter.setItems(it.value.filter { application ->
                            application.status != ApplicationStatus.REJECTED
                        })
                    } else {
                        binding.applicationsRecyclerview.gone()
                        binding.noIdeasText.show()
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    binding.applicationsRecyclerview.gone()
                    binding.errorText.show()
                    binding.noIdeasText.gone()
                    binding.errorText.text = it.message
                    binding.swipeRefresh.isRefreshing = false
                }
            }
        }
    }

    override fun retractApplication(application: ApplicationResponse, holder: ApplicationsAdapter.ViewHolder) {
        applicationsViewModel.retractApplication(application).observe(viewLifecycleOwner) {
            when(it) {
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.applicationsRecyclerview.gone()
                }
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.applicationsRecyclerview.show()
                    adapter.deleteItem(application)
                    Toast.makeText(requireContext(), "Successfully retracted", Toast.LENGTH_SHORT).show()
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    binding.applicationsRecyclerview.show()
                    Toast.makeText(requireContext(), it.message, Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}