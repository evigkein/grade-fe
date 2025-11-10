import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RussianNumberMaskDirective } from '@shared/features/different/rus-phone-mask';
import { ButtonComponent } from '@ui/components/button/button.component';
import { AutocompleteModule } from '@ui/forms/controls/autocomplete/autocomplete.module';
import { DatepickerComponent } from '@ui/forms/controls/date-time/datepicker/datepicker.component';
import { InputModule } from '@ui/forms/controls/input/input.module';
import { SelectModule } from '@ui/forms/controls/select';
import { SwitchComponent } from '@ui/forms/controls/switch/switch.component';
import { FormStorageDirective } from '@ui/forms/directives/form-storage.directive';
import { AlertModalComponent } from '@ui/modals/alert/alert-modal.component';
import { ModalsModule } from '@ui/modules/modals/modals/modal/modals.module';
import { PageBookingComponent } from './components/entry/booking.component';

import { PageBookingRoutingModule } from './page-booking-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PageBookingRoutingModule,
    SelectModule,
    DatepickerComponent,
    SwitchComponent,
    InputModule,
    AutocompleteModule,
    RussianNumberMaskDirective,
    ButtonComponent,
    FormStorageDirective,
    ModalsModule,
    AlertModalComponent,
  ],
  declarations: [PageBookingComponent],
  exports: [PageBookingComponent],
})
export class PageBookingModule {
}
