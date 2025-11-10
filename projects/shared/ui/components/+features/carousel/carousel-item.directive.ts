import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[pCarouselItem]', standalone: true })
export class CarouselItemDirective {
  constructor(public el: ElementRef<HTMLElement>) {}
}
