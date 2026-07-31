const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

export function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  return utm;
}

export function getTrafficSource() {
  const referrer = document.referrer || '';
  const utm = getUtmParams();

  if (utm.utm_source) {
    return utm.utm_campaign
      ? `${utm.utm_source} / ${utm.utm_campaign}`
      : utm.utm_source;
  }

  if (!referrer) return 'Прямой переход';

  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer;
  }
}
