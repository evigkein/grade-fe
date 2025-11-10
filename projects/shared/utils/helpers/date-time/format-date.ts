// import { isValid, parse } from 'date-fns';
// import { formatToTimeZone } from 'date-fns-timezone';
//
// export function formatDateTime(date: Date | string, parseFormat: string = ''): string | undefined {
//   if (!date) {
//     return;
//   }
//
//   if (parseFormat) {
//     date = parse(date.toString(), parseFormat, new Date());
//   }
//
//   return formatToTimeZone(date, 'YYYY-MM-DDTHH:mm:ssZ', {
//     timeZone: 'Europe/Moscow',
//   });
// }

export function formatDateToIsoString(date: Date, withTime = false, withTimezoneOffset = false): string {
  const preparedDate = withTimezoneOffset ? dateWithOffset(date) : date;
  return withTime ? preparedDate.toISOString() : preparedDate.toISOString().split('T')[0];
}

export function formatDate(data: Date | string): string {

  const date = new Date(data);
  const diff = Date.now() - date.getTime();

  if (diff < 1000) {
    return 'right now';
  }

  const sec = Math.floor(diff / 1000);
  if (sec < 60) {
    return `${sec} sec ago`;
  }

  const min = Math.floor(diff / 60000);
  if (min < 60) {
    return `${min} min ago`;
  }

  return `${formatNumber(date.getDate())}.${formatNumber(date.getMonth() + 1)}.${date.getFullYear()} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;
}

function formatNumber(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export function dateWithOffset(date: Date): Date {
  const offset = getTimezoneOffset(date);
  return new Date(date.getTime() - offset);
}

export function getTimezoneOffset(date: Date): number {
  return date.getTimezoneOffset() * 60 * 1000;
}
