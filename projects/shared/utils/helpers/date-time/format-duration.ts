export interface IFormattedTimerDate {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  mins?: number;
  seconds?: number;
}

export function formatDuration(input: Partial<IFormattedTimerDate>): IFormattedTimerDate {
  const totalSeconds =
    (input.seconds ?? 0) +
    (input.mins ?? 0) * 60 +
    (input.hours ?? 0) * 3600 +
    (input.days ?? 0) * 86400 +
    (input.months ?? 0) * 30 * 86400 +
    (input.years ?? 0) * 365 * 86400;

  // раскладываем обратно по единицам
  const years = Math.floor(totalSeconds / (365 * 86400));
  const months = Math.floor((totalSeconds % (365 * 86400)) / (30 * 86400));
  const days = Math.floor((totalSeconds % (30 * 86400)) / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { years, months, days, hours, mins: minutes, seconds };
}

export function formatDurationShort(
  duration: IFormattedTimerDate,
  lang: 'en' | 'ru' = 'ru',
  withRecalc = true,
): string {
  if(withRecalc) duration = formatDuration(duration);

  const units: Record<string, string> =
    lang === 'ru'
      ? { years: 'г', months: 'мес', days: 'д', hours: 'ч', mins: 'мин', seconds: 'с' }
      : { years: 'y', months: 'mo', days: 'd', hours: 'h', mins: 'min', seconds: 's' };

  const parts: string[] = [];

  if (duration.years) parts.push(`${duration.years}${units.years}`);
  if (duration.months) parts.push(`${duration.months}${units.months}`);
  if (duration.days) parts.push(`${duration.days}${units.days}`);
  if (duration.hours) parts.push(`${duration.hours}${units.hours}`);
  if (duration.mins) parts.push(`${duration.mins}${units.mins}`);
  // if (duration.seconds) parts.push(`${duration.seconds}${units.seconds}`);

  return parts.join(' ') || (lang === 'ru' ? '0с' : '0s');
}
