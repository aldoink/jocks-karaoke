package com.jockskaraoke.backend.authentication

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RoleRepository : JpaRepository<RoleEntity, Long> {
    fun findByName(name: Role): Optional<RoleEntity>
}