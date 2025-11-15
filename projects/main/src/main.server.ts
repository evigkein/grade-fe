import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// @ts-ignore
const bootstrap = (context) => bootstrapApplication(AppComponent, config,
  // @ts-ignore
  context as any,
);

// @ts-ignore
export default bootstrap;
