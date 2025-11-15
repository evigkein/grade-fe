import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomImageDirective } from '@shared/directives/ui/img/img.directive';
import { PageHomeComponent } from './components/entry/home.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomImageDirective,
  ],
  declarations: [PageHomeComponent],
  exports: [PageHomeComponent],
})
export class HomeModule {
}
