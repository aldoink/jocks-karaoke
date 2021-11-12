package com.jockskaraoke.backend.authentication

import com.jockskaraoke.backend.IntegrationTest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser

import javax.transaction.Transactional

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Transactional
class AuthControllerTest extends IntegrationTest {

    @Autowired
    UserRepository userRepository

    def "/auth/register - assigns ROLE_USER when no roles are provided"() {
        given:
        def request = new RegisterRequest("someUser92", "valid@email.com", "shittypassword")

        when:
        mockMvc.perform(
                post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        ).andExpect(status().is2xxSuccessful())

        then:
        Optional<User> user = userRepository.findByUsername("someUser92")
        user.get() != null
        user.get().getRoles().find({ it -> it.name == Role.ROLE_USER })
    }

    def "/auth/register - fails when attempting to assign ROLE_ADMIN without valid auth token"() {
        given:
        def request = new RegisterRequest("someUser92", "valid@email.com", "shittypassword")
        request.role = new HashSet<Role>()
        request.role.add(Role.ROLE_ADMIN)

        when:
        mockMvc.perform(
                post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("\$.message").value("Only Admin users can create new Admins"))

        then:
        Optional<User> user = userRepository.findByUsername("someUser92")
        user == Optional.empty()
    }

    @WithMockUser(authorities = ["ROLE_ADMIN", "ROLE_USER"])
    def "/auth/register - succeeds when user has admin role"() {
        def username = "someAdmin"
        given:
        def request = new RegisterRequest(username, "valid@email.com", "shittypassword")
        request.role = new HashSet<Role>()
        request.role.add(Role.ROLE_ADMIN)

        when:
        mockMvc.perform(
                post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isOk())

        then:
        Optional<User> user = userRepository.findByUsername(username)
        user != Optional.empty()
        user.get() != null
        user.get().getRoles().find({ it -> it.name == Role.ROLE_ADMIN })
    }
}
