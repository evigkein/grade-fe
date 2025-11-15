import {
  Directive,
  ElementRef,
  inject,
  effect,
  input,
} from '@angular/core';
import { localeMap } from '../constants/const';
import { TranslateFacade } from '../services';

export type TLocaleMode = 'auto' | 'date' | 'datetime' | 'time' | 'currency' | 'number';
export type TDatePattern = 'dd MMM yyyy' | 'dd.MM.yyyy' | 'EEEE' | 'EEEE, dd MMM yyyy' | 'HH:mm' | 'HH:mm:ss' | string;

@Directive({selector: '[pLocale]', standalone: true })
export class LocaleDirective {
  private el = inject(ElementRef<HTMLElement>);
  private translate = inject(TranslateFacade);

  value = input.required<any>();
  mode = input<TLocaleMode>('auto');
  currency = input<string>('USD');
  datePattern = input<TDatePattern | null>(null);

  constructor() {
    effect(() => {
      const lang = this.translate.lang();
      const v = this.value();
      const mode = this.mode();
      const locale = localeMap[lang] ?? lang;

      const output = this.format(v, mode, locale);
      this.el.nativeElement.textContent = output;
    });
  }

  private format(value: any, mode: string, locale: string): string {
    const finalMode = this.detectMode(value, mode);
    return this.formatByMode(value, finalMode, locale);
  }

  private formatByMode(value: any, mode: string, locale: string): string {

    if (mode === 'date' && this.datePattern()) {
      return this.formatCustomDate(new Date(value), this.datePattern()!, locale);
    }

    switch (mode) {
      case 'date':
        return new Intl.DateTimeFormat(locale).format(new Date(value));

      case 'datetime':
        return new Intl.DateTimeFormat(locale, {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(value));

      case 'time':
        return new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(value));

      case 'currency':
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: this.currency(),
        }).format(value);

      case 'number-short':
        return this.formatShortNumber(Number(value), locale);

      case 'number':
        return new Intl.NumberFormat(locale).format(Number(value));

      default:
        return String(value);
    }
  }

  private formatCustomDate(date: Date, pattern: string, locale: string): string {
    const intl = (opts: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, opts).format(date);

    return pattern
      .replace(/yyyy/g, date.getFullYear().toString())
      .replace(/dd/g, intl({ day: '2-digit' }))
      .replace(/MMM/g, intl({ month: 'short' }))
      .replace(/MM/g, intl({ month: '2-digit' }))
      .replace(/EEEE/g, intl({ weekday: 'long' }))
      .replace(/HH/g, intl({ hour: '2-digit', hour12: false }))
      .replace(/mm/g, intl({ minute: '2-digit' }))
      .replace(/ss/g, intl({ second: '2-digit' }));
  }

  private detectMode(value: any, forcedMode: string): any {
    if (this.datePattern()) return 'date';

    if (forcedMode === 'number-short') return 'number-short';

    if (forcedMode !== 'auto') return forcedMode as TLocaleMode;

    if (value instanceof Date) return 'date';

    if (typeof value === 'number') return 'number';

    if (typeof value === 'string') {
      if (!value.trim()) return 'number';

      if (/^\d+(\.\d+)?$/.test(value)) return 'number';

      const dt = new Date(value);
      if (!isNaN(dt.getTime())) return 'datetime';
    }

    return 'number';
  }

  private formatShortNumber(value: number, locale: string): string {
    const abs = Math.abs(value);

    if (abs < 1000) {
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
    }

    if (abs < 1_000_000) {
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1000) + 'K';
    }

    if (abs < 1_000_000_000) {
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1_000_000) + 'M';
    }

    if (abs < 1_000_000_000_000) {
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1_000_000_000) + 'B';
    }

    return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1_000_000_000_000) + 'T';
  }
}
