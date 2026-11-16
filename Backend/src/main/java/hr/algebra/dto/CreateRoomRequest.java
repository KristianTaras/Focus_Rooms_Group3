package hr.algebra.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record CreateRoomRequest(
        @NotNull Long hostId,
        @NotNull @Future Instant startTime,
        @NotNull @Min(15) @Max(240) Integer durationMinutes
) {}
