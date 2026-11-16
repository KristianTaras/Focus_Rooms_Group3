package hr.algebra.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class RoomTest {

    @Test
    void newRoom_isScheduled() {
        Room room = new Room();

        assertThat(room.getStatus()).isEqualTo(RoomStatus.SCHEDULED);
    }

    @Test
    void start_changesScheduledToActive() {
        Room room = new Room();

        room.start();

        assertThat(room.getStatus()).isEqualTo(RoomStatus.ACTIVE);
    }

    @Test
    void close_changesActiveToClosed() {
        Room room = new Room();
        room.start();

        room.close();

        assertThat(room.getStatus()).isEqualTo(RoomStatus.CLOSED);
    }

    @Test
    void start_throwsWhenRoomIsAlreadyActive() {
        Room room = new Room();
        room.start();

        assertThatThrownBy(room::start).isInstanceOf(IllegalStateException.class);
    }

    @Test
    void close_throwsWhenRoomIsNotStarted() {
        Room room = new Room();

        assertThatThrownBy(room::close).isInstanceOf(IllegalStateException.class);
    }

    @Test
    void closedRoom_cannotBeStartedAgain() {
        Room room = new Room();
        room.start();
        room.close();

        assertThatThrownBy(room::start).isInstanceOf(IllegalStateException.class);
        assertThat(room.getStatus()).isEqualTo(RoomStatus.CLOSED);
    }
}
