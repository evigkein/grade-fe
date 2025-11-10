export function getUserTimezoneOffset(): string {
  const currentDate = new Date();
  const offsetMinutes = -currentDate.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;
  const formattedOffset =
    `${offsetMinutes >= 0 ? '+' : '-'}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

  return formattedOffset;
}

export function getTimezone() {
  // Получаем временную зону пользователя с помощью Intl.DateTimeFormat
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function isDstObserved(date: Date, timezoneOffset: number): boolean {
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);

  const standardTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());

  return timezoneOffset < standardTimezoneOffset;
}

export function convertToUTC(date: Date | string): string {
  const utcDate = new Date(date instanceof Date ? date.toISOString() : date);
  return utcDate.toISOString();
}

export function convertFromUTC(date: string, timezone: string): string {
  const localDate = new Date(date).toLocaleString('en-US', { timeZone: timezone });
  return new Date(localDate).toISOString();
}

export function getTimezoneOffset(fromTimezone: string, toTimezone: string, date: Date = new Date()): number {
  const fromOffset = getTimezoneOffsetInMinutes(fromTimezone, date);
  const toOffset = getTimezoneOffsetInMinutes(toTimezone, date);
  return toOffset - fromOffset;
}

export function convertTimezone(time: Date | string, fromTimezone: string, toTimezone: string): string {
  const date = typeof time === 'string' ? new Date(time) : time;
  const fromOffset = getTimezoneOffsetInMinutes(fromTimezone, date);
  const toOffset = getTimezoneOffsetInMinutes(toTimezone, date);
  const newDate = new Date(date.getTime() + (toOffset - fromOffset) * 60 * 1000);
  return newDate.toISOString();
}

export function formatDate(date: Date | string, timezone: string, format: string = 'YYYY-MM-DDTHH:mm:ss.sssZ'): string {
  const options = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: timezone
  } as const;

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
  const parts = dateTimeFormat.formatToParts(new Date(date));
  const formattedDate = parts.reduce((acc, part) => {
    switch (part.type) {
      case 'year': return acc.replace('YYYY', part.value);
      case 'month': return acc.replace('MM', part.value);
      case 'day': return acc.replace('DD', part.value);
      case 'hour': return acc.replace('HH', part.value);
      case 'minute': return acc.replace('mm', part.value);
      case 'second': return acc.replace('ss', part.value);
      default: return acc;
    }
  }, format);

  return formattedDate;
}

function getTimezoneOffsetInMinutes(timezone: string, date: Date): number {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  return (utcDate.getTime() - tzDate.getTime()) / (1000 * 60);
}
