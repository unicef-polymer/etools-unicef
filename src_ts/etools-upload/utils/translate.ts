import translations from '../assets/translations';

export function getTranslation(lang, key) {
  try {
    return translations[lang][key];
  } catch (_error) {
    return translations.en[key];
  }
}
