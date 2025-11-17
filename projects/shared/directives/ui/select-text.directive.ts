import { Directive, ElementRef, HostListener } from '@angular/core';
import { _ELREF } from '@utils/angular/ng-api';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

@Directive({ selector: '[selectText]', standalone: true })
export class SelectTextDirective {
  private el = _ELREF();

  @HostListener('click')
  selectText(): void {
    if(isSSR()) return;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(this.el.nativeElement);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

}

