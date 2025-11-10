import {
  dayInMs,
  hourInMs,
  minuteInMs,
  secondInMs
} from '../../helpers/date-time/time-in-ms';
import {IFormattedTimerDate} from './firmatted-timer-date.interface';

export type TContDown = 'ss' | 'full'

export function countdown(finishedAt: string, type: TContDown = 'full'): string[] {
  const countdownDate = new Date(finishedAt).getTime();
  // const now = UTCNow();
  const now = new Date().getTime();
  const timeLeft = countdownDate - now;

  if (timeLeft < 0) {
    return [];
  }

  const days = Math.floor(timeLeft / dayInMs);
  const hours = Math.floor((timeLeft % dayInMs) / hourInMs);
  const minutes = Math.floor((timeLeft % hourInMs) / minuteInMs);
  const seconds = Math.floor((timeLeft % minuteInMs) / secondInMs);

  if (type === 'ss') {
    return [getTimeValue(seconds)];
  }

  return [getTimeValue(days), getTimeValue(hours), getTimeValue(minutes), getTimeValue(seconds)];
}

function getTimeValue(time: number): string {
  if(time === 0) {
    return '00';
  }
  return time.toString().length === 1 ? `0${time}` : time.toString();
}


export function getTimerDateFromDate(date: Date): IFormattedTimerDate {
  const currentDate = date.getTime();
  const days = Math.floor(currentDate / dayInMs);

  const dateWithoutDays = currentDate - (days * dayInMs);
  const hours = Math.floor(dateWithoutDays / hourInMs);

  const dateWithoutHours = dateWithoutDays - (hours * hourInMs);
  const minutes = Math.floor(dateWithoutHours / minuteInMs);

  const dateWithoutMinutes = dateWithoutHours - (minutes * minuteInMs);
  const seconds = Math.floor(dateWithoutMinutes / minuteInMs);

  return { days, hours, minutes, seconds };
}


/// FNS:
//export function countdown(finishedAt: string): string[] {
//   const countdownDate = new Date(finishedAt);
//   const now = new Date();
//
//   if (isBefore(countdownDate, now)) {
//     return ['00', '00', '00'];
//   }
//
//   const hours = differenceInHours(countdownDate, now);
//   const minutes = differenceInMinutes(countdownDate, add(now, { hours }));
//   const seconds = differenceInSeconds(countdownDate, add(now, { hours, minutes }));
//
//   return [getTimeValue(+hours), getTimeValue(+minutes), getTimeValue(+seconds)];
// }
