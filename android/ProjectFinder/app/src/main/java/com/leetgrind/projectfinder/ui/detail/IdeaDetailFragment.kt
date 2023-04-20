package com.leetgrind.projectfinder.ui.detail

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.leetgrind.projectfinder.R
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.response.GigResponse
import com.leetgrind.projectfinder.databinding.FragmentIdeaDetailBinding
import com.leetgrind.projectfinder.domain.model.Idea
import com.leetgrind.projectfinder.utils.addChip
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class IdeaDetailFragment : Fragment(), GigsAdapter.GigListener {
    private var _binding: FragmentIdeaDetailBinding? = null
    private val binding get() = _binding!!
    private val navArgs: IdeaDetailFragmentArgs by navArgs()
    private val gigsViewModel by viewModels<GigsViewModel>()
    private lateinit var adapter: GigsAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentIdeaDetailBinding.inflate(inflater, container, false)
        adapter = GigsAdapter(this)

        binding.apply {
            gigsRecyclerView.adapter = adapter
            swipeRefresh.setOnRefreshListener {
                getGigs(navArgs.idea)
            }
            if (navArgs.isIdeaOwner) {
                addGigButton.show()
                addGigButton.setOnClickListener {
                    openCreateGigBottomSheet()
                }
            } else {
                addGigButton.gone()
            }
            githubLink.setOnClickListener {
                startActivity(
                    Intent(Intent.ACTION_VIEW, Uri.parse(navArgs.idea.github))
                )
            }
        }

        populateData(navArgs.idea)
        getGigs(navArgs.idea)

        return binding.root
    }

    private fun populateData(idea: Idea) {
        binding.apply {
            ideaTitle.text = idea.title
            ideaDescription.text = idea.description
            authorName.text = idea.authorName
            idea.tags.forEach {
                ideaTags.addChip(requireContext(), it)
            }
        }
    }

    private fun getGigs(idea: Idea) {
        gigsViewModel.getGigsByIdea(idea.id).observe(viewLifecycleOwner) {
            when(it) {
                is Resource.Loading -> {
                    binding.gigsProgressBar.show()
                }
                is Resource.Success -> {
                    binding.gigsProgressBar.gone()
                    binding.gigsRecyclerView.show()
                    binding.swipeRefresh.isRefreshing = false
                    adapter.setItems(it.value!!)
                }
                is Resource.Error -> {
                    binding.gigsProgressBar.gone()
                    binding.gigsRecyclerView.gone()
                    binding.swipeRefresh.isRefreshing = false
                }
            }
        }
    }

    override fun onGigClicked(gig: GigResponse) {
        if (findNavController().currentDestination!!.id != R.id.ideaDetail)
            return

        if (navArgs.isIdeaOwner) {
            findNavController().navigate(
                IdeaDetailFragmentDirections.actionIdeaDetailToApplicantsFragment(gig)
            )
        } else {
            findNavController().navigate(
                IdeaDetailFragmentDirections.actionIdeaDetailToApplyGigBottomSheet(gig)
            )
        }
    }

    private fun openCreateGigBottomSheet() {
        if (findNavController().currentDestination!!.id == R.id.ideaDetail)
            findNavController().navigate(
                IdeaDetailFragmentDirections.actionIdeaDetailToCreateGigBottomSheet(navArgs.idea)
            )
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}