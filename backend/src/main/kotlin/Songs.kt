package com.jockskaraoke.main

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Songs : IntIdTable(name = "SONGS") {
    val location = varchar("location", 30)
    val artist = varchar("artist", 200)
    val title = varchar("title", 200)
}

class Song(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Song>(Songs)
    var location by Songs.location
    var artist by Songs.artist
    var title by Songs.title

    override fun toString(): String {
        return "Song(location='$location', artist='$artist', title='$title')"
    }
}
