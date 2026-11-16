import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import AuthPage from './AuthPage'

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/" replace />
  }

  function handleLogin(loggedInUser) {
    login(loggedInUser)
    navigate('/', { replace: true })
  }

  return <AuthPage onLogin={handleLogin} />
}

export default LoginPage
