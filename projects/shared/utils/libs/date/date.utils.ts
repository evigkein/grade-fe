import { dayInMs } from '@core';

export function isPastDate(date: Date | string): boolean {
  const inputDate = new Date(date);
  const currentDate = new Date();

  return inputDate < currentDate;
}

export function isYesterday(
  date: Date | string,
  current: Date | string = new Date(),
): boolean {
  try {
    const currentDate = new Date(current);
    const lastClaimDate = new Date(date);

    if (isNaN(currentDate.getTime()) || isNaN(lastClaimDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const currentUTC = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
      ),
    );

    const lastUTC = new Date(
      Date.UTC(
        lastClaimDate.getUTCFullYear(),
        lastClaimDate.getUTCMonth(),
        lastClaimDate.getUTCDate(),
      ),
    );

    const diffInMs = currentUTC.getTime() - lastUTC.getTime();

    return diffInMs === dayInMs;
  } catch (error) {
    // console.error('Error in isYesterday function:', error?.message);
    return false;
  }
}
