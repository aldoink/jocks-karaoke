package com.jockskaraoke.backend

import org.springframework.data.jpa.domain.Specification
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root


interface SongRepository : JpaRepository<Song, Int>, JpaSpecificationExecutor<Song>

fun titleContains(searchTerm: String): Specification<Song?> {
    return Specification { song: Root<Song?>, cq: CriteriaQuery<*>?, cb: CriteriaBuilder ->
        cb.like(song.get("title"), "%$searchTerm%")
    }
}

fun artistContains(searchTerm: String): Specification<Song?> {
    return Specification { song: Root<Song?>, cq: CriteriaQuery<*>?, cb: CriteriaBuilder ->
        cb.like(song.get("artist"), "%$searchTerm%")
    }
}

fun locationContains(searchTerm: String): Specification<Song?> {
    return Specification { song: Root<Song?>, cq: CriteriaQuery<*>?, cb: CriteriaBuilder ->
        cb.like(song.get("location"), "%$searchTerm%")
    }
}