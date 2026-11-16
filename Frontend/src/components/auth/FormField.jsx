function FormField({ label, name, type = 'text', value, error, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default FormField
