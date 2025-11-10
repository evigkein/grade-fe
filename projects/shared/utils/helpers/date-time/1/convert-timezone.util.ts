function isDstObserved(date: Date, timezoneOffset: number): boolean {
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);

  const standardTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
  return timezoneOffset < standardTimezoneOffset;
}

function parseTimezoneOffset(offset: string): number {
  const sign = offset[0] === '-' ? -1 : 1;
  const [hours, minutes] = offset.slice(1).split(':').map(Number);
  return sign * (hours * 60 + minutes);
}

function convertToUserTimezone(meetingDateStr: string, userTimezoneOffsetStr: string): string {
  const meetingDate = new Date(meetingDateStr);
  const userTimezoneOffset = parseTimezoneOffset(userTimezoneOffsetStr);

  const userIsDst = isDstObserved(meetingDate, userTimezoneOffset);

  const localOffsetMinutes = meetingDate.getTimezoneOffset();

  const userAdjustedOffsetMinutes = userTimezoneOffset + (userIsDst ? 60 : 0);

  const utcMeetingDate = new Date(meetingDate.getTime() + localOffsetMinutes * 60000);
  const userTime = new Date(utcMeetingDate.getTime() - userAdjustedOffsetMinutes * 60000);

  return userTime.toString();
}

// Пример использования
const meetingDateStr = '2024-07-01T18:00:00'; // Время встречи в формате строки
const userTimezoneOffsetStr = '-07:00'; // Смещение для Лос-Анджелеса (UTC-7)

// Конвертируем время встречи в локальное время пользователя
const adjustedMeetingDate = convertToUserTimezone(meetingDateStr, userTimezoneOffsetStr);
console.log(adjustedMeetingDate); // Ожидаемый результат: "Mon Jul 01 2024 11:00:00 GMT-0700 (Pacific Daylight Time)"
