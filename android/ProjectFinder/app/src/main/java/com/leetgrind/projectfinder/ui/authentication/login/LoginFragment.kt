package com.leetgrind.projectfinder.ui.authentication.login

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import com.leetgrind.projectfinder.common.Resource
import com.leetgrind.projectfinder.databinding.FragmentLoginBinding
import com.leetgrind.projectfinder.utils.gone
import com.leetgrind.projectfinder.utils.hideAndDisable
import com.leetgrind.projectfinder.utils.show
import com.leetgrind.projectfinder.utils.showAndEnable
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.launch

@AndroidEntryPoint
class LoginFragment : Fragment() {
    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!
    private val loginViewModel by viewModels<LoginViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        binding.lifecycleOwner = viewLifecycleOwner
        binding.loginViewModel = loginViewModel

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupListeners()
    }

    private fun setupListeners() {
        binding.apply {
            binding.loginBtn.setOnClickListener {
                binding.loginBtn.isEnabled = false

                lifecycleScope.launch {
                    loginViewModel!!.login()
                        .collect {
                            when (it) {
                                is Resource.Loading -> {
                                    binding.loginBtn.hideAndDisable()
                                    binding.progressBar.show()
                                }

                                is Resource.Success -> {
                                    // TODO: Handle success
                                }

                                else -> {
                                    binding.progressBar.gone()
                                    binding.loginBtn.showAndEnable()
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
        }
    }
}