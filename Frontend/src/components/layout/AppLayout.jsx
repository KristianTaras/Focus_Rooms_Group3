import { NavLink, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './AppLayout.css'

const NAV_ITEMS = [
  { to: '/', label: 'Početna', end: true },
  { to: '/sobe/nova', label: 'Nova soba' },
  { to: '/profil', label: 'Moj profil' },
]

function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-topbar">
        <span className="app-topbar__brand">Focus Rooms</span>
        <nav className="app-topbar__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `app-topbar__link${isActive ? ' is-active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <Sidebar />
    </div>
  )
}

export default AppLayout
