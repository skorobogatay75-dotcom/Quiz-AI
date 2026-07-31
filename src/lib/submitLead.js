import { formatAnswersForEmail } from './recommendations.js';
import { getTrafficSource, getUtmParams } from './utm.js';

const RECIPIENT = 'skorobogatay75@gmail.com';

async function fetchClientIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return 'недоступен';
    const data = await response.json();
    return data.ip || 'недоступен';
  } catch {
    return 'недоступен';
  }
}

function buildPayload({ form, answers, questions, recommendation }) {
  const utm = getUtmParams();

  return {
    _subject: `Заявка с AI-квиза: ${form.name}`,
    _template: 'table',
    Дата: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
    Имя: form.name,
    Телефон: form.phone,
    Email: form.email || 'не указан',
    Комментарий: form.comment || '—',
    'Рекомендованный тип AI-помощника': recommendation.title,
    'Описание рекомендации': recommendation.description,
    'Ответы квиза': formatAnswersForEmail(answers, questions),
    'UTM-метки': Object.keys(utm).length
      ? JSON.stringify(utm)
      : 'нет',
    'Источник перехода': getTrafficSource(),
    'User-Agent': navigator.userAgent,
  };
}

/**
 * Отправка заявки на почту через FormSubmit (без серверного бэкенда).
 * При первой отправке FormSubmit просит подтвердить адрес получателя.
 */
export async function submitLead(data) {
  const ip = await fetchClientIp();
  const payload = {
    ...buildPayload(data),
    IP: ip,
  };

  const response = await fetch(
    `https://formsubmit.co/ajax/${RECIPIENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Не удалось отправить заявку');
  }

  return response.json();
}
