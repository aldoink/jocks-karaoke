package com.jockskaraoke.backend.authentication

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String
) {
    var role: Set<Role>? = null
}

data class JwtResponse(
    val token: String,
    val id: Long,
    val username: String,
    val email: String,
    val roles: List<String>
) {
    val type: String = "Bearer"
}

data class MessageResponse(
    val message: String
)