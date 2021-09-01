package com.jockskaraoke.backend

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/songs")
class SongController(@Autowired val songService: SongService) {

    @GetMapping
    @ResponseBody
    fun findSong(@RequestParam(required = false) searchTerm: String?): List<Song> {
        return songService.findSong(searchTerm)
    }
}