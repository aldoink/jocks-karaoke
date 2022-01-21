package com.jockskaraoke.backend.highscore

import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class HighScoreService(
    private val highScoreRepository: HighScoreRepository
) {
    fun findHighscores(songId: Int): List<HighScoreDTO> {
        return highScoreRepository.findAllBySongId(songId).map { HighScoreDTO(it) }
    }

    fun saveHighScore(name: String, score: Int, songId: Int) {
        highScoreRepository.save(HighScore(0, name, score, songId))
    }

    fun deleteHighScore(highScoreId: Int) {
        highScoreRepository.deleteById(highScoreId)
    }
}