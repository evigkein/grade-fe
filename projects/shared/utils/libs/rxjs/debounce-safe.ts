import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import {skipEqual$} from './skip-equal';

export const debounceSafeDefault = 300;

export function debounceSafe$<T>(debounce = debounceSafeDefault): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(debounceTime(debounce), skipEqual$<T>());
}

export function throttleSafe$<T>(throttle = debounceSafeDefault): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(throttleTime(throttle), skipEqual$<T>());
}
