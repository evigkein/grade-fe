import { inject } from '@angular/core';
import { getStorageItem, setStorageItem } from '@utils/helpers/storage';
import { TranslateFacade } from '../services';

export function langInitializer() {
  const translate = inject(TranslateFacade);

  return () => {
    let lang = getStorageItem('lang', false);

    if (!lang) {
      lang = translate.ngxTranslate.getBrowserLang() || 'en';
      setStorageItem('lang', lang);
    }

    translate.ngxTranslate.addLangs(translate.availableLanguageCodes);
    translate.ngxTranslate.setDefaultLang('en');
    translate.ngxTranslate.use(lang);
    translate.lang.set(lang as any);
  };
}
