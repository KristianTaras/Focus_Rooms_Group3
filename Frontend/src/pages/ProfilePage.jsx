import ProfileForm from '../components/profile/ProfileForm'

function ProfilePage() {
  return (
    <>
      <h1 className="page-title">Moj profil</h1>
      <div className="card profile-card">
        <ProfileForm />
      </div>
    </>
  )
}

export default ProfilePage
