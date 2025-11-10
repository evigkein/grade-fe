import { removeItemFromStringArray } from "./remove-item-from-array";

export function updateArrayStringItem<T extends string>(currentValue: T[], event: T): string[] {
  const isValueSelected = currentValue.includes(event);
  return isValueSelected ? removeItemFromStringArray(currentValue, event) : [...currentValue, event];
}
