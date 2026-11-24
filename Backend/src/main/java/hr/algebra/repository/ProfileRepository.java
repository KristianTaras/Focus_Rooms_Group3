package hr.algebra.repository;

import hr.algebra.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

// The profile id is the same as the user id
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
