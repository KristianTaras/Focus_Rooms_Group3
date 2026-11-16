export const STUDY_PROGRAMS = [
  'Programsko inženjerstvo',
  'Podatkovna znanost i umjetna inteligencija',
  'Ekonomija digitalnog poslovanja',
  'Psihologija',
  'Kibernetička sigurnost',
  'Razvoj računalnih igara',
  'Digitalni marketing',
  'Dizajn',
  'Multimedijska produkcija',
  'Komunikacijski menadžment',
  'Računarstvo (diplomski)',
  'Primijenjeno računarstvo (diplomski)',
  'Odnosi s javnošću (diplomski)',
]

export const MIN_YEAR = 1
export const MAX_YEAR = 5

export function validateProfile({ firstName, lastName, studyProgram, studyYear }) {
  const errors = {}

  if (firstName.trim().length < 2) {
    errors.firstName = 'Ime je obavezno (najmanje 2 znaka)'
  }

  if (lastName.trim().length < 2) {
    errors.lastName = 'Prezime je obavezno (najmanje 2 znaka)'
  }

  if (!STUDY_PROGRAMS.includes(studyProgram)) {
    errors.studyProgram = 'Odaberi studij'
  }

  const year = Number(studyYear)
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) {
    errors.studyYear = `Godina studija mora biti od ${MIN_YEAR} do ${MAX_YEAR}`
  }

  return errors
}