import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { AccordionComponent } from '@ui/components/accordion';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { PageHomeComponent } from './components/entry/home.component';
import { HomeFeaturesComponent } from './components/features/home-features.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomImageDirective,
    AccordionComponent,
    TranslatePipe,
    SvgIconComponent,
    HomeFeaturesComponent,
  ],
  declarations: [PageHomeComponent],
  exports: [PageHomeComponent],
})
export class HomeModule {
}
