import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  takeUntil,
  timer,
  tap,
  firstValueFrom, defer
} from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * LocalCacheService
 *
 * ✅ Features:
 * - Типизированный кэш <T>
 * - TTL (время жизни данных)
 * - Автоочистка по таймеру
 * - Прямая поддержка async/await через getOrFetch()
 * - Защита от утечек (unsubscribe + complete)
 */
interface CacheEntry<T> {
  state: BehaviorSubject<T>;
  expiresAt?: number;
}

@Injectable({ providedIn: 'root' })
export class LocalCacheService implements OnDestroy {
  private cache = new Map<string, CacheEntry<any>>();
  private destroy$ = new Subject<void>();

  /** Получить кэшированный Observable (если есть) */
  get<T>(key: string, unsubscriber?: Subject<void>): Observable<T> | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const stream = entry.state.asObservable();
    return unsubscriber ? stream.pipe(takeUntil(unsubscriber)) : stream;
  }

  /** Установить значение в кэш */
  set<T>(key: string, value: T, ttlMs?: number): void {
    const now = Date.now();
    const entry = this.cache.get(key);

    if (entry) {
      entry.state.next(value);
      entry.expiresAt = ttlMs ? now + ttlMs : undefined;
    } else {
      this.cache.set(key, {
        state: new BehaviorSubject(value),
        expiresAt: ttlMs ? now + ttlMs : undefined
      });
    }

    // Если есть TTL — ставим автоудаление
    if (ttlMs) {
      timer(ttlMs)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.removeIfExpired(key));
    }
  }

  /** Получить из кэша или сделать fetch (если нет) */
  getOrFetch<T>(
    key: string,
    fetchFn: () => Observable<T>,
    ttlMs?: number
  ): Observable<T> {
    const entry = this.cache.get(key);
    const now = Date.now();

    if (entry && (!entry.expiresAt || entry.expiresAt > now)) {
      return entry.state.asObservable();
    }

    return defer(() => fetchFn()).pipe(
      tap((data) => this.set(key, data, ttlMs)),
      switchMap(() => this.cache.get(key)!.state.asObservable())
    );
  }

  /** Проверка на устаревание */
  private removeIfExpired(key: string): void {
    const entry = this.cache.get(key);
    if (!entry) return;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      entry.state.complete();
      this.cache.delete(key);
    }
  }

  /** Удалить ключ */
  remove(key: string): void {
    const entry = this.cache.get(key);
    if (!entry) return;
    entry.state.complete();
    this.cache.delete(key);
  }

  clear(): void {
    for (const entry of this.cache.values()) entry.state.complete();
    this.cache.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clear();
  }
}
