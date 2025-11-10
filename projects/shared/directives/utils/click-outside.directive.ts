import { booleanAttribute, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { _ELREF } from '../../utils/angular/ng-api';

@Directive({ selector: '[clickOutside]', standalone: true })
export class ClickOutsideDirective {
  @Input({transform: booleanAttribute}) isMouseDown = false;
  @Output() clickOutside: EventEmitter<PointerEvent> = new EventEmitter();

  private el = _ELREF();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const nativeElement: any = this.el.nativeElement;
    const clickedInside: boolean = nativeElement.contains(event.target);
    if (!clickedInside) this.clickOutside.emit(event);
  }

  // @HostListener('document:mousedown', ['$event'])
  // onMouseDownClick(event: PointerEvent) {
  //   if(!this.isMouseDown) return;
  //   const nativeElement: any = this.elementRef.nativeElement;
  //   const clickedInside: boolean = nativeElement.contains(event.target);
  //   if (!clickedInside) this.clickOutside.emit(event);
  // }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: any) {
    this.clickOutside.emit(event);
  }
}
// (dsClickOutside)="fun()"
