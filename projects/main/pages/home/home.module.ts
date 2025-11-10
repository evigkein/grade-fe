import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { SkipHydrationDirective } from '@shared/directives/utils/skip-hydration.directive';
import { CarouselItemDirective } from '@shared/ui/components/+features/carousel/carousel-item.directive';
import { CarouselComponent } from '@shared/ui/components/+features/carousel/carousel.component';
import { ButtonComponent } from '@shared/ui/components/button/button.component';
import { PhoneLinkComponent } from '@shared/ui/features/phone-call/phone.component';
import { SmIconsComponent } from '@shared/ui/features/sm-icons/sm-icons.component';
import { AutocompleteModule } from '@shared/ui/forms/controls/autocomplete/autocomplete.module';
import { InputModule } from '@shared/ui/forms/controls/input/input.module';
import { SelectModule } from '@shared/ui/forms/controls/select';
import { SvgIconComponent } from '@shared/ui/modules/svg-icon/svg-icon.component';
import { CarouselModule } from '@ui/components/+features/carousel/carousel.module';
import { RouteFilterComponent } from '../../domain/ui/route-filter/route-filter.component';
import { PageHomeComponent } from './components/entry/home.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomImageDirective,
    InputModule,
    AutocompleteModule,
    SvgIconComponent,
    SelectModule,
    ButtonComponent,
    TripCardComponent,
    SmIconsComponent,
    CarouselModule,
    PhoneLinkComponent,
    RouteFilterComponent,
    SkipHydrationDirective,
  ],
  declarations: [PageHomeComponent],
  exports: [PageHomeComponent],
})
export class HomeModule {
}
