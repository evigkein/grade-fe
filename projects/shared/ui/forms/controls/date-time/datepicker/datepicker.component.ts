import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  input,
  output,
  booleanAttribute,
  numberAttribute,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  TemplateRef,
  computed,
  effect
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import moment, { Moment } from 'moment';
import { startWith } from 'rxjs';
import { destroy } from '@utils/libs/rxjs';
import { StopEventsDirective } from '../../../../../directives/utils';
import { ClickOutsideDirective } from '../../../../../directives/utils/click-outside.directive';
import { DisableBodyScrollDirective } from '@services/body/disable-body-scroll.directive';
import { ButtonComponent } from '../../../../components/button/button.component';
import { PopoverComponent } from '../../../../components/common/popover/popover.component';
import { SvgIconComponent } from '../../../../modules/svg-icon/svg-icon.component';
import { LabelComponent } from '../../../components/input-label/input-label.component';
import { CustomControlAccessor } from '../../../custom-control-accessor';
import { InputModule } from '../../input/input.module';
import { TimepickerComponent, TimeSlotRange } from '../timepicker/timepicker.component';
import { signal } from '@angular/core';
import { dateMonths, defaultCalendarMaxYear, weekdaysFromMon, weekdaysFromSun } from './constants/constants';
import { isDateAvailable } from './helpers/validators';
import { IDatePickerMonth } from './interfaces/interfaces';

interface Day {
  value: number;
  available: boolean;
  date: moment.Moment;
}

export interface TimeSlot {
  from: Date;
  to: Date;
}

export interface AvailableDateTime {
  date: Date;
  time: TimeSlot[];
}

