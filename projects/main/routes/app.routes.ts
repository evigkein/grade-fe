import { Routes } from '@angular/router';
import { LayoutComponent } from '../domain/features/layout/layout.component';
import { homeRoute } from './routes/home';
import { portfolioRoute } from './routes/portfolio';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      homeRoute,
      portfolioRoute,
    ]
  }
];
