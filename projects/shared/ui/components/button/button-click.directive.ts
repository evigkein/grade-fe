import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({selector: '[buttonClick]', standalone: true })
export class ButtonClickDirective {
  @Input() @HostBinding('class.disabled') isDisabled? = false;
  @Input() @HostBinding('class.loading') isLoading? = false;

  @Input() tabindex = 0;

  @HostBinding(`attr.tabindex`)
  get tabindexAttr(): number {
    return this.isDisabled ? -1 : this.tabindex;
  }

  @Output() action: EventEmitter<Event> = new EventEmitter<Event>();

  // @HostBinding('attr.role') buttonRole = 'button';

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.spacebar', ['$event'])
  onHostClick($event: Event): void {
    $event.preventDefault();

    if (this.isDisabled || this.isLoading) {
      $event.stopPropagation();
      $event.stopImmediatePropagation();
      return;
    }

    this.action.emit($event);
  }
}
