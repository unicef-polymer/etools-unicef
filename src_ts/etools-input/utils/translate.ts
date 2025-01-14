import translations from '../assets/translations.js';

export function getTranslation(lang: string, key: string) {
  try {
    return (translations as any)[lang][key];
  } catch (_error) {
    return (translations as any).en[key];
  }
}
