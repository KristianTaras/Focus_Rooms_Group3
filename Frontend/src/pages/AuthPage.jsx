import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import './AuthPage.css'

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [user, setUser] = useState(null)

  if (user) {
    return (
      <main className="auth-page">
        <p>Prijavljen kao <strong>{user.username}</strong></p>
      </main>
    )
  }

  const isLogin = mode === 'login'

  return (
    <main className="auth-page">
      <h1>{isLogin ? 'Prijava' : 'Registracija'}</h1>
      {isLogin
        ? <LoginForm onSuccess={setUser} />
        : <RegisterForm onSuccess={() => setMode('login')} />}
      <button type="button" className="link-button"
        onClick={() => setMode(isLogin ? 'register' : 'login')}>
        {isLogin ? 'Nemaš račun? Registriraj se' : 'Već imaš račun? Prijavi se'}
      </button>
    </main>
  )
}

export default AuthPage
