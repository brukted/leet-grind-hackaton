package com.leetgrind.projectfinder.ui.detail.applicants

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.leetgrind.projectfinder.R
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import com.leetgrind.projectfinder.databinding.CardApplicantBinding

class ApplicantsAdapter : RecyclerView.Adapter<ApplicantsAdapter.ViewHolder>() {

    private var _allItems: List<ApplicationResponse> = listOf()

    inner class ViewHolder(binding: CardApplicantBinding) : RecyclerView.ViewHolder(binding.root) {
        val name = binding.applicantName
        val gigName = binding.gigTitle
        val note = binding.applicantNote
        val emailButton = binding.emailBtn
        val telegramButton = binding.telegramBtn
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CardApplicantBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.name.text = holder.itemView.context.getString(
            R.string.full_name,
            _allItems[position].applicant.firstName,
            _allItems[position].applicant.lastName
        )
        holder.gigName.text = _allItems[position].gig.title
    }

    override fun getItemCount(): Int {
        return _allItems.size
    }

    fun setItems(applications: List<ApplicationResponse>) {
        _allItems = applications
        notifyDataSetChanged()
    }
}