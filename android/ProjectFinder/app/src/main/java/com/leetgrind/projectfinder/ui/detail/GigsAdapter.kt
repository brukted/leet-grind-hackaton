package com.leetgrind.projectfinder.ui.detail

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.leetgrind.projectfinder.data.model.response.GigResponse
import com.leetgrind.projectfinder.databinding.CardGigBinding
import com.leetgrind.projectfinder.utils.addChip

class GigsAdapter(
    private val listener: GigListener
) : RecyclerView.Adapter<GigsAdapter.ViewHolder>() {

    private var _allItems: List<GigResponse> = listOf()

    inner class ViewHolder(binding: CardGigBinding) : RecyclerView.ViewHolder(binding.root) {
        val title = binding.gigTitle
        val viewButton = binding.viewButton
        val description = binding.gigDescription
        val tags = binding.ideaTags
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CardGigBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.title.text = _allItems[position].title
        holder.description.text = _allItems[position].description
        holder.viewButton.setOnClickListener {
            listener.onGigClicked(_allItems[position])
        }
        _allItems[position].tags.take(4).forEach { tag ->
            holder.tags.addChip(holder.itemView.context, tag)
        }
    }

    override fun getItemCount(): Int {
        return _allItems.size
    }

    fun setItems(gigs: List<GigResponse>) {
        _allItems = gigs
        notifyDataSetChanged()
    }

    interface GigListener {
        fun onGigClicked(gig: GigResponse)
    }

}