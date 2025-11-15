import { TLang, TLangName } from '../services';

export const availableLangs: TLangName[] = ['English', 'Español'];
export const availableLangCodes: TLang[] = ['en', 'ru', 'es'];

export const localeMap: Record<string, string> = {
  en: 'en-US',
  ru: 'ru-RU',
  es: 'es-ES',
};

export const defaultLanguage = 'en';
