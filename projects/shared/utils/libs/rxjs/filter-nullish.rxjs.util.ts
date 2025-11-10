import { OperatorFunction, filter } from 'rxjs';

export function filterNullish$<T>(isPure = true, isReverse = false): OperatorFunction<T, T> {
  return isPure
    ? filter(v => isReverse ? (v === null || v === undefined) : (v !== null && v !== undefined))
    : filter(v => isReverse ? !v : !!v);
}
