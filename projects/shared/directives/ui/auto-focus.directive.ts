import { AfterViewInit, Directive, ElementRef, input, booleanAttribute } from '@angular/core';
import { _ELREF } from '@utils/angular/ng-api';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';

@Directive({selector: '[autoFocus]', standalone: true})
export class AutoFocusDirective implements AfterViewInit {
  autoFocus = input(true, { transform: booleanAttribute });
  private el = _ELREF();

  ngAfterViewInit(): void {
    if (this.autoFocus() && isBrowser()) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 200);
    }
  }
}
