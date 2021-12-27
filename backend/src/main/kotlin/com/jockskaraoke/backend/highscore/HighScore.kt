package com.jockskaraoke.backend.highscore

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "HIGH_SCORE")
data class HighScore(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    val id: Int,
    val name: String,
    val score: Int,
    @Column(name = "SONG_ID")
    val songId: Int
)
