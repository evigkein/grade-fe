import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

export const homeRoute: Route = {
  path: ERoute.Main,
  pathMatch: 'full',
  loadChildren: () =>
    import('../../pages/home/home.module').then(
      (m) => m.HomeModule
    ),
  // canActivate: [authGuard]
};
