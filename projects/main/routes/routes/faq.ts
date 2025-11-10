import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

export const faqRoute: Route = {
  path: ERoute.Faq,
  loadChildren: () =>
    import('../../pages/faq/page-faq.module').then(
      (m) => m.PageFaqModule
    ),
  // canActivate: [authGuard]
};
