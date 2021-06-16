package com.jockskaraoke.backend

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/songs")
class SongController(@Autowired val songService: SongService) {

    @GetMapping
    @ResponseBody
    fun listAllSongs(): List<Song> {
        return songService.listAllSongs()
    }
}