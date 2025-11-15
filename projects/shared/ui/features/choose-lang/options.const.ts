import { TLang } from '@core/modules/translate/services/translate-facade.service';

interface IUserLangOption {
  title: string;
  icon: string;
  action: TLang;
};

export const langOptions: IUserLangOption[] = [
  {
    title: 'English',
    icon: 'en',
    action: 'en'
  },
  {
    title: 'Russian',
    icon: 'ru',
    action: 'ru',
  },
  {
    title: 'Español',
    icon: 'es',
    action: 'es'
  },
];
