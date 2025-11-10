export interface Locale extends Intl.Locale {
  baseName: string;
  calendar?: string;
  calendars: string[];
  collation?: string;
  collations: string[];
  language: string;
  numberingSystem?: string;
  numberingSystems: string[];
  numeric: boolean;
  region?: string;
  script?: string;
  textInfo: {
    direction: string;
  };
  timeZones?: string[];
  weekInfo: {
    firstDay: number;
    minimalDays: number;
    weekend: number[];
  };
}

export function getLocale(lang: string): Locale | undefined {
  if (typeof Intl !== 'undefined' && 'Locale' in Intl) {
    try {
      return new Intl.Locale(lang) as Locale;
    } catch (error) {
      console.error('Error using Intl.Locale:', error);
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function is12HourTimeFormat(): boolean {
  const options = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric'
  }).resolvedOptions();

  return options.hour12 === true;
}

function getFirstDayOfWeek(): number {
  const date = new Date();
  const format = new Intl.DateTimeFormat('default', { weekday: 'short' }).format(date);

  return format.startsWith('S') ? 0 : 1; // Sunday 0, 1 (Monday)
}

export function isSunFirstDayOfWeek(): boolean {
  return getFirstDayOfWeek() === 1
}
