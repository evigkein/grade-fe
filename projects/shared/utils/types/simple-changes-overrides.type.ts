import type { SimpleChanges } from '@angular/core';

export type ISimpleChanges<C, K extends keyof C = keyof C> = SimpleChanges & {
  [key in K]?: ISimpleChange<C[key], true> | ISimpleChange<C[key], false>;
} & { [key in string]?: never };

export interface ISimpleChange<T, F = boolean> {
  previousValue: true extends F ? T | undefined : T;
  currentValue: T;
  firstChange: F;

  isFirstChange(): F;
}

/** This enables us to type SimpleChanges, which currently lacks typing */
/** Example:
 ngOnChanges(changes: SimpleChangesTyped<Component>) {
 changes.property.currentValue
 * */
