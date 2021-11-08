package com.jockskaraoke.backend.authentication

import com.jockskaraoke.backend.IntegrationTest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import javax.transaction.Transactional

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Transactional
class AuthControllerTest extends IntegrationTest {

    @Autowired
    UserRepository userRepository

    def "RegisterUser"() {
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
        user.get().getRoles().find({it -> it.name == Role.ROLE_USER})
    }
}
