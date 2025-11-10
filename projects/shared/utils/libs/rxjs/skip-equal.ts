import { distinctUntilChanged, OperatorFunction } from 'rxjs';
import {isDeepEqual} from '../../helpers/objects/is-deep-equal.util';

export function skipEqual$<T>(): OperatorFunction<T, T> {
  return distinctUntilChanged((object1, object2) => isDeepEqual(object1, object2));
}
