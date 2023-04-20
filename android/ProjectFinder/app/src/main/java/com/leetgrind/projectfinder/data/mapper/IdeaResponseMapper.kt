package com.leetgrind.projectfinder.data.mapper

import com.leetgrind.projectfinder.data.model.response.IdeaResponse
import com.leetgrind.projectfinder.domain.model.Idea

fun IdeaResponse.toIdea() =
    Idea(
        id = id,
        authorName = "${author.firstName} ${author.lastName}",
        title = title,
        tags = tags,
        description = description,
        github = github,
        gigs = gigs
    )