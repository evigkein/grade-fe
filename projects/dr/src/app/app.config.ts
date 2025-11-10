import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners, provideZoneChangeDetection,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withRouterConfig
} from '@angular/router';
import { AppModule } from '../../../main/src/app/app.module';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      // AppModule
    ]),
    provideBrowserGlobalErrorListeners(),
    routerConfigProviders(),
    provideClientHydration(
      withEventReplay(),
    ),
    // provideHammer(),
    provideAnimations(),
    provideZonelessChangeDetection(),
  ]
};

function routerConfigProviders(): any {
  return provideRouter(routes,
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
    // tokenInterceptor,
    // errorsInterceptor,
  ]));
}
