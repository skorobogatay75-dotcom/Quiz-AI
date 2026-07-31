import { recommendations } from '../data/texts.js';

const BUSINESS_ROLES = new Set([
  'entrepreneur',
  'marketer',
  'realtor',
  'beauty',
  'online-school',
]);

/**
 * Подбирает тип AI-помощника по ответам квиза.
 * Правила из ТЗ + приоритет явного выбора «что хотелось бы получить».
 */
export function getRecommendation(answers) {
  const { occupation, timeSink, automate, want, priority } = answers;

  if (want === 'need-recommendation') {
    return recommendations.consultation;
  }

  if (want === 'selling-site' || automate === 'website') {
    return recommendations.aiWebsite;
  }

  if (
    want === 'ai-bot' ||
    automate === 'client-replies' ||
    timeSink === 'messaging' ||
    timeSink === 'applications'
  ) {
    return recommendations.botConsultant;
  }

  if (
    (automate === 'content' || timeSink === 'content') &&
    (occupation === 'expert' ||
      occupation === 'coach' ||
      occupation === 'psychologist' ||
      occupation === 'online-school' ||
      occupation === 'marketer')
  ) {
    return recommendations.gptCopywriter;
  }

  if (
    automate === 'content' &&
    occupation === 'expert'
  ) {
    return recommendations.gptCopywriter;
  }

  if (
    (automate === 'sales' ||
      timeSink === 'sales' ||
      timeSink === 'finding-clients' ||
      priority === 'increase-sales' ||
      want === 'auto-funnel') &&
    (BUSINESS_ROLES.has(occupation) || priority === 'more-leads')
  ) {
    return recommendations.salesManager;
  }

  if (
    automate === 'sales' ||
    timeSink === 'sales' ||
    want === 'auto-funnel' ||
    priority === 'increase-sales'
  ) {
    return recommendations.salesManager;
  }

  if (
    automate === 'business-processes' ||
    timeSink === 'routine' ||
    timeSink === 'documents' ||
    priority === 'free-from-routine' ||
    priority === 'save-time' ||
    want === 'gpt-agent'
  ) {
    return recommendations.automationAgent;
  }

  if (automate === 'consultations' || want === 'ai-consultant') {
    return recommendations.botConsultant;
  }

  if (automate === 'booking') {
    return recommendations.botConsultant;
  }

  return recommendations.consultation;
}

export function formatAnswersForEmail(answers, questions) {
  return questions
    .map((question) => {
      const optionId = answers[question.id];
      const option = question.options.find((item) => item.id === optionId);
      return `${question.text}: ${option?.label ?? '—'}`;
    })
    .join('\n');
}
