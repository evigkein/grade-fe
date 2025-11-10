import { NgZone, ɵɵdirectiveInject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export function runOutsideZone$<T>(): (source: Observable<T>) => Observable<T> {
  return function(source$: Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      ɵɵdirectiveInject(NgZone).runOutsideAngular(() => {
        return source$.subscribe(observer);
      });
    });
  };
}

/** Allows to run a stream outside NgZone without injecting ngZone to component */

/** Examples: */
// fromEvent(window, 'scroll').pipe(outsideZone()).subscribe(...)

/** Example with change detector ref: */
// new Observable().pipe(
//   runOutsideZone(),
//   tap(_ => do smth),
//   tap(_ => this.cdr.detectChanges()),
// )


// runOutsideZone => http://coldfox.ru/article/5d34b5f3d4c9ee288ef65338/change-detection-Angular-DOM
