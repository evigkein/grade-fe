import {from, Observable, of} from 'rxjs';

export function toObservable(
  value$: boolean | Promise<boolean> | Observable<boolean>,
): Observable<boolean> {
  if (typeof value$ === 'boolean') {
    return of(value$);
  }

  return from(value$);
}
