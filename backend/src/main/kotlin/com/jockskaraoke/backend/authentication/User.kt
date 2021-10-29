package com.jockskaraoke.backend.authentication

import javax.persistence.*

@Entity
@Table(
    name = "USERS", uniqueConstraints = [
        UniqueConstraint(columnNames = ["username"]),
        UniqueConstraint(columnNames = ["email"])
    ]
)
class User(
    val username: String,
    val email: String,
    val password: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "USER_ROLES",
        joinColumns = [JoinColumn(name = "USER_ID")],
        inverseJoinColumns = [JoinColumn(name = "ROLE_ID")]
    )
    var roles: Set<RoleEntity> = HashSet()
}