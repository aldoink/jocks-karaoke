package com.jockskaraoke.backend.song

import org.springframework.data.jpa.domain.Specification.where
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class SongService(
    private val songRepository: SongRepository
) {
    fun findSong(searchTerm: String?): List<Song> {
        if (searchTerm == null) {
            return songRepository.findAll().toList().sortedBy { it.location }
        }
        return songRepository.findAll(
            where(artistContains(searchTerm))
                .or(titleContains(searchTerm))
                .or(locationContains(searchTerm))
        ).toList().sortedBy { it.location }
    }
}