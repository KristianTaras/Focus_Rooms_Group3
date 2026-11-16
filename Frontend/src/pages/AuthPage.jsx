import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import './AuthPage.css'

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [notice, setNotice] = useState(null)

  const isLogin = mode === 'login'

  function switchMode() {
    setNotice(null)
    setMode(isLogin ? 'register' : 'login')
  }

  function handleRegistered() {
    setNotice('Registracija uspješna, sad se prijavi')
    setMode('login')
  }

  return (
    <main className="auth-page">
      <h1>{isLogin ? 'Prijava' : 'Registracija'}</h1>
      {notice && <p className="notice">{notice}</p>}
      {isLogin
        ? <LoginForm onSuccess={onLogin} />
        : <RegisterForm onSuccess={handleRegistered} />}
      <button type="button" className="link-button" onClick={switchMode}>
        {isLogin ? 'Nemaš račun? Registriraj se' : 'Već imaš račun? Prijavi se'}
      </button>
    </main>
  )
}

export default AuthPage
