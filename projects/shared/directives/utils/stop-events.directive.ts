import { booleanAttribute, Directive, HostListener, input } from '@angular/core';

@Directive({selector: '[stopEvents]', standalone: true,})
export class StopEventsDirective {
  isActive = input(true, { transform: booleanAttribute });
  isPropagationOnly = input(false, { transform: booleanAttribute });

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.isActive()) return;
    event.stopPropagation();
    if (!this.isPropagationOnly()) event.preventDefault();
  }
}
