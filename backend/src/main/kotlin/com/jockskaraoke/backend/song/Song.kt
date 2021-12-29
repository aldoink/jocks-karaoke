package com.jockskaraoke.backend.song

import javax.persistence.*

@Entity
@Table(name = "SONGS")
data class Song(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val location: String,
    val artist: String,
    val title: String
)