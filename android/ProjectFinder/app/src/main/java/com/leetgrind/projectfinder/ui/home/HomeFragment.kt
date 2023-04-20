package com.leetgrind.projectfinder.ui.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.mapper.toIdea
import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import com.leetgrind.projectfinder.databinding.FragmentHomeBinding
import com.leetgrind.projectfinder.ui.ideas.IdeasAdapter
import com.leetgrind.projectfinder.ui.ideas.IdeasFragmentDirections
import com.leetgrind.projectfinder.ui.profile.ProfileViewModel
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class HomeFragment : Fragment(), IdeasAdapter.IdeaListener {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var adapter: HomeAdapter
    private val homeViewModel by viewModels<HomeViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        adapter = HomeAdapter(this)

        binding.apply {
            ideasRecyclerview.adapter = adapter
            swipeRefresh.setOnRefreshListener {
                getIdeas()
            }
        }

        getIdeas()
        
        return binding.root
    }

    private fun getIdeas() {
        homeViewModel.getAllIdeas().observe(viewLifecycleOwner) {
            when(it) {
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.ideasRecyclerview.gone()
                    binding.errorText.gone()
                    binding.noIdeasText.gone()
                }
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.ideasRecyclerview.show()
                    binding.errorText.gone()
                    binding.swipeRefresh.isRefreshing = false
                    if (it.value!!.isNotEmpty()) {
                        binding.ideasRecyclerview.show()
                        binding.noIdeasText.gone()
                        adapter.setItems(it.value)
                    } else {
                        binding.ideasRecyclerview.gone()
                        binding.noIdeasText.show()
                    }
                }
                else -> {
                    binding.progressBar.gone()
                    binding.ideasRecyclerview.gone()
                    binding.errorText.show()
                    binding.noIdeasText.gone()
                    binding.errorText.text = it.message
                    binding.swipeRefresh.isRefreshing = false
                }
            }
        }
    }

    override fun onIdeaClicked(idea: IdeaResponse) {
        findNavController().navigate(
            HomeFragmentDirections.actionHomeFragmentToIdeaDetail(idea.toIdea(), false)
        )
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}