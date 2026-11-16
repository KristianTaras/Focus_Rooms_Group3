package hr.algebra.controller;

import hr.algebra.dto.CreateRoomRequest;
import hr.algebra.dto.RoomResponse;
import hr.algebra.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService rooms;

    public RoomController(RoomService rooms) { this.rooms = rooms; }

    @PostMapping
    public ResponseEntity<RoomResponse> create(@Valid @RequestBody CreateRoomRequest r) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rooms.create(r));
    }
}
