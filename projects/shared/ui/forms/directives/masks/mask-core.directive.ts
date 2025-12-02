import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive()
export abstract class MaskInputCoreDirective implements OnInit {
  @Input() useOnInit = true;
  @Input() allowedPattern = /[\p{L}\p{N}]/u;

  private lastKey: string | null = null;

  constructor(public ngControl: NgControl) {}

  protected abstract maskValue(value: string): string;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (!this.ngControl?.control) return;

    const raw = input.value;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? start;

    const symbols = this.extractAllowed(raw);
    const before = this.countAllowed(raw.slice(0, start));
    const selected = this.countAllowed(raw.slice(start, end));

    // Удаление
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();

      const arr = symbols.split('');

      if (selected > 0) {
        arr.splice(before, selected);
      } else if (event.key === 'Backspace' && before > 0) {
        arr.splice(before - 1, 1);
      } else if (event.key === 'Delete' && before < arr.length) {
        arr.splice(before, 1);
      }

      const newSymbols = arr.join('');
      const newCaretIndex =
        selected > 0
          ? before
          : event.key === 'Backspace'
            ? before - 1
            : before;

      this.applyMask(input, newSymbols, Math.max(0, newCaretIndex));
      return;
    }

    this.lastKey = event.key;
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!this.ngControl?.control || !input) return;

    const raw = input.value;
    const cursor = input.selectionStart ?? raw.length;
    const symbols = this.extractAllowed(raw);
    const before = this.countAllowed(raw.slice(0, cursor));

    this.applyMask(input, symbols, before);
  }

  ngOnInit() {
    if (this.useOnInit && this.ngControl?.value) {
      const formatted = this.maskValue(this.ngControl.value);
      this.ngControl.control!.setValue(formatted, { emitEvent: false });
    }
  }

  // ===== helpers =====

  private applyMask(input: HTMLInputElement, symbols: string, symbolsBefore: number) {
    const formatted = this.maskValue(symbols);

    this.ngControl.control!.setValue(formatted, { emitEvent: false });
    this.ngControl.viewToModelUpdate(formatted);

    requestAnimationFrame(() => {
      let pos = this.getCaretPosition(formatted, symbolsBefore);
      const prefixMatch = formatted.match(/^\+\d+\s?\(/);
      if (prefixMatch && symbolsBefore <= 1) {
        pos = formatted.length;
      }

      input.setSelectionRange(pos, pos);
    });
  }


  private extractAllowed(s: string): string {
    return Array.from(s)
      .filter(ch => this.allowedPattern.test(ch))
      .join('');
  }

  private countAllowed(s: string): number {
    return Array.from(s).filter(ch => this.allowedPattern.test(ch)).length;
  }

  private getCaretPosition(masked: string, symbolsBefore: number): number {
    if (symbolsBefore <= 0) {
      // ставим в первую возможную точку ввода
      for (let i = 0; i < masked.length; i++) {
        if (/[\dA-Za-z_]/.test(masked[i])) return i;
      }
      return masked.length;
    }

    let seen = 0;
    for (let i = 0; i < masked.length; i++) {
      if (/[\dA-Za-z]/.test(masked[i])) {
        seen++;
        if (seen === symbolsBefore) {
          return i + 1; // именно после введённого символа
        }
      }
    }

    return masked.length;
  }
}