@Component({
  selector: 'p-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent, TimepickerComponent, ReactiveFormsModule, PopoverComponent, ClickOutsideDirective, InputModule, StopEventsDirective, DisableBodyScrollDirective, LabelComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent extends CustomControlAccessor implements OnInit {
  locale = input('en');
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  availableDates = input<Date[] | null>(null);
  disabledDates = input<Date[] | null>(null);
  isPastDisabled = input(false, { transform: booleanAttribute });
  isFutureDisabled = input(false, { transform: booleanAttribute });
  disableSpecificDayOfWeek = input<number[]>([]);
  availableDateTime = input<AvailableDateTime[] | null>(null);
  availableTimeSlots = input<TimeSlotRange[] | null>(null);
  label = input('');
  labelType = input<'bold' | ''>('');
  labelSize = input<'l' | ''>('');
  alignLabel = input<'center' | ''>('');
  placeholder = input('Выберите дату и время');
  tooltipText = input<string | TemplateRef<void>>('');
  isSlideDisabled = input(false, { transform: booleanAttribute });
  hasTime = input(false, { transform: booleanAttribute });
  hasMonth = input(true, { transform: booleanAttribute });
  hasYear = input(true, { transform: booleanAttribute });
  selectFirstAvailable = input(false, { transform: booleanAttribute });
  isHideUnavailableYears = input(false, { transform: booleanAttribute });
  isHideOnSelectDate = input(false, { transform: booleanAttribute });
  isAlignedCenter = input(false, { transform: booleanAttribute });
  isRange = input(false, { transform: booleanAttribute });
  isSafeClose = input(true, { transform: booleanAttribute });
  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  @ViewChild('yearSelectionContainer', { static: false }) yearSelectionContainer!: ElementRef<HTMLDivElement>;

  isSunFirstDayOfWeek = false;
  isAmPmFormat = false;
  timeSlots = signal<TimeSlotRange[] | null>([]);
  isYearSelectionVisible = signal<boolean>(false);
  isMonthSelectionVisible = signal<boolean>(false);

  emitSelectedDateTime = output<Date>();
  destroy$ = destroy();

  moment: moment.Moment = moment();
  weekDaysHeaderArr = signal<string[]>([]);
  gridArr = signal<Day[]>([]);
  selectedDate: moment.Moment | null = null;
  timeControl: FormControl = new FormControl(null);
  inputViewControl: FormControl = new FormControl('');

  isVisible = signal<boolean>(false);
  private hasOpened = false;

  initEffects = effect(() => {
    this.initializeEffects();
  });


  override ngOnInit() {
    super.ngOnInit();
    this.initializeComponent();
  }

  private initializeComponent(): void {
    moment.locale(this.locale());
    this.makeHeader();

    if (this.formControl.value) this.moment = moment(this.formControl.value);

    this.makeGrid();
    this.initializeFormValueChanges();
    if (this.hasTime()) this.initializeTimeChanges();
  }

  private initializeFormValueChanges(): void {
    this.formControl.valueChanges.pipe(startWith(this.formControl.value), this.destroy$()).subscribe(value => {
      if (value) {
        const dateFormat = this.hasTime()
          ? this.isAmPmFormat ? 'D.MM.YYYY h:mm A' : 'D.MM.YYYY HH:mm'
          : 'D.MM.YYYY';
        const formattedDate = moment(value).format(dateFormat);
        this.inputViewControl.patchValue(formattedDate);
      }
    });
  }

  private initializeTimeChanges(): void {
    this.timeControl.valueChanges.pipe(this.destroy$()).subscribe(time => {
      if (!time) return;

      if (!this.selectedDate) {
        this.formControl.patchValue(time, { emitEvent: true });
        return;
      }

      const updatedDateTime = this.selectedDate.clone().set({
        hour: moment(time).hour(),
        minute: moment(time).minute(),
        second: 0
      });

      this.emitSelectedDateTime.emit(updatedDateTime.toDate());
      this.formControl.patchValue(updatedDateTime.toDate());
    });
  }

  private initializeEffects(): void {
    effect(() => {
      this.availableDateTime();
      this.availableTimeSlots();
      this.updateTimeSlots();
    });
  }

  togglePopover(isVisible: boolean): void {
    if (!this.hasOpened && this.selectFirstAvailable()) {
      this.selectFirstAvailableDateAndTime();
      this.isVisible.set(true);
    } else {
      this.isVisible.set(isVisible);
    }

    if (isVisible && !this.hasOpened) {
      this.hasOpened = true;

      if (this.formControl.value) {
        this.moment = moment(this.formControl.value);
      }
    }
  }

  changeNavMonth(num: number): void {
    if (this.canChangeNavMonth(num)) {
      this.moment.add(num, 'month');
      this.makeGrid();
    }
  }

  canChangeNavMonth(num: number): boolean {
    const newNavDate = moment(this.moment).add(num, 'month');

    if (num < 0) {
      const minDate = this.minDate();
      if (minDate && newNavDate.endOf('month').isBefore(moment(minDate), 'day')) return false;
    } else if (num > 0) {
      const maxDate = this.maxDate();
      if (maxDate && newNavDate.startOf('month').isAfter(moment(maxDate), 'day')) return false;
    }

    const availableDateTime = this.availableDateTime();
    if (availableDateTime) {
      const availableSlotInMonth = availableDateTime.some(slot =>
        moment(slot.date).isSame(newNavDate, 'month')
      );
      if (!availableSlotInMonth) return false;
    }

    return true;
  }


  makeHeader(): void {
    const weekDaysArr: number[] = this.isSunFirstDayOfWeek ? weekdaysFromSun : weekdaysFromMon;
    this.weekDaysHeaderArr.set(weekDaysArr.map(day => moment().weekday(day).format('ddd')));
  }

  makeGrid(): void {
    const firstDayDate = moment(this.moment).startOf('month');
    const lastDayDate = moment(this.moment).endOf('month');
    const daysInMonth = this.moment.daysInMonth();

    const previousMonth = moment(this.moment).subtract(1, 'month');
    const nextMonth = moment(this.moment).add(1, 'month');
    const previousMonthDays = previousMonth.daysInMonth();

    // 🔥 правильное вычисление индекса дня
    const weekDayIndex = this.isSunFirstDayOfWeek
      ? firstDayDate.weekday()                // Sunday-first (0–6)
      : firstDayDate.isoWeekday() - 1;        // Monday-first (0–6)
    const initialEmptyCells = weekDayIndex;

    const lastWeekDayIndex = this.isSunFirstDayOfWeek
      ? lastDayDate.weekday()
      : lastDayDate.isoWeekday() - 1;
    const lastEmptyCells = (6 - lastWeekDayIndex + 7) % 7;

    let newGridArr: Day[] = [];

    newGridArr = newGridArr.concat(
      this.addDaysToGrid(
        previousMonthDays - initialEmptyCells + 1,
        previousMonth,
        initialEmptyCells,
        false
      ).map((day, index) => ({
        ...day,
        value: previousMonthDays - initialEmptyCells + 1 + index,
      }))
    );

    newGridArr = newGridArr.concat(this.addDaysToGrid(1, this.moment, daysInMonth, true));
    newGridArr = newGridArr.concat(this.addDaysToGrid(1, nextMonth, lastEmptyCells, false));

    this.gridArr.set(newGridArr);
  }


  selectDay(day: Day, event?: MouseEvent): void {
    if (this.hasTime() && event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (day.available) {
      if (day.date.month() !== this.moment.month()) {
        this.moment = day.date.clone();
        this.makeGrid();
      }

      this.selectedDate = day.date;
      this.updateTimeSlotsForSelectedDate();

      if (this.hasTime() && this.timeControl.value) {
        const updatedDateTime = this.selectedDate.clone().set({
          hour: moment(this.timeControl.value).hour(),
          minute: moment(this.timeControl.value).minute(),
          second: 0
        });

        this.emitSelectedDateTime.emit(updatedDateTime.toDate());
        this.formControl.patchValue(updatedDateTime.toDate());
      } else {
        this.emitSelectedDateTime.emit(this.selectedDate.toDate());
        this.formControl.patchValue(this.selectedDate.toDate());

        if (!this.hasTime()) this.isVisible.set(false);
      }

      if (this.isHideOnSelectDate()) this.isVisible.set(false);
    }
  }

  isActive(day: Day): boolean {
    const formControlValue = this.formControl?.value;
    return formControlValue && moment(formControlValue).isSame(day.date, 'day');
  }

  private addDaysToGrid(startDay: number, month: moment.Moment, numberOfDays: number, isCurrentMonth: boolean): Day[] {
    const gridArr: Day[] = [];

    for (let i = 0; i < numberOfDays; i++) {
      const dayNumber = startDay + i;
      const dateToCheck = dateFromNum(dayNumber, month);
      const isAvailable = this.isDayAvailable(dateToCheck);
      gridArr.push({
        value: isCurrentMonth ? dayNumber : i + 1,
        available: isAvailable,
        date: dateToCheck
      });
    }

    return gridArr;
  }

  selectMonth(month: number): void {
    this.moment.month(month);
    this.isMonthSelectionVisible.set(false);
    this.isYearSelectionVisible.set(false);
    this.makeGrid();
  }

  selectYear(year: number): void {
    this.moment.year(year);
    this.isYearSelectionVisible.set(false);
    this.isMonthSelectionVisible.set(false);
    this.makeGrid();
  }

  toggleYearSelection(): void {
    if (this.hasYear()) {
      this.isYearSelectionVisible.set(!this.isYearSelectionVisible());
      this.isMonthSelectionVisible.set(false);
      setTimeout(() => this.scrollToYear(), 0);
    }
  }

  toggleMonthSelection(): void {
    if (this.hasMonth()) this.isMonthSelectionVisible.set(!this.isMonthSelectionVisible());
    this.isYearSelectionVisible.set(false);
  }

  getYearsArray(): number[] {
    const minDate = this.minDate();
    const maxDate = this.maxDate();
    const startYear = minDate ? moment(minDate).year() : 1920;
    const maxYear = maxDate ? moment(maxDate).year() : defaultCalendarMaxYear;
    const years: number[] = [];

    for (let i = maxYear; i >= startYear; i--) {
      if (!this.isHideUnavailableYears() || (i <= maxYear && i >= startYear)) years.push(i);
    }
    return years;
  }

  getMonthsArray(): IDatePickerMonth[] {
    return dateMonths.map((name, index) => ({ name, index }));
  }

  isDayAvailable(date: moment.Moment): boolean {
    return isDateAvailable(
      date,
      this.minDate(),
      this.maxDate(),
      this.availableDates(),
      this.disabledDates(),
      this.isPastDisabled(),
      this.isFutureDisabled(),
      this.disableSpecificDayOfWeek(),
      this.availableDateTime(),
    );
  }

  popoverVisibleChange(visible: boolean): void {
    if (!visible) this.isVisible.set(false);
  }

  selectToday(): void {
    const now = moment();

    this.moment = now.clone();
    this.makeGrid();

    this.selectedDate = now.clone();

    if (this.hasTime()) {
      this.timeControl.patchValue(now.clone().seconds(0));
    }

    this.formControl.patchValue(now.toDate());
    this.emitSelectedDateTime.emit(now.toDate());

    if (this.isHideOnSelectDate()) this.isVisible.set(false);
  }

  private updateTimeSlots(): void {
    const availableDateTime = this.availableDateTime();
    const availableTimeSlots = this.availableTimeSlots();

    if (availableDateTime && this.selectedDate) {
      const availableDateTimeSlot = availableDateTime.find(slot =>
        moment(slot.date).isSame(this.selectedDate, 'day')
      );
      if (availableDateTimeSlot) {
        this.timeSlots.set(availableDateTimeSlot.time);
      } else {
        this.timeSlots.set([]);
      }
    } else if (availableTimeSlots) {
      this.timeSlots.set(availableTimeSlots);
    } else {
      this.timeSlots.set(null);
    }
  }

  private updateTimeSlotsForSelectedDate(): void {
    const availableDateTime = this.availableDateTime();
    if (availableDateTime && this.selectedDate) {
      const selectedDateTimeSlot = availableDateTime.find(slot =>
        moment(slot.date).isSame(this.selectedDate, 'day')
      );
      if (selectedDateTimeSlot) {
        this.timeSlots.set(selectedDateTimeSlot.time);
        this.setInitialTime(selectedDateTimeSlot.time);
      } else {
        this.timeSlots.set([]);
      }
    }
  }

  private setInitialTime(timeSlots: TimeSlot[]): void {
    const firstAvailableTime = timeSlots.find(slot => moment(slot.from).hour() >= 8);
    if (firstAvailableTime) {
      const timeWithoutSeconds = moment(firstAvailableTime.from).seconds(0); // Обнуление секунд
      this.timeControl.patchValue(timeWithoutSeconds);
    }
  }

  private selectFirstAvailableDateAndTime(): void {
    const availableDays = this.getAvailableDaysInCurrentGrid();

    if (availableDays.length > 0) {
      this.selectDay(availableDays[0]);
      this.updateTimeSlotsForSelectedDate();
    } else {
      this.findClosestAvailableDate();
    }
  }

  private getAvailableDaysInCurrentGrid(): Day[] {
    return this.gridArr().filter(day => day.available);
  }

  private findClosestAvailableDate(): void {
    const maxNavDate = this.maxDate ? moment(this.maxDate()) : moment().add(10, 'years'); // Верхний предел на 10 лет вперед, если maxDate не указан
    const minNavDate = this.minDate ? moment(this.minDate()) : moment().subtract(100, 'years'); // Нижний предел на 100 лет назад, если minDate не указан

    // Проверяем ближайшие месяцы назад от maxDate
    let currentNavDate = maxNavDate.clone();
    while (currentNavDate.isAfter(minNavDate, 'month') || currentNavDate.isSame(minNavDate, 'month')) {
      this.moment = currentNavDate;
      this.makeGrid();

      const availableDays = this.getAvailableDaysInCurrentGrid();
      if (availableDays.length > 0) {
        this.selectDay(availableDays[0]);
        this.updateTimeSlotsForSelectedDate();
        return;
      }

      currentNavDate.subtract(1, 'month');
    }

    currentNavDate = minNavDate.clone();
    while (currentNavDate.isBefore(maxNavDate, 'month') || currentNavDate.isSame(maxNavDate, 'month')) {
      this.moment = currentNavDate;
      this.makeGrid();

      const availableDays = this.getAvailableDaysInCurrentGrid();
      if (availableDays.length > 0) {
        this.selectDay(availableDays[0]);
        this.updateTimeSlotsForSelectedDate();
        return;
      }

      currentNavDate.add(1, 'month');
    }

    if (this.minDate) {
      this.moment = moment(this.minDate());
      this.makeGrid();
    } else if (this.maxDate) {
      this.moment = moment(this.maxDate());
      this.makeGrid();
    }

    const finalAvailableDays = this.getAvailableDaysInCurrentGrid();
    if (finalAvailableDays.length > 0) {
      this.selectDay(finalAvailableDays[0]);
      this.updateTimeSlotsForSelectedDate();
    }
  }

  private scrollToYear(): void {
    if (!this.yearSelectionContainer) return;

    const selectedYear = this.selectedDate?.year() || moment().year();
    const closestAvailableYear = getClosestAvailableYear(selectedYear, this.getYearsArray());
    const yearElements = this.yearSelectionContainer.nativeElement.querySelectorAll('button');

    yearElements.forEach((element: HTMLButtonElement) => {
      if (parseInt(element.textContent || '', 10) === closestAvailableYear) {
        element.scrollIntoView({ block: 'center' });
      }
    });
  }

  trackByYear(index: number, year: number): number {
    return year;
  }

  trackByMonth(index: number, month: IDatePickerMonth): number {
    return month.index;
  }

  trackByDay(index: number, day: string): string {
    return day;
  }

  trackByGridDay(index: number, day: Day): number {
    return day.date.valueOf();
  }
}

function getClosestAvailableYear(targetYear: number, years: number[]): number {
  return years.reduce((prev, curr) => (Math.abs(curr - targetYear) < Math.abs(prev - targetYear) ? curr : prev));
}

export function dateFromNum(num: number, referenceDate: moment.Moment): moment.Moment {
  return moment(referenceDate).date(num);
}
