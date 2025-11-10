import {ChangeDetectorRef, ɵɵdirectiveInject} from '@angular/core';
import {MonoTypeOperatorFunction} from 'rxjs';
import {tap} from 'rxjs/operators';

export function cdr<T>(changeDetectorRef?: ChangeDetectorRef): MonoTypeOperatorFunction<T> {
  if (!changeDetectorRef) {
    try {
      changeDetectorRef = ɵɵdirectiveInject(ChangeDetectorRef);
    } catch (e) {}
  }
  return tap(
    () => {
      if (changeDetectorRef) {
        changeDetectorRef.markForCheck();
      }
    },
    () => {
      if (changeDetectorRef) {
        changeDetectorRef.markForCheck();
      }
    },
    () => {
      if (changeDetectorRef) {
        changeDetectorRef.markForCheck();
      }
    },
  );
}
