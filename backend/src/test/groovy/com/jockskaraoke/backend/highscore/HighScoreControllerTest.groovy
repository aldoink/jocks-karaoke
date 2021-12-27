package com.jockskaraoke.backend.highscore

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.jockskaraoke.backend.IntegrationTest
import org.spockframework.spring.EnableSharedInjection
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Shared

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get

@EnableSharedInjection
class HighScoreControllerTest extends IntegrationTest {

    @Autowired
    @Shared
    HighScoreRepository highScoreRepository

    ObjectMapper objectMapper = new ObjectMapper()

    def setupSpec() {
        highScoreRepository.save(new HighScore(0, "Ally", 99, 1))
    }

    def "/highscores - should return high scores matching the given song ID"() {
        when:
        def response = mockMvc.perform(get("/highscores/1")).andReturn()

        then:
        List<HighScore> results = objectMapper.readValue(response.response.getContentAsString(), new TypeReference<List<HighScore>>() {
        })
        results.size() == 1
        results.find { it.name == "Ally" && it.score == 99 } != null
    }
}
