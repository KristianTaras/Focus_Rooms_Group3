import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import AuthPage from './AuthPage'

function LoginPage() {
  const { user, login } = useAuth()
  const [redirectTo, setRedirectTo] = useState('/')

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  function handleRegistered(newUser) {
    setRedirectTo('/dovrsi-profil')
    login(newUser)
  }

  return <AuthPage onLogin={login} onRegistered={handleRegistered} />
}

export default LoginPage
