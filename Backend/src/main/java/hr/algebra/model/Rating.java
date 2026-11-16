package hr.algebra.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.time.Instant;

@Entity
@Table(name = "ratings",
        uniqueConstraints = @UniqueConstraint(columnNames = {"room_id", "user_id"}))
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private int score;

    @Size(max = 500)
    @Column(length = 500)
    private String comment;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public Long getId() { return id; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Instant getCreatedAt() { return createdAt; }
}
