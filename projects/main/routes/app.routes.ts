import { Routes } from '@angular/router';
import { LayoutComponent } from '../domain/features/layout/layout.component';
import { homeRoute } from './routes/home';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      homeRoute,
    ]
  }
];
