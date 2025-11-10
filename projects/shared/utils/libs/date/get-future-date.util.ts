export type TFutureDateOffset = 'd' | 'w' | 'm' | 'y' | 'min'

export function getFutureDate(offset: number = 0, offsetType: TFutureDateOffset, date: Date | string = new Date()): Date {
  const currentDate = new Date(date);

  switch (offsetType) {
    case 'd':
      currentDate.setDate(currentDate.getDate() + offset);
      break;
    case 'w':
      currentDate.setDate(currentDate.getDate() + (offset * 7));
      break;
    case 'm':
      currentDate.setMonth(currentDate.getMonth() + offset);
      break;
    case 'y':
      currentDate.setFullYear(currentDate.getFullYear() + offset);
      break;
    case 'min':
      currentDate.setMinutes(currentDate.getMinutes() + offset);
      break;
    default:
      throw new Error(`Unsupported offset type: ${offsetType}`);
  }

  return currentDate;
}
