import { OperatorFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

export function $assign<T>(): OperatorFunction<Partial<T>, Partial<T>> {
  return scan<Partial<T>>((state, updates) => ({ ...state, ...updates }));
}
