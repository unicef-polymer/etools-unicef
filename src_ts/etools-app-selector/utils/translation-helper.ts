// @ts-ignore
import translations from '../assets/translations';

export function getTranslation(lang: string, key: string) {
  try {
    return lang ? (translations as any)[lang][key] : (translations as any).en[key];
  } catch (error) {
    return (translations as any).en[key];
  }
}
