import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

export const accountRoute: Route = {
  path: ERoute.Account,
  loadChildren: () =>
    import('../../pages/account/page-account.module').then(
      (m) => m.PageAccountModule
    ),
  // canActivate: [authGuard]
};
