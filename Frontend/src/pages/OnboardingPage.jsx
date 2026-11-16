import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import ProfileForm from '../components/profile/ProfileForm'
import StepIndicator from '../components/ui/StepIndicator'
import './OnboardingPage.css'

function OnboardingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <main className="onboarding">
      <div className="card onboarding__card">
        <StepIndicator step={2} total={2} label="Profil i kolegiji" />
        <h1 className="onboarding__title">Dovrši profil, {user.username}</h1>
        <p className="onboarding__subtitle">
          Na temelju studija i kolegija preporučit ćemo ti sobe i kolege za učenje.
        </p>

        <ProfileForm submitLabel="Završi registraciju"
          onSaved={() => navigate('/', { replace: true })} />

        <Link to="/" className="onboarding__skip">Preskoči za sada</Link>
      </div>
    </main>
  )
}

export default OnboardingPage
