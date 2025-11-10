
export interface ITimeSlot {
  from: string;
  to: string;
}

export interface IDaysSchedule {
  fri?: Array<ITimeSlot>;
  mon?: Array<ITimeSlot>;
  sat?: Array<ITimeSlot>;
  sun?: Array<ITimeSlot>;
  thu?: Array<ITimeSlot>;
  tue?: Array<ITimeSlot>;
  wed?: Array<ITimeSlot>;
}

export interface IDatePickerSchedule {

  days: IDaysSchedule;

  maxDate?: '1 w' | '2 w' | '3 w' | '1 m' | '2 m' | '3 m' | '4 m' | '5 m' | '6 m' | '1 y';
}

export interface IDatePickerMonth { name: string; index: number };
