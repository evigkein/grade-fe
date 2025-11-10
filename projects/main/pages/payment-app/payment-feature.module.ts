import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaymentSelectorComponent } from './components/entry/payment-selector.component';
import { NetworkSelectorComponent } from './components/select/network-selector.component';

import { PaymentRouterModule } from './payment-router.module';

@NgModule({
  imports: [
    CommonModule,
    PaymentRouterModule,
    NetworkSelectorComponent,
  ],
  declarations: [PaymentSelectorComponent],
  exports: [PaymentSelectorComponent],
})
export class PaymentFeatureModule {
}
