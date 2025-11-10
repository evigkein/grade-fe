import { filter, OperatorFunction } from 'rxjs';

export function ensureValue$<T>(): OperatorFunction<T, T> {
  return filter(v => v !== null && v !== undefined);
}
