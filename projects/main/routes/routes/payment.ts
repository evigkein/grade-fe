import { Route } from '@angular/router';
import { ERoute } from '../../domain/constants/route.enum';

export const paymentRoute: Route = {
  path: ERoute.Payment,
  loadChildren: () =>
    import('../../pages/payment-app/payment-feature.module').then(
      (m) => m.PaymentFeatureModule
    )
};
