import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
  computed,
} from '@angular/core';
import { PSelect2Option } from '../select2.component';


@Directive({
  selector: '[pListboxNavigation]',
  standalone: true,
})
export class PListboxNavigationDirective<T = any> {
  // Inputs
  @Input() set options(v: PSelect2Option<T>[] | null) {
    this._options.set(v ?? []);
  }

  @Input() set disabled(v: boolean) {
    this._disabled.set(v);
  }

  @Input() set highlighted(v: number) {
    this._highlighted.set(v);
  }

  // Outputs
  @Output() highlightedChange = new EventEmitter<number>();
  @Output() optionPicked = new EventEmitter<number>();

  // Internal state
  private _options = signal<PSelect2Option<T>[]>([]);
  private _disabled = signal(false);
  private _highlighted = signal(-1);

  constructor(private el: ElementRef<HTMLElement>) {}


  private nextEnabledIndex(start: number, step: 1 | -1) {
    const opts = this._options();
    const len = opts.length;

    for (let i = 0; i < len; i++) {
      const idx = (start + i * step + len) % len;
      if (!opts[idx]?.disabled) return idx;
    }
    return -1;
  }

  private moveHighlight(delta: number) {
    const opts = this._options();
    const len = opts.length;
    if (!len || this._disabled()) return;

    let i = this._highlighted();
    let attempts = 0;

    do {
      i = (i + delta + len) % len;
      attempts++;
      if (attempts > len) break;
    } while (opts[i]?.disabled);

    this._highlighted.set(i);
    this.highlightedChange.emit(i);
  }


  // ---------- Keyboard handling ----------
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this._disabled()) return;

    const key = e.key;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      e.preventDefault();
      this.moveHighlight(key === 'ArrowDown' ? +1 : -1);
    }

    if (key === 'Enter') {
      e.preventDefault();
      this.optionPicked.emit(this._highlighted());
    }
  }
}
