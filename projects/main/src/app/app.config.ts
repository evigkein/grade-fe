import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom, provideAppInitializer,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation, withInMemoryScrolling,
  withPreloading,
  withRouterConfig, withViewTransitions
} from '@angular/router';
import { langInitializer } from '@core/modules/translate/initializer/translate-bootstrap';
import { provideHammer } from '@core/services/hammer';
import { githubInterceptor } from '@shared/interceptors/cdn.interceptor';
import { routes } from '../routes/app.routes';
import { AppModule } from './app.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      AppModule
    ]),
    provideZonelessChangeDetection(),
    // provideZoneChangeDetection({eventCoalescing: true}),
    routerConfigProviders(),
    provideClientHydration(),
    // provideAppInitializer(() => langInitializer()()),
    provideAnimations(),
    provideHammer(),
  ]
};

function routerConfigProviders(): any {
  return provideRouter(routes,
    withViewTransitions({skipInitialTransition: true}),
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    withRouterConfig({
      paramsInheritanceStrategy: 'always',
    }),
    // withEnabledBlockingInitialNavigation(),
    withPreloading(PreloadAllModules),
    provideHttp(),
    withComponentInputBinding(),
  );
}

function provideHttp(): any {
  return provideHttpClient(withFetch(), withInterceptors([
    githubInterceptor,
    // tokenInterceptor,
    // errorsInterceptor,
  ]));
}
