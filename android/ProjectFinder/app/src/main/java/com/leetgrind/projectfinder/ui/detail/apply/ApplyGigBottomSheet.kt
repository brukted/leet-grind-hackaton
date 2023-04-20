package com.leetgrind.projectfinder.ui.detail.apply

import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import dagger.hilt.android.AndroidEntryPoint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.data.model.request.ApplicationForm
import com.leetgrind.projectfinder.databinding.BottomSheetApplyGigBinding
import com.leetgrind.projectfinder.ui.detail.GigsViewModel
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.hideAndDisable
import com.leetgrind.projectfinder.utils.show

@AndroidEntryPoint
class ApplyGigBottomSheet : BottomSheetDialogFragment() {
    private var _binding: BottomSheetApplyGigBinding? = null
    private val binding get() = _binding!!
    private val gigsViewModel by viewModels<GigsViewModel>()
    private val navArgs: ApplyGigBottomSheetArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = BottomSheetApplyGigBinding.inflate(inflater, container, false)

        binding.apply {
            applyButton.setOnClickListener {
                createApplication(
                    ApplicationForm(
                        navArgs.gig.id,
                        binding.descriptionInputInner.text.toString()
                    )
                )
            }
        }

        return binding.root
    }

    private fun createApplication(form: ApplicationForm) {
        gigsViewModel.createApplication(form).observe(viewLifecycleOwner) {
            when (it) {
                is Resource.Success -> {
                    binding.applyButton.hideAndDisable()
                    binding.progressBar.gone()
                    Toast.makeText(requireContext(), "Applied successfully!", Toast.LENGTH_SHORT).show()
                    dismiss()
                }
                is Resource.Error -> {
                    binding.progressBar.gone()
                    Toast.makeText(requireContext(), it.message, Toast.LENGTH_SHORT).show()
                    dismiss()
                }
                is Resource.Loading -> {
                    binding.applyButton.hideAndDisable()
                    binding.progressBar.show()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}