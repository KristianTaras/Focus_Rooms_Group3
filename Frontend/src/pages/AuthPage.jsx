import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import StepIndicator from '../components/ui/StepIndicator'
import './AuthPage.css'

const FEATURES = [
  'Uči u fokusnim sobama s prijateljima',
  'Pronađi kolege s istim kolegijima',
  'Prati svoj napredak kroz sesije',
]

function AuthPage({ onLogin, onRegistered }) {
  const [mode, setMode] = useState('login')

  const isLogin = mode === 'login'

  function changeMode(nextMode) {
    setMode(nextMode)
  }

  return (
    <div className="auth-screen">
      <section className="auth-hero">
        <h1 className="auth-hero__brand">Focus Rooms</h1>
        <p className="auth-hero__tagline">Zajedničko učenje, bez ometanja.</p>
        <ul className="auth-hero__features">
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <main className="auth-panel">
        <div className="card auth-card">
          <div className="auth-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={isLogin}
              className={`auth-tabs__tab${isLogin ? ' is-active' : ''}`}
              onClick={() => changeMode('login')}>
              Prijava
            </button>
            <button type="button" role="tab" aria-selected={!isLogin}
              className={`auth-tabs__tab${!isLogin ? ' is-active' : ''}`}
              onClick={() => changeMode('register')}>
              Registracija
            </button>
          </div>

          <h2 className="auth-card__title">
            {isLogin ? 'Dobro došao natrag' : 'Kreiraj račun'}
          </h2>
          <p className="auth-card__subtitle">
            {isLogin ? 'Prijavi se i nastavi s učenjem.' : 'Dva kratka koraka i spreman si za učenje.'}
          </p>

          {!isLogin && <StepIndicator step={1} total={2} label="Korisnički račun" />}

          {isLogin
            ? <LoginForm onSuccess={onLogin} />
            : <RegisterForm onSuccess={onRegistered} />}

          <button type="button" className="link-button auth-card__switch"
            onClick={() => changeMode(isLogin ? 'register' : 'login')}>
            {isLogin ? 'Nemaš račun? Registriraj se' : 'Već imaš račun? Prijavi se'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default AuthPage
