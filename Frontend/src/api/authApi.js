async function post(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Zahtjev nije uspio (${response.status})`)
  }

  return response.json()
}

export function register({ username, email, password }) {
  return post('/api/auth/register', { username, email, password })
}

export function login({ email, password }) {
  return post('/api/auth/login', { email, password })
}
