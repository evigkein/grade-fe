// function getOffset(date, timeZone) {
//   const options = { timeZone, timeZoneName: 'short' };
//   const formatter = new Intl.DateTimeFormat([], options);
//   const parts = formatter.formatToParts(date);
//   const timeZoneName = parts.find(part => part.type === 'timeZoneName').value;
//
//   const match = timeZoneName.match(/([+-]\d{2})(\d{2})/);
//   if (match) {
//     const hours = parseInt(match[1], 10);
//     const minutes = parseInt(match[2], 10);
//     const offset = hours * 60 + (hours < 0 ? -minutes : minutes);
//     return offset;
//   }
//   return 0; // Default to UTC if no match found
// }
//
// /** сюда отправляю таймзону, и могу получить 2 времени: с оффсетом по настройкам как в БД, и с оффсетом по текущему времени
//  * Уже учитывает летнее и зимнее время
//  * */
// function getAdjustedDateTimezones(meetingDateStr, timeZone) {
//   const meetingDate = new Date(meetingDateStr);
//
//   // Get the offset in minutes for the given time zone
//   const offsetMinutes = getOffset(meetingDate, timeZone);
//
//   // Adjust the meeting date to the target time zone
//   const utcTime = meetingDate.getTime() - (meetingDate.getTimezoneOffset() * 60000);
//   const adjustedTime = utcTime + (offsetMinutes * 60000);
//
//   return new Date(adjustedTime);
// }

/** America/Los_Angeles => -07:00 */
export function getTimezoneOffset(timezone: string): string {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));

  const diff = (utcDate.getTime() - tzDate.getTime()) / 60000; // Difference in minutes
  const sign = diff > 0 ? "-" : "+";
  const hours = Math.floor(Math.abs(diff) / 60).toString().padStart(2, '0');
  const minutes = (Math.abs(diff) % 60).toString().padStart(2, '0');

  return `${sign}${hours}:${minutes}`;
}
