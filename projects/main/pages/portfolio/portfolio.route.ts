import { Route } from '@angular/router';
import { ERoute } from '@shared/domain/main/constants/route.enum';

export const portfolioRoute: Route = {
  path: ERoute.Portfolio,
  loadComponent: () =>
    import('./components/entry/portfolio.component')
      .then((m) => m.PortfolioComponent),
};
