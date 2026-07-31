import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { questions } from './data/questions.js';
import {
  brand,
  lead as leadTexts,
  progress as progressTexts,
  seo,
  start as startTexts,
  thankYou as thankYouTexts,
} from './data/texts.js';
import { getRecommendation } from './lib/recommendations.js';
import { submitLead } from './lib/submitLead.js';
import { ProgressBar } from './components/ProgressBar.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { QuestionScreen } from './components/QuestionScreen.jsx';

const LeadForm = lazy(() =>
  import('./components/LeadForm.jsx').then((m) => ({ default: m.LeadForm })),
);
const ThankYouScreen = lazy(() =>
  import('./components/ThankYouScreen.jsx').then((m) => ({
    default: m.ThankYouScreen,
  })),
);

const STEPS = {
  start: 'start',
  question: 'question',
  lead: 'lead',
  thanks: 'thanks',
};

const AUTO_ADVANCE_MS = 280;

export default function App() {
  const [step, setStep] = useState(STEPS.start);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animKey, setAnimKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submittedRef = useRef(false);
  const advanceTimer = useRef(null);

  const question = questions[index];
  const recommendation = getRecommendation(answers);

  useEffect(() => {
    document.title = seo.title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = seo.description;
  }, []);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const goNext = () => {
    setAnimKey((key) => key + 1);
    if (index >= questions.length - 1) {
      setStep(STEPS.lead);
      return;
    }
    setIndex((prev) => prev + 1);
  };

  const handleStart = () => {
    setAnimKey((key) => key + 1);
    setStep(STEPS.question);
    setIndex(0);
  };

  const handleSelect = (optionId) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);

    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionId,
    }));

    advanceTimer.current = setTimeout(goNext, AUTO_ADVANCE_MS);
  };

  const handleBack = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);

    setAnimKey((key) => key + 1);
    if (step === STEPS.lead) {
      setStep(STEPS.question);
      setIndex(questions.length - 1);
      return;
    }

    if (index === 0) {
      setStep(STEPS.start);
      return;
    }

    setIndex((prev) => prev - 1);
  };

  const handleSubmit = async (form) => {
    if (submittedRef.current || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitLead({
        form,
        answers,
        questions,
        recommendation,
      });
      submittedRef.current = true;
      setAnimKey((key) => key + 1);
      setStep(STEPS.thanks);
    } catch (error) {
      setSubmitError(
        error?.message ||
          'Не удалось отправить заявку. Попробуйте ещё раз чуть позже.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="quiz" key={animKey}>
        {step === STEPS.start && (
          <StartScreen texts={startTexts} brand={brand} onStart={handleStart} />
        )}

        {step === STEPS.question && question && (
          <QuestionScreen
            question={question}
            selectedId={answers[question.id]}
            progressLabel={progressTexts.label(index + 1, questions.length)}
            progressCurrent={index + 1}
            progressTotal={questions.length}
            backLabel={progressTexts.back}
            canGoBack
            onBack={handleBack}
            onSelect={handleSelect}
            ProgressBar={ProgressBar}
          />
        )}

        {step === STEPS.lead && (
          <Suspense fallback={<div className="screen-loading">Загрузка…</div>}>
            <button
              type="button"
              className="btn btn--ghost back-btn"
              onClick={handleBack}
            >
              ← {progressTexts.back}
            </button>
            <LeadForm
              texts={leadTexts}
              recommendation={recommendation}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            {submitError && (
              <p className="form-error" role="alert">
                {submitError}
              </p>
            )}
          </Suspense>
        )}

        {step === STEPS.thanks && (
          <Suspense fallback={<div className="screen-loading">Загрузка…</div>}>
            <ThankYouScreen texts={thankYouTexts} />
          </Suspense>
        )}
      </main>
    </div>
  );
}
