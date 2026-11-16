import { useState } from 'react'
import FormField from '../auth/FormField'
import { useAuthForm } from '../auth/useAuthForm'
import SubjectSelect from './SubjectSelect'
import {
  validateProfile,
  STUDY_PROGRAMS,
  MIN_YEAR,
  MAX_YEAR,
} from '../../validation/profileValidation'
import './ProfileForm.css'

const EMPTY_PROFILE = {
  firstName: '',
  lastName: '',
  studyProgram: '',
  studyYear: '',
  subjectIds: [],
}

// Privremeno dok ne postoji API za profil (G3FR-207)
async function saveProfileLocally(values) {
  const profile = { ...values, studyYear: Number(values.studyYear) }
  console.log('Profil za spremanje:', profile)
  return profile
}

function ProfileForm() {
  const [saved, setSaved] = useState(false)
  const { values, errors, serverError, submitting, handleChange, handleSubmit } =
    useAuthForm(EMPTY_PROFILE, validateProfile, saveProfileLocally, () => setSaved(true))

  function handleFieldChange(event) {
    setSaved(false)
    handleChange(event)
  }

  // useAuthForm očekuje event, pa listu predmeta šaljemo u istom obliku
  function handleSubjectsChange(subjectIds) {
    handleFieldChange({ target: { name: 'subjectIds', value: subjectIds } })
  }

  return (
    <form className="auth-form profile-form" onSubmit={handleSubmit} noValidate>
      <h2>Moj profil</h2>

      <FormField label="Ime" name="firstName"
        value={values.firstName} error={errors.firstName} onChange={handleFieldChange} />
      <FormField label="Prezime" name="lastName"
        value={values.lastName} error={errors.lastName} onChange={handleFieldChange} />

      <div className="form-field">
        <label htmlFor="studyProgram">Studij</label>
        <select id="studyProgram" name="studyProgram" value={values.studyProgram}
          onChange={handleFieldChange} aria-invalid={Boolean(errors.studyProgram)}>
          <option value="">Odaberi studij</option>
          {STUDY_PROGRAMS.map((program) => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>
        {errors.studyProgram && <span className="field-error">{errors.studyProgram}</span>}
      </div>

      <FormField label={`Godina studija (${MIN_YEAR}–${MAX_YEAR})`} name="studyYear" type="number"
        value={values.studyYear} error={errors.studyYear} onChange={handleFieldChange} />

      <SubjectSelect
        selectedIds={values.subjectIds}
        onChange={handleSubjectsChange}
        error={errors.subjectIds}
      />

      {serverError && <p className="server-error">{serverError}</p>}
      <button type="submit" disabled={submitting}>Spremi profil</button>
      {saved && <p className="notice">Profil spremljen</p>}
    </form>
  )
}

export default ProfileForm