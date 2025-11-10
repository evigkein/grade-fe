import { TranslateService as NGXTranslateService } from '@ngx-translate/core';

export class DynamicLocaleId extends String {
  constructor(protected ngxTranslateService: NGXTranslateService) {
    super();
  }

  override toString(): string {
    return this.ngxTranslateService.currentLang;
  }
}
