import { LocaleSpecification } from 'moment/moment';

export const momentLocales: Record<string, LocaleSpecification> = {
  ru: {
    months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsShort: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_'),

    weekdays: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
    weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),

    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY г.',
      LLL: 'D MMMM YYYY г., HH:mm',
      LLLL: 'dddd, D MMMM YYYY г., HH:mm',
    },

    calendar: {
      sameDay: '[Сегодня в] LT',
      nextDay: '[Завтра в] LT',
      nextWeek: 'dddd [в] LT',
      lastDay: '[Вчера в] LT',
      lastWeek: '[В прошлый] dddd [в] LT',
      sameElse: 'L',
    },

    relativeTime: {
      future: 'через %s',
      past: '%s назад',
      s: 'несколько секунд',
      ss: '%d секунд',
      m: 'минута',
      mm: '%d минут',
      h: 'час',
      hh: '%d часов',
      d: 'день',
      dd: '%d дней',
      M: 'месяц',
      MM: '%d месяцев',
      y: 'год',
      yy: '%d лет',
    },

    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM: (input: string): boolean => /дня|вечера/.test(input),
    meridiem: (hour: number): string => {
      if (hour < 4) return 'ночи';
      if (hour < 12) return 'утра';
      if (hour < 17) return 'дня';
      return 'вечера';
    },

    week: {
      dow: 1,
      doy: 7,
    },

    invalidDate: 'Неверная дата',
  },

  en: {
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),

    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),

    longDateFormat: {
      LT: 'h:mm A',
      LTS: 'h:mm:ss A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
    },

    calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L',
    },

    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },

    meridiemParse: /am|pm/i,
    isPM: (input: string): boolean => input.toLowerCase() === 'pm',
    meridiem: (hour: number, minute: number, isLower: boolean): string =>
      hour < 12 ? (isLower ? 'am' : 'AM') : (isLower ? 'pm' : 'PM'),

    week: {
      dow: 0,
      doy: 6,
    },

    invalidDate: 'Invalid date',
  },
};
