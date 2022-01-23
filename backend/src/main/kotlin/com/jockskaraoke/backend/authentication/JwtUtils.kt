package com.jockskaraoke.backend.authentication

import io.jsonwebtoken.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtils(
    @Value("\${jwt.expirationMs}") private val jwtExpirationMs: Int,
    @Value("\$jwt.secret") private val jwtSecret: String
) {
    private val logger = LoggerFactory.getLogger(JwtUtils::class.java)

    fun generateJwtToken(authentication: Authentication): String? {
        val userPrincipal = authentication.principal as UserDetailsImpl
        return Jwts.builder()
            .setSubject(userPrincipal.email)
            .setIssuedAt(Date())
            .setExpiration(Date(Date().getTime() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS256, jwtSecret)
            .compact()
    }

    fun validateJwtToken(authToken: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (e: SignatureException) {
            logger.error("Invalid JWT signature: {}", e.message);
        } catch (e: MalformedJwtException) {
            logger.error("Invalid JWT token: {}", e.message);
        } catch (e: ExpiredJwtException) {
            logger.error("JWT token is expired: {}", e.message);
        } catch (e: UnsupportedJwtException) {
            logger.error("JWT token is unsupported: {}", e.message);
        } catch (e: IllegalArgumentException) {
            logger.error("JWT claims string is empty: {}", e.message);
        }

        return false;
    }

    fun getUserNameFromJwtToken(token: String): String {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).body.subject;
    }

}
