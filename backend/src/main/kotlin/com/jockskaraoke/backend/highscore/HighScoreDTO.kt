package com.jockskaraoke.backend.highscore

data class HighScoreDTO(
    val name: String,
    val score: Int,
    val songId: Int
) {
    constructor(highScore: HighScore) : this(highScore.name, highScore.score, highScore.songId)
}
