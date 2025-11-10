import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageBookingComponent } from './components/entry/booking.component';


const routes: Routes = [
  {
    path: ':slug',
    component: PageBookingComponent,
    // children: [
    //   {
    //     path: ':id',
    //     component: CollectionsEntryComponent,
    //   },
    // ],
  },
  // TODO - ADD NOT FOUND SECTION. (ALSO ADD EMPTY STATE FOR THE MAIN PAGE)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageBookingRoutingModule {}
