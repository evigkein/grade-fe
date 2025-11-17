import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { auditTime, tap } from 'rxjs/operators';
import { destroy } from '@utils/libs/rxjs';
import { isSSR } from '@utils/helpers/browser/is-browser.util';

export type TPressedKey = | 'Enter' | 'Space' | 'Escape' | 'Tab' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'Ctrl' | 'Shift' | 'Alt' | string;
export type THotkeyEvent = | 'CTRL_L' | 'ENTER' | 'ESC' | null;

const HOTKEY_MAP: { event: THotkeyEvent; keys: TPressedKey[] }[] = [
  { event: 'ENTER', keys: ['Enter'] },
  { event: 'ESC', keys: ['Escape'] },
  { event: 'CTRL_L', keys: ['Ctrl', 'l'] },
];

export function _KEYBOARD(): KeyboardService {
  return inject(KeyboardService)
}

@Injectable({ providedIn: 'root' })
export class KeyboardService {
  private destroy$ = destroy();

  readonly pressedKeys = signal<Set<TPressedKey>>(new Set());
  readonly hotkeyEvent = signal<THotkeyEvent>(null);

  constructor() {
    if (isSSR()) return;

    this.trackKeyDown();
    this.trackKeyUp();

    // ---- UNIFIED & SCALABLE HOTKEY PROCESSOR ----
    effect(() => {
      const current = this.pressedKeys();

      for (const hk of HOTKEY_MAP) {
        const match = hk.keys.every(k => current.has(k));
        if (match) {
          this.emitHotkey(hk.event);
        }
      }
    });
  }

  private emitHotkey(event: Exclude<THotkeyEvent, null>) {
    this.hotkeyEvent.set(event);
    queueMicrotask(() => this.hotkeyEvent.set(null));
  }

  private trackKeyDown() {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        auditTime(8),
        tap(e => {
          const key = this.normalizeKey(e);
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
          const key = this.normalizeKey(e);
          const next = new Set(this.pressedKeys());
          next.delete(key);
          this.pressedKeys.set(next);
        }),
        this.destroy$()
      )
      .subscribe();
  }

  private normalizeKey(e: KeyboardEvent): TPressedKey {
    const key = e.key;

    if (key === 'Meta') return 'Ctrl';
    if (key === 'Control') return 'Ctrl';
    if (key === 'AltGraph') return 'Alt';
    if (key === ' ' || key === 'Spacebar') return 'Space';
    if (key === '¬') return 'l';

    if (key.length === 1) return key.toLowerCase();

    return key;
  }
}
