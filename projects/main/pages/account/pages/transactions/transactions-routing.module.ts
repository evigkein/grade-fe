import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTransactionsComponent } from './pages/entry/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: AccountTransactionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
