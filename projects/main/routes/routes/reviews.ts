import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

export const reviewsRoute: Route = {
  path: ERoute.Reviews,
  loadChildren: () =>
    import('../../pages/reviews/reviews.module').then(
      (m) => m.ReviewsModule
    ),
  // canActivate: [authGuard]
};
