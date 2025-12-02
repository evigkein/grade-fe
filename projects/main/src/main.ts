import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  /** FIXES SSR flicking bug */
  .then(() => {document.querySelector('app-root')?.classList.add('hydrated')})
  .catch((err) => console.error(err));
