package hr.algebra.service;

import hr.algebra.dto.LoginRequest;
import hr.algebra.dto.RegisterRequest;
import hr.algebra.dto.UserResponse;
import hr.algebra.exception.DuplicateUserException;
import hr.algebra.exception.InvalidCredentialsException;
import hr.algebra.model.User;
import hr.algebra.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    public UserResponse register(RegisterRequest r){
        String email = r.email().trim().toLowerCase();
        if(users.existsByEmail(email)){
            throw new DuplicateUserException("Email already exists");
        }
        if(users.existsByUsername(r.username())){
            throw new DuplicateUserException("Username already exists");
        }

        User u = new User();
        u.setEmail(email);
        u.setUsername(r.username());
        u.setPasswordHash(encoder.encode(r.Password()));
        return UserResponse.from(users.save(u));

    }

    public UserResponse login(LoginRequest r){
        User u = users.findByEmail(r.email().trim().toLowerCase())
                .orElseThrow(InvalidCredentialsException::new);
        if(!encoder.matches(r.password(), u.getPasswordHash())){
            throw new InvalidCredentialsException();
        }
        return UserResponse.from(u);
    }

}
