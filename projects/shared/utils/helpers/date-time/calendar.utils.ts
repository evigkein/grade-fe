export const getMillisecondsByDate = (date: Date): number => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const dateWithoutTime = new Date(date.getTime() - userTimezoneOffset);
  const isoDateWithoutTime = dateWithoutTime.toISOString().split('T')[0];

  return Date.parse(isoDateWithoutTime);
};

export const isAfter = (firstDate: Date, secondDate: Date): boolean => {
  const firstDateMilliseconds = getMillisecondsByDate(firstDate);
  const secondDateMilliseconds = getMillisecondsByDate(secondDate);

  return firstDateMilliseconds > secondDateMilliseconds;
};

export const isBefore = (firstDate: Date, secondDate: Date): boolean => {
  const firstDateMilliseconds = getMillisecondsByDate(firstDate);
  const secondDateMilliseconds = getMillisecondsByDate(secondDate);

  return firstDateMilliseconds < secondDateMilliseconds;
};

export const isEqual = (firstDate: Date, secondDate: Date): boolean => {
  const firstDateMilliseconds = getMillisecondsByDate(firstDate);
  const secondDateMilliseconds = getMillisecondsByDate(secondDate);

  return firstDateMilliseconds === secondDateMilliseconds;
};

export const getMonthByDate = (date: Date): number => {
  return date.getUTCMonth();
};

export const getYearByDate = (date: Date): number => {
  return date.getUTCFullYear();
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthGapDays = (year: number, month: number): number => {
  // getDay - вернет число от 0 до 6, где 0 - это воскресенье
  let dayOfWeek = new Date(year, month, 1).getDay();
  // вычтем 1 для получения гэпа для всех дней, кроме воскресенья (-1)
  dayOfWeek -= 1;
  // если воскресенье, то гэп равен 6, по остальным dayOfWeek
  return dayOfWeek > -1 ? dayOfWeek : 6;
};

export const isDisabledDate = (
  date: Date,
  allowedDates: Date[],
  minDate: Date | null,
  maxDate: Date | null,
): boolean => {
  if (minDate && isBefore(date, minDate)) {
    return true;
  }

  if (maxDate && isAfter(date, maxDate)) {
    return true;
  }

  if (allowedDates.length === 0) {
    return false;
  }

  const founded = allowedDates.find((allowedDate: Date) => {
    return isEqual(date, allowedDate);
  });

  return !founded;
};

export const defineMinDate = (
  minDate: Date | null,
  minToday: boolean,
  today: Date,
): Date | null => {
  if (minDate) {
    return minDate;
  }

  if (minToday) {
    return today;
  }

  return null;
};

export const defineMaxDate = (
  maxDate: Date | null,
  maxToday: boolean,
  today: Date,
): Date | null => {
  if (maxDate) {
    return maxDate;
  }

  if (maxToday) {
    return today;
  }

  return null;
};

export const getNextMonth = (
  year: number,
  month: number,
): { year: number; month: number } => {
  let nextMonth = month;
  let nextYear = year;

  if (month === 11) {
    nextMonth = 0;
    nextYear += 1;
  } else {
    nextMonth += 1;
  }

  return {
    year: nextYear,
    month: nextMonth,
  };
};
export const getPrevMonth = (
  year: number,
  month: number,
): { year: number; month: number } => {
  let prevMonth = month;
  let prevYear = year;

  if (month === 0) {
    prevMonth = 11;
    prevYear -= 1;
  } else {
    prevMonth -= 1;
  }

  return {
    year: prevYear,
    month: prevMonth,
  };
};

export const getLastDayOfMonth = (year: number, month: number): Date => {
  const lastDay = getDaysInMonth(year, month);
  return new Date(year, month, lastDay);
};

export const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};
