export const MIN_DURATION = 15
export const MAX_DURATION = 240
export const DURATION_STEP = 15

export const DURATION_OPTIONS = Array.from(
  { length: (MAX_DURATION - MIN_DURATION) / DURATION_STEP + 1 },
  (_, index) => MIN_DURATION + index * DURATION_STEP,
)

// "now" je parametar kako bi se validacija mogla testirati s fiksnim vremenom
export function validateRoom({ date, time, durationMinutes }, now = new Date()) {
  const errors = {}

  if (!date) {
    errors.date = 'Odaberi datum'
  }

  if (!time) {
    errors.time = 'Odaberi vrijeme početka'
  }

  if (date && time && new Date(`${date}T${time}`) <= now) {
    errors.time = 'Termin ne smije biti u prošlosti'
  }

  const duration = Number(durationMinutes)
  if (!Number.isInteger(duration) || duration < MIN_DURATION || duration > MAX_DURATION) {
    errors.durationMinutes = `Trajanje mora biti od ${MIN_DURATION} do ${MAX_DURATION} minuta`
  } else if (duration % DURATION_STEP !== 0) {
    errors.durationMinutes = `Trajanje mora biti višekratnik od ${DURATION_STEP} minuta`
  }

  return errors
}
