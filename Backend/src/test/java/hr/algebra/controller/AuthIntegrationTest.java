package hr.algebra.controller;

import hr.algebra.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    // ---------- helpers ----------

    private ResultActions register(String username, String email, String password) throws Exception {
        String body = """
                {"username":"%s","email":"%s","password":"%s"}
                """.formatted(username, email, password);
        return mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    private ResultActions login(String email, String password) throws Exception {
        String body = """
                {"email":"%s","password":"%s"}
                """.formatted(email, password);
        return mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    // ---------- registration ----------

    @Test
    void register_validRequest_returns201AndHidesPassword() throws Exception {
        register("emma_w", "emma.wilson@example.com", "Sunflower#482")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.username").value("emma_w"))
                .andExpect(jsonPath("$.email").value("emma.wilson@example.com"))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(jsonPath("$.passwordHash").doesNotExist());

        var saved = userRepository.findByEmail("emma.wilson@example.com");
        assertThat(saved).isPresent();
        assertThat(saved.get().getPasswordHash()).isNotEqualTo("Sunflower#482");
    }

    @Test
    void register_duplicateEmail_returns409() throws Exception {
        register("emma_w", "emma.wilson@example.com", "Sunflower#482").andExpect(status().isCreated());

        register("james_c", "emma.wilson@example.com", "Sunflower#482")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("Email already exists"));
    }

    @Test
    void register_duplicateUsername_returns409() throws Exception {
        register("emma_w", "emma.wilson@example.com", "Sunflower#482").andExpect(status().isCreated());

        register("emma_w", "james.carter@example.com", "Sunflower#482")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("Username already exists"));
    }

    @Test
    void register_invalidEmail_returns400() throws Exception {
        register("emma_w", "emma.wilson-no-domain", "Sunflower#482")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email").exists());
    }

    @Test
    void register_shortPassword_returns400() throws Exception {
        register("emma_w", "emma.wilson@example.com", "Ab#1")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password").exists());
    }

    // ---------- login ----------

    @Test
    void login_validCredentials_returns200() throws Exception {
        register("emma_w", "emma.wilson@example.com", "Sunflower#482").andExpect(status().isCreated());

        login("emma.wilson@example.com", "Sunflower#482")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("emma_w"))
                .andExpect(jsonPath("$.email").value("emma.wilson@example.com"));
    }

    @Test
    void login_wrongPassword_returns401() throws Exception {
        register("emma_w", "emma.wilson@example.com", "Sunflower#482").andExpect(status().isCreated());

        login("emma.wilson@example.com", "WrongPassword7")
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid email or password"));
    }

    @Test
    void login_unknownEmail_returns401() throws Exception {
        login("olivia.brown@example.com", "Sunflower#482")
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_emptyFields_returns400() throws Exception {
        login("", "")
                .andExpect(status().isBadRequest());
    }

    // ---------- security ----------

    @Test
    void protectedEndpoint_withoutLogin_isRejected() throws Exception {
        mockMvc.perform(get("/api/rooms"))
                .andExpect(status().is4xxClientError());
    }
}