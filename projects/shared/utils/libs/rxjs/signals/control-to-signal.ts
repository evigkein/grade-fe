import {Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {AbstractControl} from '@angular/forms';
import {valueChanges} from '../different/value-changes';

export function controlToSignal<T>(control: AbstractControl<T>): Signal<T> {
  return toSignal(valueChanges<T>(control), { requireSync: true });
}


