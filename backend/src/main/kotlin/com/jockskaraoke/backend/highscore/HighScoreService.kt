package com.jockskaraoke.backend.highscore

import com.jockskaraoke.backend.song.Song
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class HighScoreService(
    private val highScoreRepository: HighScoreRepository
) {
    fun findHighscores(songId: Int): List<HighScore> {
        return highScoreRepository.findAllBySongId(songId)
    }
}