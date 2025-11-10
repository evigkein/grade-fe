import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountEntryComponent} from './pages/entry/account.component';
import {TransactionsModule} from './pages/transactions/transactions.module';


const routes: Routes = [
  {
    path: '',
    component: AccountEntryComponent,
    children: [
      {
        path: 'transactions',
        loadChildren: () =>
          import('./pages/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          )
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSettingsRoutingModule {}
