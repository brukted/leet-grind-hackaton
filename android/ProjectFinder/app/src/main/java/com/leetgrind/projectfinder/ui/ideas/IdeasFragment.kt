package com.leetgrind.projectfinder.ui.ideas

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.databinding.FragmentIdeasBinding
import com.leetgrind.projectfinder.ui.home.HomeViewModel
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class IdeasFragment : Fragment() {
    private var _binding: FragmentIdeasBinding? = null
    private val binding get() = _binding!!
    private val ideaViewModel by viewModels<IdeasViewModel>()
    private lateinit var adapter: IdeasAdapter
    
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentIdeasBinding.inflate(inflater, container, false)
        adapter = IdeasAdapter()

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
        ideaViewModel.getMyIdeas().observe(viewLifecycleOwner) {
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
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}