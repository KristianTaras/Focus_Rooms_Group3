const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email) {
  if (!email.trim()) return 'Email je obavezan'
  if (!EMAIL_REGEX.test(email.trim())) return 'Email nije ispravan'
  return null
}

export function validateLogin({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Lozinka je obavezna'
  return errors
}

export function validateRegister({ username, email, password, confirmPassword }) {
  const errors = {}
  const name = username.trim()
  if (name.length < 3 || name.length > 20) {
    errors.username = 'Korisničko ime mora imati 3 do 20 znakova'
  }
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (password.length < 8 || password.length > 20) {
    errors.password = 'Lozinka mora imati 8 do 20 znakova'
  }
  if (confirmPassword !== password) {
    errors.confirmPassword = 'Lozinke se ne podudaraju'
  }
  return errors
}
