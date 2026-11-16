import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

function initials(name) {
  return name.slice(0, 2).toUpperCase()
}

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="app-sidebar">
      <section className="sidebar-user">
        <div className="sidebar-user__avatar">{initials(user.username)}</div>
        <div>
          <p className="sidebar-user__name">{user.username}</p>
          <p className="sidebar-user__status">
            <span className="status-dot status-dot--online" /> Online
          </p>
        </div>
      </section>

      <section className="sidebar-section">
        <h3 className="sidebar-section__title">Prijatelji</h3>
        <p className="sidebar-section__empty">Popis prijatelja dolazi uskoro.</p>
      </section>

      <section className="sidebar-section">
        <h3 className="sidebar-section__title">Ljudi koje možda poznaješ</h3>
        <p className="sidebar-section__empty">Preporuke dolaze uskoro.</p>
      </section>

      <footer className="sidebar-footer">
        <p className="sidebar-footer__room">Nisi u sobi</p>
        <button type="button" className="sidebar-footer__logout" onClick={handleLogout}>
          Odjava
        </button>
      </footer>
    </aside>
  )
}

export default Sidebar
