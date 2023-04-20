package com.leetgrind.projectfinder.ui.ideas.create

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.google.android.material.chip.Chip
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.request.CreateGigForm
import com.leetgrind.projectfinder.data.model.request.CreateIdeaForm
import com.leetgrind.projectfinder.databinding.BottomSheetCreateIdeaBinding
import com.leetgrind.projectfinder.ui.ideas.IdeasViewModel
import com.leetgrind.projectfinder.utils.addChip
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.hideAndDisable
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class CreateIdeaBottomSheet : BottomSheetDialogFragment() {
    private var _binding: BottomSheetCreateIdeaBinding? = null
    private val binding get() = _binding!!
    private val ideasViewModel by viewModels<IdeasViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = BottomSheetCreateIdeaBinding.inflate(inflater, container, false)

        binding.apply {
            addTagButton.setOnClickListener {
                val text = binding.tagsInputInner.text
                if (text?.isNotEmpty() == true) {
                    binding.chipGroup.addChip(requireContext(), text.toString(), true)
                    binding.tagsInputInner.text?.clear()
                }
            }

            createIdeaButton.setOnClickListener {
                val tags = mutableListOf<String>()
                for (i in 0 until chipGroup.childCount) {
                    val chip = chipGroup.getChildAt(i) as Chip
                    tags.add(chip.text.toString())
                }
                val form = CreateIdeaForm(
                    title = binding.titleInputInner.text.toString(),
                    description = binding.descriptionInputInner.text.toString(),
                    tags = tags,
                    github = binding.githubInputInner.text.toString()
                )
                createIdea(form)
            }
        }

        return binding.root
    }

    private fun createIdea(form: CreateIdeaForm) {
        ideasViewModel.createIdea(form).observe(viewLifecycleOwner) {
            when (it) {
                is Resource.Success -> {
                    binding.progressBar.gone()
                    binding.createIdeaButton.show()
                    Toast.makeText(requireContext(), "Gig successfully created!", Toast.LENGTH_SHORT).show()
                    dismiss()
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    binding.createIdeaButton.show()
                    Toast.makeText(requireContext(), it.message, Toast.LENGTH_SHORT).show()
                    dismiss()
                }
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.createIdeaButton.hideAndDisable()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}