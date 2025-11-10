import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { SwipeDirective } from '../../../../directives/utils/swipe/swipe.directive';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule, SvgIconComponent, SwipeDirective, CarouselItemDirective],
  declarations: [CarouselComponent],
  exports: [CarouselComponent, CarouselItemDirective],
})
export class CarouselModule {
}
