import { useAuth } from '../context/authContext'

function HomePage() {
  const { user } = useAuth()

  return (
    <>
      <h1 className="page-title">Pridruži se prijateljima</h1>
      <div className="card">
        <h2>Bok, {user.username}!</h2>
        <p>Ovdje će uskoro biti aktivne sobe tvojih prijatelja i preporuke za zajedničko učenje.</p>
      </div>
    </>
  )
}

export default HomePage
