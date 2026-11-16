import { useState } from 'react'
import { useAuthForm } from '../auth/useAuthForm'
import { validateRoom, DURATION_OPTIONS } from '../../validation/roomValidation'
import {
  HOURS,
  MINUTES,
  formatDate,
  formatDuration,
  formatEndTime,
  toStartInstant,
  upcomingDates,
} from './roomTime'
import './RoomScheduleForm.css'

const EMPTY_ROOM = { date: '', hour: '', minute: '00', durationMinutes: '60' }

function toTime({ hour, minute }) {
  return hour ? `${hour}:${minute}` : ''
}

// Forma drži sat i minute odvojeno, a validacija i backend trebaju "HH:MM"
function validateRoomForm(values) {
  return validateRoom({ ...values, time: toTime(values) })
}

// Privremeno dok ne postoji API za kreiranje sobe
async function saveRoomLocally(values) {
  const room = {
    startTime: toStartInstant(values.date, toTime(values)),
    durationMinutes: Number(values.durationMinutes),
  }
  console.log('Soba za spremanje:', room)
  return room
}

function RoomScheduleForm() {
  const [dateOptions] = useState(() => upcomingDates(30))
  const [savedRoom, setSavedRoom] = useState(null)
  const { values, errors, serverError, submitting, handleChange, handleSubmit } =
    useAuthForm(EMPTY_ROOM, validateRoomForm, saveRoomLocally, setSavedRoom)

  function handleFieldChange(event) {
    setSavedRoom(null)
    handleChange(event)
  }

  const time = toTime(values)
  const duration = Number(values.durationMinutes)

  return (
    <form className="auth-form room-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="date">Datum</label>
        <select id="date" name="date" value={values.date}
          onChange={handleFieldChange} aria-invalid={Boolean(errors.date)}>
          <option value="">Odaberi datum</option>
          {dateOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.date && <span className="field-error">{errors.date}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="hour">Vrijeme početka</label>
        <div className="room-form__time">
          <select id="hour" name="hour" value={values.hour} aria-label="Sat"
            onChange={handleFieldChange} aria-invalid={Boolean(errors.time)}>
            <option value="">Sat</option>
            {HOURS.map((hour) => <option key={hour} value={hour}>{hour}</option>)}
          </select>
          <span className="room-form__colon">:</span>
          <select id="minute" name="minute" value={values.minute} aria-label="Minute"
            onChange={handleFieldChange} aria-invalid={Boolean(errors.time)}>
            {MINUTES.map((minute) => <option key={minute} value={minute}>{minute}</option>)}
          </select>
        </div>
        {errors.time && <span className="field-error">{errors.time}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="durationMinutes">Trajanje</label>
        <select id="durationMinutes" name="durationMinutes" value={values.durationMinutes}
          onChange={handleFieldChange} aria-invalid={Boolean(errors.durationMinutes)}>
          {DURATION_OPTIONS.map((minutes) => (
            <option key={minutes} value={minutes}>{formatDuration(minutes)}</option>
          ))}
        </select>
        {errors.durationMinutes && <span className="field-error">{errors.durationMinutes}</span>}
      </div>

      {values.date && time && (
        <p className="room-form__summary">
          {formatDate(values.date)} od <strong>{time}</strong> do{' '}
          <strong>{formatEndTime(values.date, time, duration)}</strong> ({formatDuration(duration)})
        </p>
      )}

      {serverError && <p className="server-error">{serverError}</p>}
      <button type="submit" disabled={submitting}>Zakaži sobu</button>
      {savedRoom && <p className="notice">Termin je zakazan</p>}
    </form>
  )
}

export default RoomScheduleForm
