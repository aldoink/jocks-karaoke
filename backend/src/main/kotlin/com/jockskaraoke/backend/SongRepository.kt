package com.jockskaraoke.backend

import org.springframework.data.repository.CrudRepository

interface SongRepository: CrudRepository<Song, Int> {
}