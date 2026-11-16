import { useState } from 'react'
import { AuthContext } from './authContext'

const STORAGE_KEY = 'focusrooms.user'

function readStoredUser() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

// Pamti prijavljenog korisnika i nakon osvježavanja stranice
function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  function login(loggedInUser) {
    setUser(loggedInUser)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
    } catch {
      // ako spremanje ne uspije, korisnik ostaje prijavljen do osvježavanja
    }
  }

  function logout() {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // nema što očistiti
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
