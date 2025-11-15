import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { TranslateFacade } from '@core/modules/translate';
import { fromEvent } from 'rxjs';
import { auditTime, tap } from 'rxjs/operators';
import { destroy } from '@utils/libs/rxjs';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

export type TKeyName = | 'Enter' | 'Space' | 'Escape' | 'Tab' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Ctrl' | 'Shift' | 'Alt' | string;


export function _KEYBOARD(): KeyboardService {
  return inject(KeyboardService)
}

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private destroy$ = destroy();

  readonly pressedKeys = signal<Set<TKeyName>>(new Set());

  readonly hotkeyEvent = signal<string | null>(null);

  readonly isCtrl = computed(() => this.pressedKeys().has('Ctrl'));
  readonly isShift = computed(() => this.pressedKeys().has('Shift'));
  readonly isAlt = computed(() => this.pressedKeys().has('Alt'));

  readonly isCtrlL = computed(
    () => this.pressedKeys().has('Ctrl') && this.pressedKeys().has('l')
  );

  constructor() {
    if (isSSR()) return;

    this.trackKeyDown();
    this.trackKeyUp();

    effect(() => {
      if (this.isCtrlL()) {
        this.hotkeyEvent.set('CTRL_L');
        queueMicrotask(() => this.hotkeyEvent.set(null));
      }
    });
  }

  private trackKeyDown() {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        auditTime(8),
        tap(e => {
          const key = this.normalize(e);
          const next = new Set(this.pressedKeys());
          next.add(key);
          this.pressedKeys.set(next);
        }),
        this.destroy$()
      )
      .subscribe();
  }

  private trackKeyUp() {
    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(
        auditTime(8),
        tap(e => {
          const key = this.normalize(e);
          const next = new Set(this.pressedKeys());
          next.delete(key);
          this.pressedKeys.set(next);
        }),
        this.destroy$()
      )
      .subscribe();
  }

  private normalize(e: KeyboardEvent): TKeyName {
    const key = e.key;

    if (key === 'Meta') return 'Ctrl';

    if (key === '¬') return 'l';

    if (key === ' ' || key === 'Spacebar') return 'Space';
    if (key === 'Control') return 'Ctrl';
    if (key === 'AltGraph') return 'Alt';

    if (key.length === 1) return key.toLowerCase();

    return key;
  }

}
