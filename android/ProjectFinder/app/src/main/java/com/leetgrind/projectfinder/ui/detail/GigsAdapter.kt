package com.leetgrind.projectfinder.ui.detail

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.leetgrind.projectfinder.data.model.response.GigResponse
import com.leetgrind.projectfinder.databinding.TempGigItemBinding

class GigsAdapter : RecyclerView.Adapter<GigsAdapter.ViewHolder>() {

    private var _allItems: List<GigResponse> = listOf()

    inner class ViewHolder(binding: TempGigItemBinding) : RecyclerView.ViewHolder(binding.root) {
        val title = binding.gigTitle
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            TempGigItemBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.title.text = _allItems[position].title
    }

    override fun getItemCount(): Int {
        return _allItems.size
    }

    fun setItems(gigs: List<GigResponse>) {
        _allItems = gigs
        notifyDataSetChanged()
    }
}