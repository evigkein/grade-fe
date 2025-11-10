import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { ResponsiveDirective } from '@shared/directives/ui/responsive.directive';
import { TextMorphDirective } from '@shared/directives/ui/text-morph.directive';
import { SkipHydrationDirective } from '@shared/directives/utils/skip-hydration.directive';
import { CallUsComponent } from '@shared/features/call-us/call-us.component';
import { TariffCardComponent } from '@shared/features/car-card/tariff-price-card.component';
import { CarouselModule } from '@ui/components/+features/carousel/carousel.module';
import { AccordionComponent } from '@ui/components/accordion';
import { SkeletonGridComponent } from '@ui/components/features/skeleton/skeleton-grid/skeleton-grid.component';
import { LoaderComponent } from '@ui/components/loader/spinner/loader.component';
import { ResponsiveComponent } from '@ui/components/responsive/responsive.component';
import { TagsComponent } from '@ui/components/tags/tags.component';
import { SmIconsComponent } from '@ui/features/sm-icons/sm-icons.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { RouteFilterComponent } from '../../domain/ui/route-filter/route-filter.component';
import { PageRouteComponent } from './components/entry/route.component';

import { RouteRoutingModule } from './route-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouteRoutingModule,
    TariffCardComponent,
    CustomImageDirective,
    RouteFilterComponent,
    SkipHydrationDirective,
    TagsComponent,
    SvgIconComponent,
    SmIconsComponent,
    TextMorphDirective,
    CarouselModule,
    CallUsComponent,
    AccordionComponent,
    ResponsiveComponent,
    ResponsiveDirective,
    SkeletonGridComponent,
    LoaderComponent,
  ],
  declarations: [PageRouteComponent],
  exports: [PageRouteComponent],
})
export class PageRouteModule {
}
