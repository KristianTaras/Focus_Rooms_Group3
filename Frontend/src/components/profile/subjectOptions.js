// Privremeni popis dok backend ne vrati početni popis kolegija (G3FR-207)
export const SUBJECTS = [
  { id: 1, name: 'Matematika 1' },
  { id: 2, name: 'Matematika 2' },
  { id: 3, name: 'Programiranje' },
  { id: 4, name: 'Objektno orijentirano programiranje' },
  { id: 5, name: 'Strukture podataka i algoritmi' },
  { id: 6, name: 'Baze podataka' },
  { id: 7, name: 'Web tehnologije' },
  { id: 8, name: 'Operacijski sustavi' },
  { id: 9, name: 'Računalne mreže' },
  { id: 10, name: 'Programsko inženjerstvo' },
  { id: 11, name: 'Statistika' },
  { id: 12, name: 'Engleski jezik' },
]

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function filterSubjects(subjects, query) {
  const search = normalize(query)
  if (!search) return subjects
  return subjects.filter((subject) => normalize(subject.name).includes(search))
}