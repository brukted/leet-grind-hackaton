package com.leetgrind.projectfinder.utils

import android.content.Context
import android.view.View
import com.google.android.material.chip.Chip
import com.google.android.material.chip.ChipGroup
import com.leetgrind.projectfinder.R

fun View.hide() {
    visibility = View.INVISIBLE
}

fun View.hideAndDisable() {
    visibility = View.INVISIBLE
    isEnabled = false
}

fun View.gone() {
    visibility = View.GONE
}


fun View.show() {
    visibility = View.VISIBLE
}

fun View.showAndEnable() {
    visibility = View.VISIBLE
    isEnabled = true
}

fun ChipGroup.addChip(context: Context, label: String, closable: Boolean = false) {
    Chip(context).apply {
        id = View.generateViewId()
        text = label
        isClickable = false
        isCheckable = false
        isCheckedIconVisible = false
        isFocusable = false
        if (closable) {
            isCloseIconVisible = true
            setOnCloseIconClickListener { removeView(this) }
        }
        addView(this)
    }
}