import { booleanAttribute, Directive, HostListener, Input } from '@angular/core';

@Directive({selector: '[stopEvents]', standalone: true,})
export class StopEventsDirective {
  @Input({ transform: booleanAttribute }) isActive = true;
  @Input({transform: booleanAttribute}) isPropagationOnly = false;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if(!this.isActive) return;
    event.stopPropagation();
    if (!this.isPropagationOnly) event.preventDefault();
  }
}
