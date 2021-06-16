import com.jockskaraoke.main.JocksKaraoke
import kong.unirest.HttpResponse
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class IntegrationTest {

    private lateinit var jocksKaraoke: JocksKaraoke

    @BeforeEach
    fun beforeEach() {
        jocksKaraoke = JocksKaraoke()
    }

    @Test
    internal fun `GET to songs returns 200`() {
        val response: HttpResponse<String>? = Unirest.get("http://localhost:7000/songs").asString()
        assertThat(response?.status).isEqualTo(200)
    }
}