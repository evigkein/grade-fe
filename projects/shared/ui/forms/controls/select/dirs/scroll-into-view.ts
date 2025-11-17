import { Directive, ElementRef, Input, effect, signal } from '@angular/core';

@Directive({
  selector: '[pScrollActiveIntoView]',
  standalone: true
})
export class PScrollActiveIntoViewDirective {
  @Input({ required: true })
  set activeIndex(v: number | null) {
    this.idx.set(v);
  }

  private idx = signal<number | null>(null);

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      const i = this.idx();
      if (i == null || i < 0) return;

      const container = this.el.nativeElement;

      requestAnimationFrame(() => {
        const item = container.querySelector<HTMLElement>(`[data-index="${i}"]`);
        if (!item) return;

        const top = item.offsetTop;
        const bottom = top + item.offsetHeight;

        if (top < container.scrollTop) {
          container.scrollTop = top;
        } else if (bottom > container.scrollTop + container.clientHeight) {
          container.scrollTop = bottom - container.clientHeight;
        }
      });
    });
  }
}
