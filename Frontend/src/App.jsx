import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

function App() {
  const [user, setUser] = useState(null)

  if (user) {
    return <HomePage user={user} onLogout={() => setUser(null)} />
  }

  return <AuthPage onLogin={setUser} />
}

export default App
