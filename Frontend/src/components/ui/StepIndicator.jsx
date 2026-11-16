import './StepIndicator.css'

function StepIndicator({ step, total, label }) {
  return (
    <div className="step-indicator">
      <span className="step-indicator__text">Korak {step} od {total} – {label}</span>
      <div className="step-indicator__bar">
        <div className="step-indicator__fill" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  )
}

export default StepIndicator
