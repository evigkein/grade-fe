import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SupportTimeOptions, DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { IDaysScheduleDto } from '../../../../../../src/app/domain/api/swagger/models/i-days-schedule-dto';
import { CustomControlAccessor } from '../../custom-control-accessor';

@Component({
    selector: 'p-date-time-picker',
    template: `
    <nz-date-picker
      [formControl]="formControl"
      [nzPlaceHolder]="placeholder | translate"
      [nzShowTime]="timeOptions"
      [nzShowNow]="false"
      [nzFormat]="format"
      [nzDisabledTime]="getDisabledTime"
      [nzDisabledDate]="getDisabledDate"
    ></nz-date-picker>
  `,
    styleUrls: ['./date-time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DateTimePickerComponent extends CustomControlAccessor {
  private _date!: Date;
  @Input() format = 'MMMM d (EEEE) hh:mm a';
  @Input() schedule: IDaysScheduleDto = {};

  // Новые входные параметры
  @Input() isPastDisabled = false;
  @Input() earliestDay: Date | null = null;
  @Input() lastDate: Date | null = null;

  timeOptions: SupportTimeOptions = {
    nzFormat: 'HH:mm a',
    nzHourStep: 1,
    nzMinuteStep: 15,
    nzUse12Hours: true,
    nzHideDisabledOptions: false,
    nzDefaultOpenValue: new Date(new Date().setMinutes(0)),
  };

  placeholder = 'Select date and time';

  get date() {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
    this.setTimeValue(value);
  }

  onDateChange(value: Date): void {
    const date = new Date(value);
    date.setMinutes(0);
    this.formControl.setValue(date);
  }

  override writeValue(val: Date): void {
    this.date = new Date(val);
    this.setNearestAvailableDate();
  }

  private setTimeValue(datetime?: Date) {
    const date = datetime ? new Date(datetime) : new Date();
    if (this.date != null) {
      this.formControl.setValue(date.getTime());
    }
  }

  private setNearestAvailableDate(): void {
    const today = new Date();
    let nearestDate: Date | null = null;

    // Проверка всех дней от earliestDay до lastDate (если установлены)
    const startDate = this.earliestDay && this.earliestDay > today ? this.earliestDay : today;

    for (let dayOffset = 0; dayOffset < 365; dayOffset++) { // проверяем до года вперед
      const checkDate = new Date(startDate);
      checkDate.setDate(startDate.getDate() + dayOffset);

      if (this.lastDate && checkDate > this.lastDate) {
        break;
      }

      const dayKey = this.getDayKey(checkDate.getUTCDay());
      const timeRanges = this.schedule[dayKey] || [];

      if (timeRanges.length > 0) {
        nearestDate = checkDate;
        break;
      }
    }

    // Устанавливаем ближайшую доступную дату, если она найдена
    if (nearestDate) {
      this.formControl.setValue(nearestDate);
      this.updateTimeForDate(nearestDate);
    } else if (this.isPastDisabled) {
      // Если нет доступных дат и прошлые даты дизейблены, очищаем значение
      this.formControl.setValue(null);
    }
  }

  // Логика для обновления времени при выборе даты
  private updateTimeForDate(selectedDate: Date): void {
    const dayKey = this.getDayKey(selectedDate.getUTCDay());
    const timeRanges = this.schedule[dayKey] || [];

    if (timeRanges.length > 0) {
      const fromDate = new Date(timeRanges[0].from);
      const toDate = new Date(timeRanges[0].to);

      if (fromDate && toDate) {
        selectedDate.setHours(fromDate.getHours());
        selectedDate.setMinutes(fromDate.getMinutes());
        this.formControl.setValue(selectedDate);
      }
    }
  }

  // Дизейблим временные интервалы
  getDisabledTime: DisabledTimeFn = (current: Date | Date[], partial: DisabledTimePartial | undefined) => {
    const currentDate = Array.isArray(current) ? current[0] : current;

    if (!currentDate) {
      return undefined;
    }

    return {
      nzDisabledHours: () => this.getDisabledHours(currentDate),
      nzDisabledMinutes: () => [], // Оставляем минуты полностью доступными
      nzDisabledSeconds: () => []
    };
  };

  // Дизейблим даты в календаре
  getDisabledDate = (current: Date): boolean => {
    const dayKey = this.getDayKey(current.getUTCDay());

    // Преобразуем дату в миллисекунды для корректного сравнения
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const earliestDateStart = this.earliestDay ? new Date(this.earliestDay).setHours(0, 0, 0, 0) : null;
    const lastDateEnd = this.lastDate ? new Date(this.lastDate).setHours(23, 59, 59, 999) : null;

    // Дизейблим все даты до earliestDay, если earliestDay установлена
    if (earliestDateStart && current.getTime() < earliestDateStart) {
      return true;
    }

    // Дизейблим все прошлые даты, если isPastDisabled = true
    if (this.isPastDisabled && current.getTime() < todayStart) {
      return true;
    }

    // Дизейблим даты после последней доступной даты, если lastDate установлена
    if (lastDateEnd && current.getTime() > lastDateEnd) {
      return true;
    }

    // Дизейблим даты, если они не имеют доступных временных слотов
    return !(this.schedule[dayKey] && this.schedule[dayKey].length > 0);
  };

  // Логика для получения отключенных часов
  private getDisabledHours(current: Date): number[] {
    const dayKey = this.getDayKey(current.getUTCDay());
    const timeRanges = this.schedule[dayKey] || [];
    const disabledHours: number[] = [];

    for (let hour = 0; hour < 24; hour++) {
      const isEnabled = timeRanges.some(({ from, to }) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return (
          (hour >= fromDate.getUTCHours() && hour <= toDate.getUTCHours()) || // В пределах одного дня
          (fromDate.getUTCHours() > toDate.getUTCHours() && (hour >= fromDate.getUTCHours() || hour <= toDate.getUTCHours())) // В пределах двух дней
        );
      });

      if (!isEnabled) {
        disabledHours.push(hour);
      }
    }

    return disabledHours;
  }

  // Получение ключа дня недели
  private getDayKey(day: number): string {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[day];
  }
}
