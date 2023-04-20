package com.leetgrind.projectfinder.ui.detail.applicants

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.databinding.FragmentApplicantsBinding
import com.leetgrind.projectfinder.ui.detail.GigsViewModel
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ApplicantsFragment : Fragment(), ApplicantsAdapter.OnLinkClickListener {
    private var _binding: FragmentApplicantsBinding? = null
    private val binding get() = _binding!!
    private val gigsViewModel by viewModels<GigsViewModel>()
    private lateinit var adapter: ApplicantsAdapter
    private val navArgs: ApplicantsFragmentArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentApplicantsBinding.inflate(inflater, container, false)
        adapter = ApplicantsAdapter(this)

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
        gigsViewModel.getApplicationsByGig(navArgs.gig.id).observe(viewLifecycleOwner) {
            when(it) {
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.errorText.gone()
                    binding.applicantsRecyclerView.gone()
                }
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.errorText.gone()
                    binding.swipeRefresh.isRefreshing = false
                    if (it.value!!.isNotEmpty()) {
                        binding.applicantsRecyclerView.show()
                        binding.noApplicantsText.gone()
                        adapter.setItems(it.value)
                    } else {
                        binding.applicantsRecyclerView.gone()
                        binding.noApplicantsText.show()
                    }
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    binding.errorText.show()
                    binding.applicantsRecyclerView.gone()
                    binding.swipeRefresh.isRefreshing = false
                }
            }
        }
    }

    override fun onLinkClick(link: String, isMail: Boolean) {
        if (isMail) {
            val emailIntent = Intent(Intent.ACTION_SENDTO).apply {
                data = Uri.parse("mailto:")
                putExtra(Intent.EXTRA_EMAIL, arrayOf(link))
            }
            startActivity(emailIntent)
        } else {
            val telegramIntent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse(link)
            }
            startActivity(telegramIntent)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}