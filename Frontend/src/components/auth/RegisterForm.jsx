import { registerAndLogin } from '../../api/authApi'
import { validateRegister } from '../../validation/authValidation'
import FormField from './FormField'
import { useAuthForm } from './useAuthForm'

const EMPTY_ACCOUNT = { username: '', email: '', password: '', confirmPassword: '' }

function RegisterForm({ onSuccess }) {
  const { values, errors, serverError, submitting, handleChange, handleSubmit } =
    useAuthForm(EMPTY_ACCOUNT, validateRegister, registerAndLogin, onSuccess)

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <FormField label="Korisničko ime" name="username"
        value={values.username} error={errors.username} onChange={handleChange} />
      <FormField label="Email" name="email" type="email"
        value={values.email} error={errors.email} onChange={handleChange} />
      <FormField label="Lozinka" name="password" type="password"
        value={values.password} error={errors.password} onChange={handleChange} />
      <FormField label="Ponovi lozinku" name="confirmPassword" type="password"
        value={values.confirmPassword} error={errors.confirmPassword} onChange={handleChange} />
      {serverError && <p className="server-error">{serverError}</p>}
      <button type="submit" disabled={submitting}>Dalje →</button>
    </form>
  )
}

export default RegisterForm
