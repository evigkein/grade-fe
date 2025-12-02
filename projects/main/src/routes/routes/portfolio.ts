import { Route } from '@angular/router';
import { ERoute } from '@shared/domain/main/constants/route.enum';

export const portfolioRoute: Route = {
  path: ERoute.Portfolio,
  pathMatch: 'full',
  loadChildren: () =>
    import('../../../pages/portfolio/portfolio.module').then(
      (m) => m.PortfolioModule
    ),
  // canActivate: [authGuard]
};
