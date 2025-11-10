import {interval, map, Observable} from 'rxjs';
import { countdown, TContDown } from '../features/countdown/countdown';

export function startCountdown$(finishedAt: string, type: TContDown = 'full'): Observable<string[]> {
  return interval(1000).pipe(
    map(() => countdown(finishedAt, type))
  );
}

export function getOneMinuteFromNow(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  return now.toISOString();
}
