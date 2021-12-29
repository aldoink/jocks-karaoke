package com.jockskaraoke.backend.highscore

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/highscores")
@CrossOrigin
class HighScoreController(private val highScoreService: HighScoreService) {

    @GetMapping("/{songId}")
    @ResponseBody
    fun findHighscores(@PathVariable songId: Int): List<HighScore> {
        return highScoreService.findHighscores(songId)
    }

    @PutMapping
    fun saveHighScore(@RequestBody request: HighScoreDTO) {
        highScoreService.saveHighScore(request.name, request.score, request.songId)
    }

    @DeleteMapping("/{highScoreId}")
    fun deleteHighScore(@PathVariable highScoreId: Int) {
        highScoreService.deleteHighScore(highScoreId)
    }
}