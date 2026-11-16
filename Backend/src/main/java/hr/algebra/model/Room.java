package hr.algebra.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Instant startTime;

    @Column(nullable = false)
    private int durationMinutes;

    @ManyToOne(optional = false)
    @JoinColumn(name = "host_id")
    private User host;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomStatus status = RoomStatus.SCHEDULED;

    public Long getId() { return id; }

    public Instant getStartTime() { return startTime; }
    public void setStartTime(Instant startTime) { this.startTime = startTime; }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }

    public User getHost() { return host; }
    public void setHost(User host) { this.host = host; }

    public RoomStatus getStatus() { return status; }

    public void start() {
        if (status != RoomStatus.SCHEDULED) {
            throw new IllegalStateException("Only a scheduled room can be started");
        }
        status = RoomStatus.ACTIVE;
    }

    public void close() {
        if (status != RoomStatus.ACTIVE) {
            throw new IllegalStateException("Only an active room can be closed");
        }
        status = RoomStatus.CLOSED;
    }
}
