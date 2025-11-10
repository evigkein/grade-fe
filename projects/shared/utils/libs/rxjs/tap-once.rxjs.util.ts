import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export function tapOnce<T>(fn: (value: T) => void): MonoTypeOperatorFunction<T> {
  let hasExecuted = false;

  return (source: Observable<T>): Observable<T> =>
    new Observable<T>(observer => {
      return source.subscribe({
        next(value) {
          if (!hasExecuted) {
            fn(value);
            hasExecuted = true;
          }
          observer.next(value);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });
    });
}
