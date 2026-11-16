import RoomScheduleForm from '../components/rooms/RoomScheduleForm'

function NewRoomPage() {
  return (
    <>
      <h1 className="page-title">Nova fokusna soba</h1>
      <div className="card">
        <RoomScheduleForm />
      </div>
    </>
  )
}

export default NewRoomPage
