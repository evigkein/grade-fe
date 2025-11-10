import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[hoverOutside]', standalone: true })
export class HoverOutsideDirective {
  @Output() hoverOutside: EventEmitter<MouseEvent> = new EventEmitter();

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
