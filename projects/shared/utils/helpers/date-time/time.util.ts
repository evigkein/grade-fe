export function getHoursFromTime(time: number): number {
  return Math.floor(time / 3600);
}

export function getMinutesFromTime(time: number): number {
  return Math.floor(time % 3600 / 60);
}

export function getSecondsFromTime(time: number): number {
  return Math.floor(time % 3600 % 60);
}

export function convertSecondsToMinutes(time: number): number {
  return Math.floor(time * 60);
}

export function getDaysFromHours(hours: number): number {
  return hours / 24;
}

