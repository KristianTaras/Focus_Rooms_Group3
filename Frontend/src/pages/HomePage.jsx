function HomePage({ user, onLogout }) {
  return (
    <main className="auth-page">
      <h1>Bok, {user.username}!</h1>
      <p>Uspješno si prijavljen.</p>
      <button type="button" onClick={onLogout}>Odjava</button>
    </main>
  )
}

export default HomePage
