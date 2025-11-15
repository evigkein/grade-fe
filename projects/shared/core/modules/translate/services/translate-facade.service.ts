import { inject, Injectable, signal, TransferState } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getStorageItem, setStorageItem } from '@utils/helpers/storage';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

import { availableLanguageCodes } from '../constants/available-language-codes';
import { availableLanguageList } from '../constants/available-language-list';
import { defaultLanguage } from '../constants/default-language.constant';
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
  private _currentLanguage$ = new BehaviorSubject<TLang>(defaultLanguage);
  currentLanguage$ = this._currentLanguage$.asObservable();

  availableLanguageCodes: TLang[] = availableLanguageCodes;
  availableLanguageList: string[] = availableLanguageList;

  constructor(
    public ngxTranslate: TranslateService,
    private transferState: TransferState) {
  }

  initTranslate(): void {
    this.ngxTranslate.addLangs(this.availableLanguageCodes);

    const lang = this.getInitialLang();
    const finalLang = this.availableLanguageCodes.includes(lang as TLang) ? lang : defaultLanguage;

    this.ngxTranslate.setDefaultLang(defaultLanguage);
    this.ngxTranslate.use(finalLang);
    this.initialized.set(true);
  }

  getInitialLang(): string {
    const localLang = getStorageItem('lang');
    if(localLang) return localLang;

    const browserLang = this.ngxTranslate.getBrowserLang()!;
    if(browserLang) return browserLang;
  }

  setLanguage(lang: TLang): void {
    console.log(lang);
    if (!this.availableLanguageCodes.includes(lang)) {
      return this._setLanguage(defaultLanguage);
    }
    setStorageItem('lang', lang);
    const localLang = getStorageItem('lang');
    console.log(localLang, 'SET');
    this._setLanguage(lang);
  }

  translate$(key: string, variables?: { [key: string]: string }): Observable<string> {
    return this.ngxTranslate.get(key, variables ?? {});
  }

  translate(key: string, variables?: { [key: string]: string }): string {
    return this.ngxTranslate.instant(key, variables || []);
  }

  private _setLanguage(lang: TLang): void {
    this.lang.set(lang)
    moment.locale(lang, momentLocales[lang] as any)
    this.ngxTranslate.use(lang);
    this._currentLanguage$.next(lang);
  }
}
