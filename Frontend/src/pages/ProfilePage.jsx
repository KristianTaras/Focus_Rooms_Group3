import { Link } from 'react-router-dom'
import ProfileForm from '../components/profile/ProfileForm'

function ProfilePage() {
  return (
    <main className="auth-page">
      <Link to="/">← Natrag na početnu</Link>
      <ProfileForm />
    </main>
  )
}

export default ProfilePage
