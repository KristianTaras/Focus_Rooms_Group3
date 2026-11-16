package hr.algebra.controller;

import hr.algebra.model.User;
import hr.algebra.repository.RoomRepository;
import hr.algebra.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class RoomIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    private Long hostId;

    @BeforeEach
    void setUp() {
        roomRepository.deleteAll();
        userRepository.deleteAll();

        User host = new User();
        host.setEmail("host@example.com");
        host.setUsername("host");
        host.setPasswordHash("hash");
        hostId = userRepository.save(host).getId();
    }

    @AfterEach
    void cleanUp() {
        roomRepository.deleteAll();
    }

    private ResultActions createRoom(Long hostId, Instant startTime, int durationMinutes) throws Exception {
        String body = """
                {"hostId":%d,"startTime":"%s","durationMinutes":%d}
                """.formatted(hostId, startTime, durationMinutes);
        return mockMvc.perform(post("/api/rooms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    private Instant tomorrow() {
        return Instant.now().plus(1, ChronoUnit.DAYS).truncatedTo(ChronoUnit.MINUTES);
    }

    @Test
    void create_validRequest_returns201AndSavesScheduledRoom() throws Exception {
        createRoom(hostId, tomorrow(), 60)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.hostId").value(hostId))
                .andExpect(jsonPath("$.durationMinutes").value(60))
                .andExpect(jsonPath("$.status").value("SCHEDULED"));

        assertThat(roomRepository.count()).isEqualTo(1);
    }

    @Test
    void create_startTimeInPast_returns400() throws Exception {
        createRoom(hostId, Instant.now().minus(1, ChronoUnit.HOURS), 60)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.startTime").exists());

        assertThat(roomRepository.count()).isZero();
    }

    @Test
    void create_durationTooShort_returns400() throws Exception {
        createRoom(hostId, tomorrow(), 10)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.durationMinutes").exists());
    }

    @Test
    void create_durationTooLong_returns400() throws Exception {
        createRoom(hostId, tomorrow(), 255)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.durationMinutes").exists());
    }

    @Test
    void create_durationNotMultipleOf15_returns400() throws Exception {
        createRoom(hostId, tomorrow(), 50)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Duration must be a multiple of 15 minutes"));
    }

    @Test
    void create_unknownHost_returns404() throws Exception {
        createRoom(hostId + 999, tomorrow(), 60)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("User not found"));
    }
}
