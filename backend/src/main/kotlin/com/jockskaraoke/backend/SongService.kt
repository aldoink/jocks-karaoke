package com.jockskaraoke.backend

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class SongService(
    private val songRepository: SongRepository
) {
    fun listAllSongs(): List<Song> {
        return songRepository.findAll().toList()
    }
}