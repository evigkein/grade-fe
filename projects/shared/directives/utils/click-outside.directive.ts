import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  Input,
  OnInit,
  OnDestroy, booleanAttribute, input,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Input() immediate = true; // pointerdown или click
  @Input() esc = true;       // реагировать ли на Escape
  @Input() whitelist: HTMLElement | ElementRef | string | Array<any> | null = null;
  isPrevent = input(false, {transform: booleanAttribute});       // реагировать ли на Escape

  @Output() clickOutside = new EventEmitter<PointerEvent | KeyboardEvent>();

  private destroyFns: Array<() => void> = [];
  private hostEl!: HTMLElement;

  constructor(
    private host: ElementRef<HTMLElement>,
    private r2: Renderer2
  ) {}

  ngOnInit() {
    this.hostEl = this.host.nativeElement;

    // ---- Pointer / Click outside ----
    const listenType = this.immediate ? 'pointerdown' : 'click';

    const offPointer = this.r2.listen('document', listenType, (ev: PointerEvent) => {
      this.handle(ev);
    });
    this.destroyFns.push(offPointer);

    // ---- Escape ----
    if (this.esc) {
      const offEsc = this.r2.listen('document', 'keydown', (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          this.clickOutside.emit(ev);
        }
      });
      this.destroyFns.push(offEsc);
    }
  }

  ngOnDestroy() {
    this.destroyFns.forEach(fn => fn());
    this.destroyFns = [];
  }

  private handle(ev: PointerEvent) {
    const path = ev.composedPath?.() ?? [ev.target];

    // клик внутри хоста
    if (path.includes(this.hostEl)) return;

    // whitelist (ElementRef | HTMLElement | селекторы | массив)
    if (this.whitelist) {
      const list = Array.isArray(this.whitelist) ? this.whitelist : [this.whitelist];
      for (const ref of list) {
        const el = this.resolveElement(ref);
        if (el && path.includes(el)) return; // клик по whitelist-element
      }
    }

    if(this.isPrevent()) {
      ev.preventDefault();
      ev.stopPropagation();
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
