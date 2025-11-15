import { Injectable, signal, computed } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { auditTime, filter, map, tap } from 'rxjs/operators';
import { destroy } from '@utils/libs/rxjs';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

type KeyName =
  | 'Enter'
  | 'Space'
  | 'Escape'
  | 'Tab'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Ctrl'
  | 'Shift'
  | 'Alt'
  | string;

interface ActionEvent {
  event: MouseEvent | KeyboardEvent;
  type: 'mouse' | 'keyboard';
}

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private destroy$ = destroy();

  // --- сигналы текущих нажимов ---
  readonly pressedKeys = signal<Set<KeyName>>(new Set());

  readonly isEnter = computed(() => this.pressedKeys().has('Enter'));
  readonly isSpace = computed(() => this.pressedKeys().has('Space'));
  readonly isEscape = computed(() => this.pressedKeys().has('Escape'));
  readonly isShift = computed(() => this.pressedKeys().has('Shift'));
  readonly isCtrl = computed(() => this.pressedKeys().has('Ctrl'));
  readonly isAlt = computed(() => this.pressedKeys().has('Alt'));

  // --- глобальное действие: мышь или клавиатура ---
  readonly action$ = merge(
    fromEvent<MouseEvent>(document, 'click').pipe(
      map(ev => ({ event: ev, type: 'mouse' as const }))
    ),
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter(e => {
        const key = this.normalize(e);
        return key === 'Enter' || key === 'Space';
      }),
      map(ev => ({ event: ev, type: 'keyboard' as const }))
    )
  ).pipe(
    auditTime(16),
    this.destroy$()
  );

  // --- комбинации клавиш ---
  readonly combo$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    auditTime(16),
    map(e => this.getComboString()),
    filter(str => str.length > 0),
    this.destroy$()
  );

  constructor() {
    if (isSSR()) return;

    // keydown listener
    fromEvent<KeyboardEvent>(document, 'keydown', { passive: true })
      .pipe(
        auditTime(16),
        tap(e => {
          const key = this.normalize(e);
          const set = new Set(this.pressedKeys());
          set.add(key);
          this.pressedKeys.set(set);
        }),
        this.destroy$()
      )
      .subscribe();

    // keyup listener
    fromEvent<KeyboardEvent>(document, 'keyup', { passive: true })
      .pipe(
        auditTime(16),
        tap(e => {
          const key = this.normalize(e);
          const set = new Set(this.pressedKeys());
          set.delete(key);
          this.pressedKeys.set(set);
        }),
        this.destroy$()
      )
      .subscribe();
  }

  // нормализация клавиш
  private normalize(e: KeyboardEvent): KeyName {
    const key = e.key;

    if (key === ' ' || key === 'Spacebar') return 'Space';
    if (key === 'Control') return 'Ctrl';
    if (key === 'AltGraph') return 'Alt';
    return key;
  }

  // преобразование множества в строку комбинации
  private getComboString(): string {
    const keys = Array.from(this.pressedKeys());
    if (keys.length < 2) return '';
    return keys.sort().join('+');
  }
}
