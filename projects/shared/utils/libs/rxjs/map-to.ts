import { map, Observable, OperatorFunction } from 'rxjs';

export function mapTo$<T, K extends keyof T>(key: K, safeValue?: T[K]): OperatorFunction<T, T[K]> {
  return (source: Observable<T>) => source.pipe(
    map(obj => obj?.[key] ?? safeValue ?? undefined as T[K]),
  );
}
