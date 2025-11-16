import { inject, Injectable, signal, TransferState } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getStorageItem, setStorageItem } from '@utils/helpers/storage';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { availableLangCodes, defaultLanguage } from '../constants/const';

import { momentLocales } from '../constants/moment';

export type TLang = 'en' | 'es' | 'ru';
export type TLangName = 'English' | 'Español' | 'Russian';

export function _TRANSLATE(): TranslateFacade {
  return inject(TranslateFacade)
}

@Injectable({ providedIn: 'root' })
export class TranslateFacade {
  initialized = signal(false);

  moment: moment.Moment = moment();

  // private ngxTranslate = inject(TranslateService);

  lang = signal<TLang>('en')

  private langNameMap = new Map([['en', 'English']]);

  availableLanguageCodes: TLang[] = availableLangCodes;

  constructor(
    public ngxTranslate: TranslateService,
    private transferState: TransferState) {
  }

  initTranslate(): void {
    this.ngxTranslate.addLangs(this.availableLanguageCodes);

    const lang = this.getInitialLang();
    const finalLang = this.availableLanguageCodes.includes(lang as TLang)
      ? lang as TLang
      : defaultLanguage;

    this.lang.set(finalLang);
    this.ngxTranslate.setDefaultLang(defaultLanguage);
    this.ngxTranslate.use(finalLang);

    moment.locale(finalLang, momentLocales[finalLang] as any);

    this.initialized.set(true);
  }

  getInitialLang(): string {
    const localLang = getStorageItem('lang');
    if(localLang) return localLang;

    const browserLang = this.ngxTranslate.getBrowserLang()!;
    if(browserLang) return browserLang;
  }

  setLanguage(lang: TLang): void {
    if (!this.availableLanguageCodes.includes(lang)) {
      lang = defaultLanguage;
    }

    setStorageItem('lang', lang);
    this._setLanguage(lang);
  }

  translate$(key: string, variables?: { [key: string]: string }): Observable<string> {
    return this.ngxTranslate.get(key, variables ?? {});
  }

  translate(key: string, variables?: { [key: string]: string | number }): string {
    return this.ngxTranslate.instant(key, variables || []);
  }

  private _setLanguage(lang: TLang): void {
    this.lang.set(lang);
    moment.locale(lang, momentLocales[lang] as any);
    this.ngxTranslate.use(lang);
  }
}
