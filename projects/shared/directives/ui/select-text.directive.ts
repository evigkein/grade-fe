import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[selectText]', standalone: true })
export class SelectTextDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('click')
  selectText(): void {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(this.el.nativeElement);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

}

