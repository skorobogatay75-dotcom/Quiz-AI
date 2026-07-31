export function ProgressBar({ current, total, label }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="progress" role="status" aria-live="polite">
      <div className="progress__meta">
        <span className="progress__label">{label}</span>
        <span className="progress__percent">{percent}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={label}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
