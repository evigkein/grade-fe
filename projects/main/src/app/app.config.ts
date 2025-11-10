import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withPreloading,
  withRouterConfig
} from '@angular/router';
import { provideHammer } from '@core/services/hammer';
import { routes } from '../../routes/app.routes';
import { AppModule } from './app.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      AppModule
    ]),
    provideZoneChangeDetection({eventCoalescing: true}),
    routerConfigProviders(),
    provideClientHydration(
      withEventReplay(),
      // PIPELINE WAS FROZEN!!!!
      // withHttpTransferCacheOptions({
      //   includeHeaders: ['ETag', 'Cache-Control'],
      //   // filter: (req) => !req.url.includes('/api/profile'),
      //   includePostRequests: true,
      //   includeRequestsWithAuthHeaders: false,
      // }),
    ),
    provideAnimations(),
    provideHammer(),
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
