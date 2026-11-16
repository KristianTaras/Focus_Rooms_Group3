function errorMessage(status, data) {
  if (status === 401) return 'Pogrešan email ili lozinka'
  if (status === 409) {
    if (data.error === 'Email already exists') return 'Taj email je već registriran'
    if (data.error === 'Username already exists') return 'To korisničko ime je zauzeto'
    return 'Korisnik već postoji'
  }
  if (status === 400) return 'Provjeri unesene podatke'
  if (status >= 500) return 'Server nije dostupan, pokušaj kasnije'
  return 'Nešto nije u redu, pokušaj ponovo'
}

async function post(url, body) {
  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Server nije dostupan, pokušaj kasnije')
  }

  if (response.ok) return response.json()

  const data = await response.json().catch(() => ({}))
  throw new Error(errorMessage(response.status, data))
}

export function register({ username, email, password }) {
  return post('/api/auth/register', { username, email, password })
}

export function login({ email, password }) {
  return post('/api/auth/login', { email, password })
}
