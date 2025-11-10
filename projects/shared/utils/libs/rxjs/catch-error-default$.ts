import {catchError, of, OperatorFunction} from 'rxjs';

export function catchErrorDefault$<T, P>(val?: P, errMsg?: string): OperatorFunction<T, T | P> {
  return catchError(err => {
    errMsg && console.error('CatchErrorDefault', err, errMsg);
    return of(val !== undefined ? val : err);
  });
}
