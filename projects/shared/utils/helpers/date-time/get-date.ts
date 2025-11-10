import {formatDateToIsoString} from './format-date';
import {dayInMs} from './time-in-ms';

export type TDateOffset = 'd' | 'w' | 'm' | 'y' | 'h' | 'min';

export interface IGetDateOptions {
  date?: Date | string;
  mode?: 'future' | 'past';
}

export function getDate(
  offset: number = 0,
  offsetType: TDateOffset,
  options: IGetDateOptions = {},
): Date {
  const { date = new Date(), mode = 'future' } = options;
  const currentDate = new Date(date);
  const multiplier = mode === 'future' ? 1 : -1;

  switch (offsetType) {
    case 'd':
      currentDate.setDate(currentDate.getDate() + offset * multiplier);
      break;
    case 'w':
      currentDate.setDate(currentDate.getDate() + offset * 7 * multiplier);
      break;
    case 'm':
      currentDate.setMonth(currentDate.getMonth() + offset * multiplier);
      break;
    case 'y':
      currentDate.setFullYear(currentDate.getFullYear() + offset * multiplier);
      break;
    case 'h':
      currentDate.setHours(currentDate.getHours() + offset * multiplier);
      break;
    case 'min':
      currentDate.setMinutes(currentDate.getMinutes() + offset * multiplier);
      break;
    default:
      throw new Error(`Unsupported offset type: ${offsetType}`);
  }

  return currentDate;
}

export function getDateDaysAgo(date: Date, days: number): number {
  const copyDate = new Date(date);
  copyDate.setDate(date.getDate() - days);
  return copyDate.getDate();
}

// untested
export function getDateAgoByDays(date: Date, days: number): Date {
  const amountDays = dayInMs * days;
  const todayDays = Number(new Date()) % 86400000;

  return new Date(todayDays - amountDays);
}

export function getDatesDifferenceFromToday(date: Date): number {
  const dateNow = new Date();
  return date.getTime() - dateNow.getTime();
}

export function isToday(date: Date): boolean {
  const today = new Date();

  return date.toDateString() === today.toDateString();
}

export function isWithin24h(date: Date): boolean {
  const difference = getDatesDifferenceFromToday(date);
  return difference <= dayInMs;
}

export function isTomorrow(date: Date, today = new Date()): boolean {
  const tomorrow = new Date(today) || new Date();
  tomorrow.setDate(today.getDate() + 1);

  return date.toDateString() === tomorrow.toDateString();
}

export function isTodayOrTomorrow(date: Date, capital = false): string {
  if (isToday(date)) return capital ? 'Today' : 'today';
  if (isTomorrow(date)) return capital ? 'Tomorrow' : 'tomorrow';
  return formatDateToIsoString(date);
}

