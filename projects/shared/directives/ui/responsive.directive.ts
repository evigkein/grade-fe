import {
  Directive,
  Input,
  OnInit,
  OnDestroy, ElementRef, Renderer2,
} from '@angular/core';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';

@Directive({
  selector: '[presp]',
  standalone: true,
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  @Input() minW?: number;
  @Input() maxW?: number;

  private mediaQueryList?: MediaQueryList;
  private listener?: (event: MediaQueryListEvent) => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if(!isBrowser()) return;
    const query = this.buildQuery();
    if (!query) return;

    this.mediaQueryList = window.matchMedia(query);
    this.applyVisibility(this.mediaQueryList.matches);

    this.listener = (event) => this.applyVisibility(event.matches);
    this.mediaQueryList.addEventListener('change', this.listener);
  }

  private buildQuery(): string | null {
    const queries: string[] = [];
    if (this.minW != null) queries.push(`(min-width: ${this.minW}px)`);
    if (this.maxW != null) queries.push(`(max-width: ${this.maxW}px)`);
    return queries.length ? queries.join(' and ') : null;
  }

  private applyVisibility(show: boolean) {
    this.renderer.setStyle(this.el.nativeElement, 'display', show ? '' : 'none');
  }

  ngOnDestroy() {
    if (this.mediaQueryList && this.listener) {
      this.mediaQueryList.removeEventListener('change', this.listener);
    }
  }
}
