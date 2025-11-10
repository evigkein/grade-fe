import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

export const routeRoute: Route = {
  path: ERoute.Route,
  loadChildren: () =>
    import('../../pages/route/page-route.module').then(
      (m) => m.PageRouteModule
    ),
  // canActivate: [authGuard]
};
