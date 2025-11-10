import {AbstractControl} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';

export function valueChanges<T = any>(control: AbstractControl): Observable<T> {
  return control.valueChanges.pipe(
    startWith(undefined),
    map(() => control.value),
  );
}
