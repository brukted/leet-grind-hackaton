package com.leetgrind.projectfinder.ui.authentication.register

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.databinding.FragmentRegisterBinding
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.hideAndDisable
import com.leetgrind.projectfinder.utils.show
import com.leetgrind.projectfinder.utils.showAndEnable
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class RegisterFragment : Fragment() {

    private var _binding: FragmentRegisterBinding? = null
    private  val binding get() = _binding!!
    private val registrationViewModel by viewModels<RegisterViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRegisterBinding.inflate(inflater, container, false)
        binding.lifecycleOwner = viewLifecycleOwner
        binding.registerViewModel = registrationViewModel

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupListeners()
    }

    private fun setupListeners() {
        binding.registerBtn.setOnClickListener {
            binding.registerBtn.isEnabled = false

            lifecycleScope.launch {
                registrationViewModel.register().collect {
                    when (it) {
                        is Resource.Loading -> {
                            binding.registerBtn.hideAndDisable()
                            binding.progressBar.show()
                        }
                        is Resource.Success -> {
                            findNavController().navigate(
                                RegisterFragmentDirections.actionRegisterFragmentToLoginFragment2()
                            )
                        }
                        else -> {
                            binding.progressBar.gone()
                            binding.registerBtn.showAndEnable()
                            binding.registerBtn.isEnabled = true
                            it.message?.let { message ->
                                Toast.makeText(
                                    requireContext(),
                                    message,
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                        }
                    }
                }
            }
        }

        binding.apply {
            binding.alreadyHaveAnAccountBtn.setOnClickListener{
                findNavController().navigate(
                    RegisterFragmentDirections.actionRegisterFragmentToLoginFragment2()
                )
            }
        }
    }
}