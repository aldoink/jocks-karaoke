package com.jockskaraoke.backend.highscore

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/highscores")
@CrossOrigin
class HighScoreController(private val highScoreService: HighScoreService) {

    @GetMapping("/{songId}")
    fun findHighscores(@PathVariable songId: Int): List<HighScore> {
        return highScoreService.findHighscores(songId)
    }
}