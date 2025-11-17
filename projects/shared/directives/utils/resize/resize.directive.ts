import { Directive, OnDestroy, OnInit, output } from '@angular/core';
import { resizeObserver } from '../../../utils/helpers/browser/resize-observer.util';
import { _ELREF, _R2 } from '../../../utils/angular/ng-api';

@Directive({ selector: '[resize]', standalone: true })
export class ResizeObserverDirective implements OnInit, OnDestroy {
  widthChange = output<number>();

  private el = _ELREF();
  private r = _R2();
  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    this.initResizeObserver();
  }

  ngOnDestroy(): void {
    this.destroyResizeObserver();
  }

  private initResizeObserver(): void {
    const containerElement: HTMLElement = this.el.nativeElement;
    this.resizeObserver = resizeObserver(containerElement, () => {
      const width = containerElement.offsetWidth;
      this.widthChange.emit(width);
      // this.setWidth(width);
    })!;
  }

  private setWidth(width: number): void {
    // const widthPx = `${width}px`; // Преобразуем число в строку с px
    // this.r.setStyle(this.el.nativeElement, 'width', widthPx, 2);
    // this.r.setStyle(this.el.nativeElement, 'max-width', widthPx, 2);
  }

  private destroyResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
