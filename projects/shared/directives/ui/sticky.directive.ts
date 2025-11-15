import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  numberAttribute,
  signal,
  effect,
} from '@angular/core';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

@Directive({
  selector: '[sticky]',
  standalone: true,
})
export class StickyDirective implements AfterViewInit, OnDestroy {
  @Input({ alias: 'sticky', transform: numberAttribute }) offset = 0;

  // Signals (полностью вне Angular)
  private scrollY = signal(0);
  private ready = signal(false);

  private initialTop = signal(0);
  private initialLeft = signal(0);
  private initialWidth = signal(0);
  private initialPosition = signal<string>('static');

  private removeScrollListener: (() => void) | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    if(isSSR()) return;
    // Инициализация метрик
    setTimeout(() => {
      this.setup();
      this.ready.set(true);
    });

    // Zoneless: слушаем scroll НЕ через Angular
    const handler = () => this.scrollY.set(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    this.removeScrollListener = () => window.removeEventListener('scroll', handler);

    // sticky-эффект (реактивный, вне Angular CD)
    effect(() => {
      if (!this.ready()) return;

      const scroll = this.scrollY();
      const stickyPoint = this.initialTop() - this.offset;

      if (scroll >= stickyPoint) {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.el.nativeElement, 'top', `${this.offset}px`);
        this.renderer.setStyle(this.el.nativeElement, 'left', `${this.initialLeft()}px`);
        this.renderer.setStyle(this.el.nativeElement, 'width', `${this.initialWidth()}px`);
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'position', this.initialPosition());
        this.renderer.removeStyle(this.el.nativeElement, 'top');
      }
    }, { allowSignalWrites: true });
  }

  ngOnDestroy() {
    this.removeScrollListener?.();
  }

  private setup() {
    const rect = this.el.nativeElement.getBoundingClientRect();

    this.initialTop.set(rect.top + window.scrollY);
    this.initialLeft.set(rect.left + window.scrollX);
    this.initialWidth.set(rect.width);

    const comp = getComputedStyle(this.el.nativeElement);
    this.initialPosition.set(comp.position);

    // Фиксируем ширину, чтобы при фиксации не прыгало
    this.renderer.setStyle(this.el.nativeElement, 'width', `${rect.width}px`);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${rect.left + window.scrollX}px`);
  }
}
