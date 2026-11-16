package hr.algebra.repository;

import hr.algebra.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByRoomId(Long roomId);
    boolean existsByRoomIdAndUserId(Long roomId, Long userId);
}
