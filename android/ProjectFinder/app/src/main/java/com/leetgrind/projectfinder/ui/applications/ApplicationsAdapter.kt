package com.leetgrind.projectfinder.ui.applications

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.leetgrind.projectfinder.data.model.response.ApplicationResponse
import com.leetgrind.projectfinder.databinding.CardMyApplicationsBinding
import java.util.Locale

class ApplicationsAdapter(
    private val listener: RetractionListener
) : RecyclerView.Adapter<ApplicationsAdapter.ViewHolder>() {

    private var _allItems: List<ApplicationResponse> = listOf()

    inner class ViewHolder(binding: CardMyApplicationsBinding) : RecyclerView.ViewHolder(binding.root) {
        val title = binding.ideaTitle
        val description = binding.ideaDescription
        val status = binding.status
        val retractButton = binding.button
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CardMyApplicationsBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.title.text = _allItems[position].gig.title
        holder.description.text = _allItems[position].note
        holder.status.text = _allItems[position].status.toString().lowercase(Locale.ROOT)
        holder.retractButton.setOnClickListener {
            listener.retractApplication(_allItems[position], holder)
        }
    }

    override fun getItemCount(): Int {
        return _allItems.size
    }

    fun setItems(applications: List<ApplicationResponse>) {
        _allItems = applications
        notifyDataSetChanged()
    }

    fun deleteItem(application: ApplicationResponse) {
        _allItems = _allItems.filter { it.id != application.id }
        notifyDataSetChanged()
    }

    interface RetractionListener {
        fun retractApplication(application: ApplicationResponse, holder: ApplicationsAdapter.ViewHolder)
    }

}