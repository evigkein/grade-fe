import { Route } from '@angular/router';
import { ERoute } from '@shared/domain/main/constants/route.enum';

export const homeRoute: Route = {
  path: ERoute.Main,
  pathMatch: 'full',
  loadComponent: () =>
    import('../../../pages/home/components/entry/home.component').then(
      (m) => m.PageHomeComponent
    ),
  // canActivate: [authGuard]
};
