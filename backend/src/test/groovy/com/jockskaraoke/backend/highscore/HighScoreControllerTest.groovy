package com.jockskaraoke.backend.highscore

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.jockskaraoke.backend.IntegrationTest
import org.spockframework.spring.EnableSharedInjection
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import spock.lang.Shared

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@EnableSharedInjection
class HighScoreControllerTest extends IntegrationTest {

    @Autowired
    @Shared
    HighScoreRepository highScoreRepository

    ObjectMapper objectMapper = new ObjectMapper()

    def setupSpec() {
        highScoreRepository.save(new HighScore(0, "Ally", 99, 1))
    }

    def "GET /highscores - should return high scores matching the given song ID"() {
        when:
        def response = mockMvc.perform(get("/highscores/1")).andReturn()

        then:
        List<HighScore> results = objectMapper.readValue(response.response.getContentAsString(), new TypeReference<List<HighScore>>() {
        })
        results.size() == 1
        results.find { it.name == "Ally" && it.score == 99 } != null
    }

    def "PUT /highscores - fails when user is not authenticated"() {
        given:
        def request = new HighScoreDTO("Jenny", 99, 0)

        when:
        mockMvc.perform(
                put("/highscores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isUnauthorized())

        then:
        List<HighScore> highScores = highScoreRepository.findAllByName("Jenny")
        highScores.size() == 0
    }

    @WithMockUser(authorities = ["ROLE_OTHER"])
    def "PUT /highscores - fails when user doesn't have ROLE_USER"() {
        given:
        def request = new HighScoreDTO("Jenny", 99, 0)

        when:
        mockMvc.perform(
                put("/highscores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isForbidden())

        then:
        List<HighScore> highScores = highScoreRepository.findAllByName("Jenny")
        highScores.size() == 0
    }

    @WithMockUser(authorities = ["ROLE_USER"])
    def "PUT /highscores - succeeds when user is authenticated with ROLE_USER"() {
        given:
        def request = new HighScoreDTO("Jenny", 99, 1)

        when:
        mockMvc.perform(
                put("/highscores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isOk())

        then:
        List<HighScore> highScores = highScoreRepository.findAllByName("Jenny")
        highScores.size() == 1
    }

    def "DELETE /highscores - fails when user is not authenticated"() {
        given:
        List<HighScore> highscores = highScoreRepository.findAll()
        def highScoreId = highscores[0].getId()

        when:
        mockMvc.perform(
                delete("/highscores/" + highScoreId)
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isUnauthorized())

        then:
        Optional<HighScore> highScore = highScoreRepository.findById(highScoreId)
        highScore?.isPresent()
    }

    @WithMockUser(authorities = ["ROLE_OTHER"])
    def "DELETE /highscores - fails when user doesn't have ROLE_USER"() {
        given:
        List<HighScore> highscores = highScoreRepository.findAll()
        def highScoreId = highscores[0].getId()

        when:
        mockMvc.perform(
                delete("/highscores/" + highScoreId)
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isForbidden())

        then:
        Optional<HighScore> highScore = highScoreRepository.findById(highScoreId)
        highScore?.isPresent()
    }

    @WithMockUser(authorities = ["ROLE_USER"])
    def "DELETE /highscores - succeeds when user is authenticated with ROLE_USER"() {
        given:
        List<HighScore> highscores = highScoreRepository.findAll()
        def highScoreId = highscores[0].getId()

        when:
        mockMvc.perform(
                delete("/highscores/" + highScoreId)
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())

        then:
        Optional<HighScore> highScore = highScoreRepository.findById(highScoreId)
        highScore?.isPresent() == false
    }
}
