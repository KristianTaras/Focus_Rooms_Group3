package hr.algebra.dto;

import hr.algebra.model.User;

public record UserResponse(long id, String username, String email) {
    public static UserResponse from (User u){
        return new UserResponse(u.getId(), u.getUsername(), u.getEmail());
    }
}
