import { Routes } from '@angular/router';
import { LayoutComponent } from '../domain/features/layout/layout.component';
import { bookingRoute } from './routes/booking';
import { faqRoute } from './routes/faq';
import { homeRoute } from './routes/home';
import { accountRoute } from './routes/lc.route';
import { paymentRoute } from './routes/payment';
import { reviewsRoute } from './routes/reviews';
import { routeRoute } from './routes/route';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      homeRoute,
      paymentRoute,
      accountRoute,
      routeRoute,
      bookingRoute,
      reviewsRoute,
      faqRoute,
    ]
  }
];
