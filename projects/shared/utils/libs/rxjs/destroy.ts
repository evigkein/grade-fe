import {DestroyRef, inject} from '@angular/core';
import { OperatorFunction, Subject, takeUntil } from 'rxjs';

export function destroy() {
  const subject = new Subject<void>();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true as any);
    subject.complete();
  });

  return function <T>(): OperatorFunction<T, T> {
    return takeUntil(subject.asObservable());
  };
}

// private destroy$ = destroy();
//  .pipe(
//    this.destroy$(),
//   )
