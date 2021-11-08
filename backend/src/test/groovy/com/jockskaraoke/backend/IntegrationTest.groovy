package com.jockskaraoke.backend

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.testcontainers.containers.MySQLContainer
import spock.lang.Specification

@AutoConfigureMockMvc
@SpringBootTest
abstract class IntegrationTest extends Specification {

    @Autowired
    MockMvc mockMvc

    ObjectMapper objectMapper = new ObjectMapper()

    private static final MySQLContainer mySQLContainer;

    static {
        mySQLContainer = (MySQLContainer) (new MySQLContainer("mysql")
                .withUsername("testcontainers")
                .withPassword("unimportant")
                .withReuse(true))
        mySQLContainer.start()
    }

    @DynamicPropertySource
    static void setDatasourceProperties(final DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        registry.add("spring.datasource.password", mySQLContainer::getPassword);
        registry.add("spring.datasource.username", mySQLContainer::getUsername);
    }
}
