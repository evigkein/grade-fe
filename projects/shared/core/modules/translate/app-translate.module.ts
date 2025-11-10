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
  /** We need to import it in every lazy loading module */

  /** in order to avoid injecting and initializing in AppComponent in every app we inject here required core providers */
  constructor(private translateFacade: TranslateFacade) {
  }
}
