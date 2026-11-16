import { login } from '../../api/authApi'
import { validateLogin } from '../../validation/authValidation'
import FormField from './FormField'
import { useAuthForm } from './useAuthForm'

function LoginForm({ onSuccess }) {
  const { values, errors, serverError, submitting, handleChange, handleSubmit } =
    useAuthForm({ email: '', password: '' }, validateLogin, login, onSuccess)

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <FormField label="Email" name="email" type="email"
        value={values.email} error={errors.email} onChange={handleChange} />
      <FormField label="Lozinka" name="password" type="password"
        value={values.password} error={errors.password} onChange={handleChange} />
      {serverError && <p className="server-error">{serverError}</p>}
      <button type="submit" disabled={submitting}>Prijava</button>
    </form>
  )
}

export default LoginForm
