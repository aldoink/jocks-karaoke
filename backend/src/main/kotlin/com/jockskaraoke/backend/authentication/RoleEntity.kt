package com.jockskaraoke.backend.authentication

import javax.persistence.*

@Entity
@Table(name = "ROLES")
class RoleEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    val name: Role
)