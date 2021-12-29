package com.jockskaraoke.backend.highscore

data class HighScoreDTO(
    val name: String,
    val score: Int,
    val songId: Int
)
