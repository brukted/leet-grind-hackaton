package com.leetgrind.projectfinder.ui.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.leetgrind.projectfinder.R
import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import com.leetgrind.projectfinder.databinding.CardIdeaBinding
import com.leetgrind.projectfinder.utils.addChip

class HomeAdapter : RecyclerView.Adapter<HomeAdapter.ViewHolder>() {

    private var _allItems: List<IdeaResponse> = listOf()

    inner class ViewHolder(binding: CardIdeaBinding) : RecyclerView.ViewHolder(binding.root) {
        val title = binding.ideaTitle
        val description = binding.ideaDescription
        val author = binding.authorName
        val tags = binding.ideaTags
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CardIdeaBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.title.text = _allItems[position].title
        holder.description.text = _allItems[position].description
        holder.author.text = holder.itemView.context.getString(
            R.string.full_name,
            _allItems[position].author.firstName,
            _allItems[position].author.lastName
        )
        _allItems[position].tags.forEach {
            holder.tags.addChip(holder.itemView.context, it)
        }
    }

    override fun getItemCount(): Int {
        return _allItems.size
    }

    fun setItems(ideas: List<IdeaResponse>) {
        _allItems = ideas
        notifyDataSetChanged()
    }
}