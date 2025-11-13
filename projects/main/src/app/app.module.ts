import { CommonModule, registerLocaleData } from '@angular/common';
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppTranslateModule } from '@core/modules/translate';
import { ApiModule } from '@shared/domain/api/swagger/api.module';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
// import { ApiModule } from './domain/api/swagger/api.module';
import {IconsModule} from '../../icons/icons.module';
import localeRu from '@angular/common/locales/ru';

const TRANSFERRED_MODULES = [CommonModule, AppTranslateModule, IconsModule];

registerLocaleData(localeRu, 'ru');

@NgModule({
  imports: [...TRANSFERRED_MODULES,
    ApiModule,

  ],
  declarations: [],
  exports: [],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
})
export class AppModule {
}
