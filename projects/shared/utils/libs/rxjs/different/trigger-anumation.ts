import { Observable, of } from 'rxjs';
import { take, delay, startWith, switchMap } from 'rxjs/operators';

export function triggerAnimation$<T>(delayTime: number = 1000, initialValue: any = false) {
  return (source: Observable<T>) => source.pipe(
    take(1),
    delay(delayTime),
    startWith(initialValue)
  );
}
