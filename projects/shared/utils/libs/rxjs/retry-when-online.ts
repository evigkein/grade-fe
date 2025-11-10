import { delay, switchMap, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { fromEvent, Observable, of, throwError, timer } from 'rxjs';

export function retryWhenOnline(errors: Observable<HttpErrorResponse>,
  delayTime = 2000,
  retries = 0) {
  return errors.pipe(
    switchMap((err: HttpErrorResponse) => {
      return err.status === 404 ? throwError(err) : of(err);
    }),
    delay(delayTime),
    switchMap<any, any>((err) => {
      retries--;
      if(err.status !== 500) {
        return throwError(err);
      }
      if (retries < 1)
        return throwError({
          error: err,
          message:
            'Sorry, server doesn\'t work correctly. ' +
            'Please try again later or contact your manager',
          status: 500,
        });
      if (navigator.onLine) {
        return timer(1000).pipe(take(5));
      }
      return fromEvent(window, 'online');
    }),
  );
}

// Повтор неудачного запроса
// https://www.youtube.com/watch?v=WZyhsNdXlA0&list=PL4hR27YmlLPoUYt2MgvNvr20et_bWTO2a&index=59
