import { useState } from 'react'

export function useAuthForm(initialValues, validate, submit, onSuccess) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setServerError(null)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      const user = await submit(values)
      onSuccess(user)
    } catch (error) {
      setServerError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return { values, errors, serverError, submitting, handleChange, handleSubmit }
}
