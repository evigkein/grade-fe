import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[inputInvalidFocus]', standalone: true })
export class InputInvalidFocusDirective {
  constructor(private el: ElementRef) {
  }

  @HostListener('submit')
  onSubmit() {
    this.el.nativeElement
      .querySelector('input.ng-invalid')
      ?.focus();
  }
}

// подключается непосредственно к форме
