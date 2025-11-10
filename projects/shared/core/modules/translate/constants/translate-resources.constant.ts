import { ITranslateResource } from '../interfaces/translate-resource.interface';

const sharedTranslatePath = '/assets/i18n/shared/';
const localTranslatePath = '/assets/i18n/';

export const TRANSLATE_RESOURCES: ITranslateResource[] = [
  // { prefix: sharedTranslatePath, suffix: '.json' },
  { prefix: localTranslatePath, suffix: '.json' },
];
