package hr.algebra.service;

import hr.algebra.dto.CreateRoomRequest;
import hr.algebra.dto.RoomResponse;
import hr.algebra.exception.InvalidRoomException;
import hr.algebra.exception.UserNotFoundException;
import hr.algebra.model.Room;
import hr.algebra.model.User;
import hr.algebra.repository.RoomRepository;
import hr.algebra.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    private final RoomRepository rooms;
    private final UserRepository users;

    public RoomService(RoomRepository rooms, UserRepository users) {
        this.rooms = rooms;
        this.users = users;
    }

    public RoomResponse create(CreateRoomRequest r) {
        if (r.durationMinutes() % 15 != 0) {
            throw new InvalidRoomException("Duration must be a multiple of 15 minutes");
        }
        User host = users.findById(r.hostId()).orElseThrow(UserNotFoundException::new);

        Room room = new Room();
        room.setHost(host);
        room.setStartTime(r.startTime());
        room.setDurationMinutes(r.durationMinutes());
        return RoomResponse.from(rooms.save(room));
    }
}
