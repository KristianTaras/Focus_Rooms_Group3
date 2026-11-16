package hr.algebra.service;

import hr.algebra.dto.LoginRequest;
import hr.algebra.dto.RegisterRequest;
import hr.algebra.dto.UserResponse;
import hr.algebra.exception.DuplicateUserException;
import hr.algebra.exception.InvalidCredentialsException;
import hr.algebra.model.User;
import hr.algebra.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    private final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, encoder);
    }

    // ---------- register ----------

    @Test
    void register_savesUserWithHashedPassword() {
        when(userRepository.existsByEmail("emma.wilson@example.com")).thenReturn(false);
        when(userRepository.existsByUsername("emma_w")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(1L);
            return u;
        });

        UserResponse response = authService.register(
                new RegisterRequest("emma_w", "emma.wilson@example.com", "Sunflower#482"));

        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.username()).isEqualTo("emma_w");
        assertThat(response.email()).isEqualTo("emma.wilson@example.com");

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        User saved = captor.getValue();
        assertThat(saved.getPasswordHash()).isNotEqualTo("Sunflower#482");
        assertThat(encoder.matches("Sunflower#482", saved.getPasswordHash())).isTrue();
    }

    @Test
    void register_trimsAndLowercasesEmail() {
        when(userRepository.existsByEmail("emma.wilson@example.com")).thenReturn(false);
        when(userRepository.existsByUsername("emma_w")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(1L);
            return u;
        });

        UserResponse response = authService.register(
                new RegisterRequest("emma_w", "  Emma.Wilson@Example.COM ", "Sunflower#482"));

        assertThat(response.email()).isEqualTo("emma.wilson@example.com");

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getEmail()).isEqualTo("emma.wilson@example.com");
    }

    @Test
    void register_duplicateEmail_throwsAndDoesNotSave() {
        when(userRepository.existsByEmail("emma.wilson@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(
                new RegisterRequest("emma_w", "emma.wilson@example.com", "Sunflower#482")))
                .isInstanceOf(DuplicateUserException.class)
                .hasMessage("Email already exists");

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_duplicateUsername_throwsAndDoesNotSave() {
        when(userRepository.existsByEmail("emma.wilson@example.com")).thenReturn(false);
        when(userRepository.existsByUsername("emma_w")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(
                new RegisterRequest("emma_w", "emma.wilson@example.com", "Sunflower#482")))
                .isInstanceOf(DuplicateUserException.class)
                .hasMessage("Username already exists");

        verify(userRepository, never()).save(any());
    }

    // ---------- login ----------

    private User existingUser() {
        User u = new User();
        u.setId(5L);
        u.setUsername("emma_w");
        u.setEmail("emma.wilson@example.com");
        u.setPasswordHash(encoder.encode("Sunflower#482"));
        return u;
    }

    @Test
    void login_validCredentials_returnsUser() {
        when(userRepository.findByEmail("emma.wilson@example.com")).thenReturn(Optional.of(existingUser()));

        UserResponse response = authService.login(
                new LoginRequest("EMMA.WILSON@example.com", "Sunflower#482"));

        assertThat(response.id()).isEqualTo(5L);
        assertThat(response.username()).isEqualTo("emma_w");
        assertThat(response.email()).isEqualTo("emma.wilson@example.com");
    }

    @Test
    void login_unknownEmail_throwsInvalidCredentials() {
        when(userRepository.findByEmail("olivia.brown@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(
                new LoginRequest("olivia.brown@example.com", "Sunflower#482")))
                .isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    void login_wrongPassword_throwsInvalidCredentials() {
        when(userRepository.findByEmail("emma.wilson@example.com")).thenReturn(Optional.of(existingUser()));

        assertThatThrownBy(() -> authService.login(
                new LoginRequest("emma.wilson@example.com", "WrongPassword7")))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessage("Invalid email or password");
    }
}