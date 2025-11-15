import {
  Pipe,
  PipeTransform,
  signal,
  inject,
  OnDestroy,
} from '@angular/core';
import { localeMap } from '../constants/const';
import { TranslateFacade } from '../index';

import { isSSR, isTabHidden } from '@utils/helpers/browser/is-browser.util';
import { secondInMs } from '@utils/helpers/date-time';

type TDateFormatStyle = 'full' | 'short';

@Pipe({
  name: 'relativeTime',
  standalone: true,
  pure: false,
})
export class RelativeTimePipe implements PipeTransform, OnDestroy {

  private translate = inject(TranslateFacade);

  private tick = signal(0);
  private rafId: number | null = null;

  private value!: Date;
  private nextUpdateAt = 0;

  transform(
    value: any,
    autoInterval: number = 30,
    style: TDateFormatStyle = 'full'
  ): string {

    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';

    this.value = date;

    const locale = localeMap[this.translate.lang()] ?? this.translate.lang();

    this.start(autoInterval);

    const _ = this.tick();

    return this.formatRelative(date, locale, style);
  }

  private formatRelative(date: Date, locale: string, style: TDateFormatStyle): string {
    const now = Date.now();
    const diffMs = now - date.getTime();

    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hr  = Math.floor(min / 60);
    const day = Math.floor(hr / 24);

    if (sec < 60) {
      if (style === 'short') return this.tr('relative.s_short', { count: sec });
      return this.trPlural('relative.seconds_ago', sec, locale);
    }

    if (min < 60) {
      if (style === 'short') return this.tr('relative.m_short', { count: min });
      return this.trPlural('relative.minutes_ago', min, locale);
    }

    if (hr < 24) {
      if (style === 'short') return this.tr('relative.h_short', { count: hr });
      return this.trPlural('relative.hours_ago', hr, locale);
    }

    if (day === 1) {
      return this.tr('relative.yesterday');
    }

    if (day < 31) {
      if (style === 'short') return this.tr('relative.d_short', { count: day });
      return this.trPlural('relative.days_ago', day, locale);
    }

    const month = Math.floor(day / 30);
    if (month < 12) {
      if (style === 'short') return this.tr('relative.mo_short', { count: month });
      return this.trPlural('relative.months_ago', month, locale);
    }

    const year = Math.floor(month / 12);
    if (style === 'short') return this.tr('relative.y_short', { count: year });
    return this.trPlural('relative.years_ago', year, locale);
  }


  private tr(key: string, vars: any = {}): string {
    return this.translate.translate(key, vars);
  }

  private trPlural(key: string, count: number, locale: string): string {
    if (locale.startsWith('ru')) {
      const mod10 = count % 10;
      const mod100 = count % 100;

      let template = key;

      if (mod10 === 1 && mod100 !== 11) template = key + '_one';
      else if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) template = key + '_few';
      else template = key + '_many';

      return this.translate.translate(template, { count });
    }

    return this.translate.translate(key, { count });
  }

  private start(autoInterval: number) {
    if (isSSR()) return;
    if (this.rafId !== null) return;

    const baseIntervalMs = autoInterval * secondInMs;

    const loop = (ts: number) => {
      if (isTabHidden()) {
        this.rafId = requestAnimationFrame(loop);
        return;
      }

      const now = Date.now();

      if (!this.nextUpdateAt) {
        this.nextUpdateAt = now + this.nextDelay(baseIntervalMs);
      }

      if (now >= this.nextUpdateAt) {
        this.tick.update(v => v + 1);
        this.nextUpdateAt = now + this.nextDelay(baseIntervalMs);
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  private nextDelay(base: number): number {
    const date = this.value;
    const now = Date.now();
    const diffMs = now - date.getTime();

    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hr  = Math.floor(min / 60);
    const day = Math.floor(hr / 24);

    if (sec < 60) {
      const msIntoSecond = diffMs % 1000;
      return Math.min(1000 - msIntoSecond, base);
    }

    if (min < 60) {
      const ms = diffMs % (60 * 1000);
      return Math.min(60 * 1000 - ms, base);
    }

    if (hr < 24) {
      const ms = diffMs % (60 * 60 * 1000);
      return Math.min(60 * 60 * 1000 - ms, base);
    }

    if (day < 2) {
      const dayMs = 24 * 60 * 60 * 1000;
      const ms = diffMs % dayMs;
      return Math.min(dayMs - ms, base);
    }

    return base;
  }

  ngOnDestroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
}
