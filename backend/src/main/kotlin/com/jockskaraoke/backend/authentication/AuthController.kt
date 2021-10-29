package com.jockskaraoke.backend.authentication

import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import java.util.stream.Collectors


@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val encoder: PasswordEncoder,
    private val jwtUtils: JwtUtils
) {
    @PostMapping("/login")
    fun authenticateUser(@RequestBody loginRequest: LoginRequest): ResponseEntity<JwtResponse> {
        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
        )

        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtUtils.generateJwtToken(authentication)

        val userDetails = authentication.principal as UserDetailsImpl
        val roles = userDetails.authorities.stream()
            .map { item: GrantedAuthority -> item.authority }
            .collect(Collectors.toList())

        return ResponseEntity.ok(
            JwtResponse(
                jwt!!,
                userDetails.id,
                userDetails.username,
                userDetails.email,
                roles
            )
        )
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody registerRequest: RegisterRequest): ResponseEntity<Any> {
        if (userRepository.existsByUsername(registerRequest.username)) {
            return ResponseEntity.badRequest().body(MessageResponse("Error: Username is already taken!"))
        }
        if (userRepository.existsByEmail(registerRequest.email)) {
            return ResponseEntity.badRequest().body(MessageResponse("Error: E-mail is already in use!"))
        }

        val user = User(
            registerRequest.username,
            registerRequest.email,
            encoder.encode(registerRequest.password)
        )

        val strRoles: Set<Role>? = registerRequest.role
        val roles = HashSet<RoleEntity>()

        if (strRoles == null) {
            val userRole = roleRepository.findByName(Role.ROLE_USER)
                .orElseThrow { RuntimeException("Error: Role is not found.") }
            roles.add(userRole)
        } else {
            val roleNotFoundException = RuntimeException("Error: Role is not found")
            strRoles.forEach { role ->
                when (role) {
                    Role.ROLE_USER -> {
                        val userRole = roleRepository.findByName(role).orElseThrow { roleNotFoundException }
                        roles.add(userRole)
                    }
                    Role.ROLE_ADMIN -> {
                        val adminRole = roleRepository.findByName(role).orElseThrow { roleNotFoundException }
                        roles.add(adminRole)
                    }
                }
            }
        }
        user.roles = roles
        userRepository.save(user)

        return ResponseEntity.ok(MessageResponse("User registered successfully!"))
    }
}