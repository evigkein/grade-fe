import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({ selector: '[hoverOutside]', standalone: true })
export class HoverOutsideDirective {
  hoverOutside = output<MouseEvent>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    const nativeElement = this.elementRef.nativeElement;
    const hoveredInside = nativeElement.contains(event.target as Node);

    if (!hoveredInside) {
      this.hoverOutside.emit(event);
    }
  }
}
