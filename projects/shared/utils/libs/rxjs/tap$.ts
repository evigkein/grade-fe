import { OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tap$<T>(marker = ''): OperatorFunction<T, T> {
  return tap(value => {
    console.log(value, marker);
  });
}
