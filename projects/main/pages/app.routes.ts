import { Routes } from '@angular/router';
import { LayoutComponent } from '../domain/features/layout/layout.component';
import { homeRoute } from './home/home.route';
import { portfolioRoute } from './portfolio/portfolio.route';

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
