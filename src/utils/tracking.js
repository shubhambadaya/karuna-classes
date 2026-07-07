const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];
const STORAGE_KEY = 'karuna_utm_params';

export function captureUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const hasUTM = UTM_KEYS.some((key) => params.has(key));

  if (!hasUTM) return;

  const utmData = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utmData[key] = value;
  });

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmData));
}

export function getUTMParams() {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return {
      utm_source: parsed.utm_source || null,
      utm_medium: parsed.utm_medium || null,
      utm_campaign: parsed.utm_campaign || null,
    };
  } catch {
    return null;
  }
}

export function getCurrentPage() {
  return window.location.pathname;
}
