import { Directive, EventEmitter, HostBinding, HostListener, Output, input, computed } from '@angular/core';

@Directive({selector: '[buttonClick]', standalone: true})
export class ButtonClickDirective {
  isDisabled = input<boolean>(false);
  isLoading = input<boolean>(false);
  tabindex = input<number>(0);

  @HostBinding('class.disabled')
  get hostDisabled() {
    return this.isDisabled();
  }

  @HostBinding('class.loading')
  get hostLoading() {
    return this.isLoading();
  }

  readonly tabindexAttr = computed(() => {
    return this.isDisabled() ? -1 : this.tabindex();
  });

  @HostBinding('attr.tabindex')
  get hostTabIndex() {
    return this.tabindexAttr();
  }

  @Output() action = new EventEmitter<Event>();

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.spacebar', ['$event'])
  onHostClick($event: Event): void {
    $event.preventDefault();

    if (this.isDisabled() || this.isLoading()) {
      $event.stopPropagation();
      $event.stopImmediatePropagation();
      return;
    }

    this.action.emit($event);
  }
}
