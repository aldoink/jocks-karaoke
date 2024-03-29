package com.jockskaraoke.backend.song

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/songs")
class SongController(@Autowired val songService: SongService) {

    @CrossOrigin
    @GetMapping
    @ResponseBody
    fun findSong(@RequestParam(required = false) searchTerm: String?): List<Song> {
        return songService.findSong(searchTerm)
    }
}