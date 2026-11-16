package hr.algebra.dto;

import hr.algebra.model.Room;
import hr.algebra.model.RoomStatus;

import java.time.Instant;

public record RoomResponse(long id, Instant startTime, int durationMinutes, long hostId, RoomStatus status) {
    public static RoomResponse from(Room r) {
        return new RoomResponse(r.getId(), r.getStartTime(), r.getDurationMinutes(), r.getHost().getId(), r.getStatus());
    }
}
