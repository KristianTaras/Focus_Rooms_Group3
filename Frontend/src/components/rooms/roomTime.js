export const HOURS = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, '0'))
export const MINUTES = ['00', '15', '30', '45']

const DAY_NAMES = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']

function pad(number) {
  return String(number).padStart(2, '0')
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Datum u europskom obliku, npr. "pon, 16.11.2026."
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return `${DAY_NAMES[date.getDay()]}, ${pad(day)}.${pad(month)}.${year}.`
}

// Popis od danas do idućih "days" dana, za padajući izbornik
export function upcomingDates(days = 30, today = new Date()) {
  return Array.from({ length: days }, (_, offset) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    const value = toIsoDate(date)
    return { value, label: formatDate(value) }
  })
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours} h`
  return `${hours} h ${rest} min`
}

// Lokalni datum i vrijeme iz forme pretvara u UTC trenutak (backend sprema startTime u UTC)
export function toStartInstant(date, time) {
  return new Date(`${date}T${time}`).toISOString()
}

export function formatEndTime(date, time, durationMinutes) {
  const end = new Date(new Date(`${date}T${time}`).getTime() + durationMinutes * 60000)
  return `${pad(end.getHours())}:${pad(end.getMinutes())}`
}
