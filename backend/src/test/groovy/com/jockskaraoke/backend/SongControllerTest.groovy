package com.jockskaraoke.backend


import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import spock.lang.Specification
import spock.lang.Unroll

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get

class SongControllerTest extends IntegrationTest {

    @Autowired
    SongController songController

    @Autowired
    MockMvc mockMvc

    def "/songs - should return a list of all songs in the DB"() {
        when:
        def response = mockMvc.perform(get("/songs")).andReturn()

        then:
        List<Song> result = responseToSongList(response)
        !result.isEmpty()
        result.find { it.artist == "10cc" } != null
    }

    @Unroll
    def "/songs?searchTerm=#searchTerm - should return a list of songs matching the search term in title"() {
        when:
        def response = mockMvc.perform(get("/songs?searchTerm=${searchTerm}")).andReturn()

        then:
        List<Song> results = responseToSongList(response)
        !results.isEmpty()
        results.find { it.title.containsIgnoreCase(searchTerm) } != null

        where:
        searchTerm << ["just a little", "JUST A LITTLE", "Just a little"]
    }

    @Unroll
    def "/songs?searchTerm - should handle spaces and special characters"() {
        when:
        def response = mockMvc.perform(get("/songs?searchTerm=${searchTerm}")).andReturn()

        then:
        List<Song> results = responseToSongList(response)
        !results.isEmpty()
        results.find {
            it.title.toLowerCase().trim() == searchTerm.toLowerCase() ||
                    it.artist.toLowerCase().trim() == searchTerm.toLowerCase()
        } != null

        where:
        searchTerm << [
                "I'm not in love",
                "AC/DC"
        ]
    }

    private static List<Song> responseToSongList(MvcResult response) {
        new ObjectMapper().readValue(response.response.getContentAsString(), new TypeReference<List<Song>>() {})
    }
}
