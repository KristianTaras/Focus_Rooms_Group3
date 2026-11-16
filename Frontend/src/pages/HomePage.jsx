import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function HomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="auth-page">
      <h1>Bok, {user.username}!</h1>
      <p>Uspješno si prijavljen.</p>
      <p><Link to="/profil">Uredi svoj profil</Link></p>
      <button type="button" onClick={handleLogout}>Odjava</button>
    </main>
  )
}

export default HomePage
