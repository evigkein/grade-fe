import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  ViewContainerRef,
} from '@angular/core'

@Directive({selector: '[dsInputActiveDir]', standalone: true})
export class InputActiveDirective {
  constructor(
    private vcr: ViewContainerRef,
    private el: ElementRef,
    private r: Renderer2,
  ) {}

  @HostListener('focus') onFocus() {
    // const formField = (this.vcr as any)._data.renderElement.parentElement;
    const formField = this.el.nativeElement
    this.r.addClass(formField, 'input-active')
  }

  @HostListener('blur') onBlur() {
    // const formField = (this.vcr as any)._data.renderElement.parentElement;
    const formField = this.el.nativeElement
    this.r.removeClass(formField, 'input-active')
  }
}
