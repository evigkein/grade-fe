import {Directive, ElementRef, inject, OnInit, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[skipHydration]',
  host: {ngSkipHydration: 'true'},
})
export class SkipHydrationDirective implements OnInit {
  private el = inject(ElementRef);
  private r = inject(Renderer2);

  ngOnInit() {
    const nativeElement = this.el.nativeElement;
    this.r.removeAttribute(nativeElement, 'ng-version');
    this.r.removeClass(nativeElement, 'hydrated');
  }
}
