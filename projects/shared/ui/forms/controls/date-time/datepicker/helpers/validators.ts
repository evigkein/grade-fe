import moment, { Moment } from 'moment';
import { AvailableDateTime } from '../datepicker.component';

export function isDateAvailable(
  date: Moment,
  minDate: Date | null,
  maxDate: Date | null,
  availableDates: Date[] | null,
  disabledDates: Date[] | null,
  isPastDisabled: boolean,
  isFutureDisabled: boolean,
  disableSpecificDayOfWeek: number[],
  availableDateTime: AvailableDateTime[] | null
): boolean {

  // Отключение дат в прошлом
  if (isPastDisabled && date.isBefore(moment(), 'day')) {
    return false;
  }

  // Отключение дат в будущем
  if (isFutureDisabled && date.isAfter(moment(), 'day')) {
    return false;
  }

  // Отключение дат, которые меньше минимальной даты
  if (minDate && date.isBefore(moment(minDate), 'day')) {
    return false;
  }

  // Отключение дат, которые больше максимальной даты
  if (maxDate && date.isAfter(moment(maxDate), 'day')) {
    return false;
  }

  // Отключение специфических дней недели
  if (disableSpecificDayOfWeek.includes(date.day())) {
    return false;
  }

  // Отключение дат из списка `disabledDates`
  if (disabledDates && disabledDates.some(disabledDate => date.isSame(moment(disabledDate), 'day'))) {
    return false;
  }

  // Проверка на доступность дат из списка `availableDates`
  if (availableDates && availableDates.length > 0) {
    if (!availableDates.some(availableDate => date.isSame(moment(availableDate), 'day'))) {
      return false;
    }
  }

  // Проверка на доступность дат из списка `availableDateTime`
  if (availableDateTime && availableDateTime.length > 0) {
    const availableDate = availableDateTime.find(slot => moment(slot.date).isSame(date, 'day'));
    if (!availableDate || availableDate.time.length === 0) {
      return false;
    }
  }

  return true;
}
