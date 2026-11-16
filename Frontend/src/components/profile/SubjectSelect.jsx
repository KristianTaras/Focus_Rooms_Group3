import { useState } from 'react'
import { SUBJECTS, filterSubjects } from './subjectOptions'
import './SubjectSelect.css'

function SubjectSelect({ selectedIds, onChange, error }) {
  const [query, setQuery] = useState('')
  const visibleSubjects = filterSubjects(SUBJECTS, query)

  function toggleSubject(id) {
    const isSelected = selectedIds.includes(id)
    onChange(isSelected
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id])
  }

  return (
    <div className="form-field subject-select">
      <label htmlFor="subjectSearch">Predmeti interesa</label>
      <input
        id="subjectSearch"
        type="search"
        placeholder="Pretraži predmete…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ul className="subject-select__list" aria-invalid={Boolean(error)}>
        {visibleSubjects.map((subject) => (
          <li key={subject.id}>
            <label className="subject-select__option">
              <input
                type="checkbox"
                checked={selectedIds.includes(subject.id)}
                onChange={() => toggleSubject(subject.id)}
              />
              {subject.name}
            </label>
          </li>
        ))}
        {visibleSubjects.length === 0 && (
          <li className="subject-select__empty">Nema predmeta za „{query}”</li>
        )}
      </ul>

      <span className="subject-select__count">Odabrano: {selectedIds.length}</span>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default SubjectSelect