import { tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';

// Custom RxJs operator
export function log$<T>(source$: Observable<T>): Observable<T> {
  return source$.pipe(tap(v => console.log(`log: ${v}`)));
}

export function logWithTag$<T>(tag = 'VVV'): MonoTypeOperatorFunction<T> {
  return pipe(tap(v => console.log(`logWithTag(${tag}): ${v}`)));
}

export function logWithTag2$<T>(tag: string): (source$: Observable<T>) => Observable<T> {
  return source$ =>
    source$.pipe(tap(v => console.log(`logWithTag(${tag}): ${v}`)));
}

// const results$ = source$.pipe($logWithTag("RxJS"));
