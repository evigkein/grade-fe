import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { _ELREF } from '../../../utils/angular/ng-api';
import { isBrowser } from '../../../utils/helpers/browser/is-browser.util';

@Directive({selector: '[isInView]', standalone: true})
export class IsInViewDirective implements OnInit, OnDestroy {
  @Output() isInView: EventEmitter<void> = new EventEmitter<void>();

  private observer: IntersectionObserver | undefined;
  private el = _ELREF();

  ngOnInit() {
    if(!isBrowser()) return;
    this.createObserver();
  }

  ngOnDestroy() {
    if(!isBrowser()) return;
    this.destroyObserver();
  }

  private createObserver(): void {
    if(!isBrowser()) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // 10% элемента должно быть во вьюпорте для триггера
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isInView.emit();
        }
      });
    }, options as any);

    this.observer.observe(this.el.nativeElement);
  }

  private destroyObserver(): void {
    if(!isBrowser()) return;

    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
