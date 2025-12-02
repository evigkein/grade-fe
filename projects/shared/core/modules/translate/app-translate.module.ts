import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { COMPILER_OPTIONS, LOCALE_ID, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService, } from '@ngx-translate/core';

import { HttpMultiLoaderFactory } from './loaderds/multi-loader';
import { DynamicLocaleId } from './services/locale-id';
import { TranslateFacade } from './services/translate-facade.service';

@NgModule({
  imports: [
    // HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpMultiLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {provide: COMPILER_OPTIONS, useValue: null},
    {
      provide: LOCALE_ID,
      useClass: DynamicLocaleId,
      deps: [TranslateService],
    },
    TranslateFacade,
    provideHttpClient(withInterceptorsFromDi()),
  ],
  exports: [TranslateModule]
})
export class AppTranslateModule {
  /** Import root only */
  constructor(private translateFacade: TranslateFacade) {
  }
}
