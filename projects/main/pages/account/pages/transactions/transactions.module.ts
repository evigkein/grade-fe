import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SkipHydrationDirective } from '@shared/directives/utils/skip-hydration.directive';
import { DatepickerComponent } from '@shared/ui/forms/controls/date-time/datepicker/datepicker.component';
import { InputModule } from '@shared/ui/forms/controls/input/input.module';
import { SelectModule } from '@shared/ui/forms/controls/select';
import { TableModule } from '@shared/ui/modules/table-builder/table.module';
import { AccountTransactionsComponent } from './pages/entry/transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    TranslateModule,
    SelectModule,
    DatepickerComponent,
    InputModule,
    TableModule,
    SkipHydrationDirective,
  ],
  declarations: [AccountTransactionsComponent],
  exports: [AccountTransactionsComponent],
})
export class TransactionsModule {
}
