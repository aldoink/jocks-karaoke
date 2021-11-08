package com.jockskaraoke.backend.song

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "SONGS")
data class Song(
    @Id
    @GeneratedValue
    val id: Int,
    val location: String,
    val artist: String,
    val title: String
)