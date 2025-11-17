import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  effect,
  input,
  inject,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  immediate = input(true);
  esc = input(true);
  /**
   * Можно передать:
   * - HTMLElement
   * - ElementRef
   * - массив
   * - строку-селектор ('#id', '.class', '[attr]')
   */
  whitelist = input<HTMLElement | ElementRef | string | (HTMLElement | ElementRef | string)[] | null>(null);

  @Output() clickOutside = new EventEmitter<PointerEvent | KeyboardEvent>();

  private host = inject(ElementRef<HTMLElement>);
  private r2 = inject(Renderer2);

  private destroyFns: (() => void)[] = [];

  constructor() {
    effect(() => {
      this.destroy();

      const listenType = this.immediate() ? 'pointerdown' : 'click';

      const offPointer = this.r2.listen('document', listenType, (ev: PointerEvent) =>
        this.handle(ev)
      );
      const offEsc = this.esc()
        ? this.r2.listen('document', 'keydown', (ev: KeyboardEvent) => {
          if (ev.key === 'Escape') this.clickOutside.emit(ev);
        })
        : undefined;

      this.destroyFns.push(offPointer);
      if (offEsc) this.destroyFns.push(offEsc);
      return () => this.destroy();
    });
  }

  private destroy() {
    this.destroyFns.forEach((fn) => fn());
    this.destroyFns = [];
  }

  private handle(ev: PointerEvent) {
    const host = this.host.nativeElement;
    const path = ev.composedPath?.() ?? [ev.target];

    if (path.includes(host)) return;

    const white = this.whitelist();
    if (white) {
      const list = Array.isArray(white) ? white : [white];
      for (const ref of list) {
        const el = this.resolveElement(ref);
        if (el && path.includes(el)) return;
      }
    }

    this.clickOutside.emit(ev);
  }

  private resolveElement(ref: HTMLElement | ElementRef | string): HTMLElement | null {
    if (!ref) return null;
    if (ref instanceof ElementRef) return ref.nativeElement;
    if (typeof ref === 'string') return document.querySelector(ref);
    return ref;
  }
}
