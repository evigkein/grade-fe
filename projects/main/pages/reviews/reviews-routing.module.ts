import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageReviewsComponent } from './components/entry/page-reviews.component';


const routes: Routes = [
  {
    path: '',
    component: PageReviewsComponent,
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
export class ReviewsRoutingModule {}
