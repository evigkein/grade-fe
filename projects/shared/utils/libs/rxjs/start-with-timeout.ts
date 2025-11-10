import {OperatorFunction, race, SchedulerLike, timer} from 'rxjs';
import {map} from 'rxjs/operators';

export function startWithTimeout<T, S = T>(
  value: S,
  duration: number | Date,
  scheduler?: SchedulerLike,
): OperatorFunction<T, S | T> {
  return (source) =>
    race(
      source,
      timer(duration, scheduler).pipe(map(() => value))
    );
}

//  startWithTimeout(null, defaultWaitingMoneyProviderTime),
