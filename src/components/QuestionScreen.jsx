export function QuestionScreen({
  question,
  selectedId,
  progressLabel,
  progressCurrent,
  progressTotal,
  backLabel,
  canGoBack,
  onBack,
  onSelect,
  ProgressBar,
}) {
  return (
    <section
      className="screen screen--question"
      aria-labelledby={`question-${question.id}`}
    >
      <ProgressBar
        current={progressCurrent}
        total={progressTotal}
        label={progressLabel}
      />

      {canGoBack && (
        <button type="button" className="btn btn--ghost back-btn" onClick={onBack}>
          ← {backLabel}
        </button>
      )}

      <h2 id={`question-${question.id}`} className="screen__title screen__title--sm">
        {question.text}
      </h2>

      <div
        className="options"
        role="radiogroup"
        aria-labelledby={`question-${question.id}`}
      >
        {question.options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`option-card${isSelected ? ' is-selected' : ''}`}
              onClick={() => onSelect(option.id)}
            >
              <span className="option-card__label">{option.label}</span>
              <span className="option-card__mark" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
