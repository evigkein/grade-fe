import { AvailableDateTime } from '../datepicker.component';
import { IDatePickerSchedule } from '../interfaces/interfaces';


export function getAvailableScheduleOptions(schedule: IDatePickerSchedule | undefined, maxDate: Date, isSunFirstDay: boolean = true): AvailableDateTime[] | null {
  if(!schedule) return null;

  const availableDateTime: AvailableDateTime[] = [];

  const dayMap: Record<string, number> = isSunFirstDay
    ? { "sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6 }
    : { "mon": 0, "tue": 1, "wed": 2, "thu": 3, "fri": 4, "sat": 5, "sun": 6 };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // for (const [day, timeSlots] of Object.entries(schedule.days)) {
  //   const dayOfWeek = dayMap[day];
  //
  //   for (let currentDate = new Date(today); currentDate <= maxDate; currentDate.setDate(currentDate.getDate() + 1)) {
  //     if (currentDate.getDay() === dayOfWeek && timeSlots?.length) {
  //       const mappedTimeSlots = timeSlots.map((slot: ITimeSlotDto) => ({
  //         from: new Date(slot.from),
  //         to: new Date(slot.to)
  //       }));
  //
  //       availableDateTime.push({
  //         date: new Date(currentDate),
  //         time: mappedTimeSlots
  //       });
  //     }
  //   }
  // }

  return availableDateTime;
}
