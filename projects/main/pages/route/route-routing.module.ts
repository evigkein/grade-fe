import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRouteComponent } from './components/entry/route.component';
// import { RouteSeoResolver } from './services/route-resolver';


const routes: Routes = [
  {
    path: ':slug',
    component: PageRouteComponent,
    // resolve: { seo: RouteSeoResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
