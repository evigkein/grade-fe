import { Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { _ELREF, _R2 } from '../../utils/angular/ng-api';

@Directive({ selector: '[autoScrollBottom]', standalone: true })
export class AutoScrollBottomDirective implements AfterViewInit, OnDestroy {
  private observer!: MutationObserver;

  private el = _ELREF();
  private r = _R2();

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.observeElement();
  }

  scrollToBottom(): void {
    const element = this.el.nativeElement;
    setTimeout(() => {
      this.r.setProperty(element, 'scrollTop', element.scrollHeight);
    }, 0); // Добавляем небольшую задержку для завершения рендеринга
  }

  private observeElement(): void {
    this.observer = new MutationObserver(() => {
      this.scrollToBottom(); // Прокручиваем вниз при изменении DOM
    });

    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
