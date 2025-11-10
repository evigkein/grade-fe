import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({selector: '[autoFocus]', standalone: true})
export class AutoFocusDirective implements AfterViewInit {
  @Input() set autoFocus(isAutoFocus: boolean | string) {
    this.isAutoFocus = ['', true].includes(isAutoFocus);
  }

  private isAutoFocus = true;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.isAutoFocus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 200);
    }
  }
}
