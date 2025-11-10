import { map, OperatorFunction } from 'rxjs';

export function typeGuard$<T>(): OperatorFunction<any, T> {
  return map((v: any) => v as T);
}
