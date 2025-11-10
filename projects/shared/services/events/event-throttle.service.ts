import {inject, Injectable, NgZone} from '@angular/core';
import { Observable, Subject, asyncScheduler } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

const DEFAULT_THROTTLE_TIME = 50;

@Injectable({ providedIn: 'root' })
export class EventThrottleService {
  private zone = inject(NgZone);

  throttleEvent<T = Event>(event$: Observable<T>, throttleValue = DEFAULT_THROTTLE_TIME): Observable<T> {
    const throttledEvent$ = new Subject<T>();

    this.zone.runOutsideAngular(() => {
      event$
        .pipe(
          throttleTime(throttleValue, asyncScheduler, {
            leading: true,
            trailing: true,
          }),
          tap(event => this.zone.run(() => throttledEvent$.next(event)))
          // we don't need to unsubscribe here, the stream start one time for one event and lives while the app lives.
        )
        .subscribe();
    });

    return throttledEvent$.asObservable();
  }
}
