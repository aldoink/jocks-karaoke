package com.jockskaraoke.backend.highscore

import org.springframework.data.jpa.repository.JpaRepository

interface HighScoreRepository : JpaRepository<HighScore, Int> {
    fun findAllBySongId(songId: Int): List<HighScore>
    fun findAllByName(name: String): List<HighScore>
}