package com.leetgrind.projectfinder.ui.detail.create

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.google.android.material.chip.Chip
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.request.CreateGigForm
import com.leetgrind.projectfinder.databinding.BottomSheetCreateGigBinding
import com.leetgrind.projectfinder.ui.detail.GigsViewModel
import com.leetgrind.projectfinder.ui.detail.IdeaDetailFragmentArgs
import com.leetgrind.projectfinder.utils.addChip
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.hideAndDisable
import com.leetgrind.projectfinder.utils.show
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class GigBottomSheet : BottomSheetDialogFragment() {
    private var _binding: BottomSheetCreateGigBinding? = null
    private val binding get() = _binding!!
    private val gigsViewModel by viewModels<GigsViewModel>()
    private val navArgs: GigBottomSheetArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = BottomSheetCreateGigBinding.inflate(inflater, container, false)

        binding.apply {
            addTagButton.setOnClickListener {
                val text = binding.tagsInputInner.text
                if (text?.isNotEmpty() == true) {
                    binding.chipGroup.addChip(requireContext(), text.toString(), true)
                    binding.tagsInputInner.text?.clear()
                }
            }

            createGigButton.setOnClickListener {
                val tags = mutableListOf<String>()
                for (i in 0 until chipGroup.childCount) {
                    val chip = chipGroup.getChildAt(i) as Chip
                    tags.add(chip.text.toString())
                }
                val form = CreateGigForm(
                    title = binding.titleInputInner.text.toString(),
                    description = binding.descriptionInputInner.text.toString(),
                    tags = tags
                )
                createGig(form)
            }
        }

        return binding.root
    }

    private fun createGig(form: CreateGigForm) {
        gigsViewModel.createGig(navArgs.idea.id, form).observe(viewLifecycleOwner) {
            when (it) {
                is Resource.Success -> {
                    binding.progressBar.gone()
                    Toast.makeText(requireContext(), "Gig successfully created!", Toast.LENGTH_SHORT).show()
                    dismiss()
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    Toast.makeText(requireContext(), it.message, Toast.LENGTH_SHORT).show()
                    dismiss()
                }
                is Resource.Loading -> {
                    binding.progressBar.show()
                    binding.createGigButton.hideAndDisable()
                }
            }
        }
    }
}