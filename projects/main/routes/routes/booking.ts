import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

import { UrlMatcher, UrlSegment } from '@angular/router';

export const bookingRoute: Route = {
  path: ERoute.Booking,
  loadChildren: () =>
    import('../../pages/booking/page-booking.module').then(
      (m) => m.PageBookingModule
    ),
  // canActivate: [authGuard]
};
