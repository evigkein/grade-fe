import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  booleanAttribute,
  OnChanges,
  ViewChild, ElementRef
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import moment, { Moment } from 'moment';
import { StopEventsDirective } from '../../../../../directives/utils';
import { ISimpleChanges } from '../../../../../utils/types';
import { CustomControlAccessor } from '../../../custom-control-accessor';

export interface TimeSlotRange {
  from: Date;
  to: Date;
}

@Component({
  selector: 'p-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StopEventsDirective]
})
export class TimepickerComponent extends CustomControlAccessor implements OnInit, OnChanges {

  @Input() locale: string = 'en';
  @Input({transform: booleanAttribute}) selectFirstAvailable = false;
  @Input({transform: booleanAttribute}) isMobileNative = true;
  @Input({transform: booleanAttribute}) isAmPm = false;
  // @Input({transform: booleanAttribute}) isAmPmFormat: boolean | undefined = false;
  @Input() availableTimeSlots: TimeSlotRange[] | null = null;
  @Output() emitSelectedTime = new EventEmitter<Moment>();

  @ViewChild('timepickerBody', { static: false }) timepickerBody!: ElementRef<HTMLDivElement>;

  isAmPmFormat = false;
  navDate: moment.Moment = moment();
  timeSlots = signal<moment.Moment[]>([]);
  selectedTime = signal<moment.Moment | null>(null);

  override ngOnInit() {
    super.ngOnInit();
    moment.locale(this.locale);
    this.generateTimeSlots();

    if (this.selectFirstAvailable && this.timeSlots().length > 0 && !this.formControl.value) {
      this.selectFirstAvailableTimeSlot();
    }
  }

  ngOnChanges(changes: ISimpleChanges<TimepickerComponent>): void {
    if (changes.availableTimeSlots) {
      this.generateTimeSlots();
      if (this.selectFirstAvailable && this.timeSlots().length > 0) {
        this.selectFirstAvailableTimeSlot();
      }
    }
  }

  generateTimeSlots(): void {
    const timeSlots: moment.Moment[] = [];

    if (this.availableTimeSlots && this.availableTimeSlots.length > 0) {
      this.availableTimeSlots.forEach(slot => {
        const startTime = moment(slot.from).seconds(0); // Обнуление секунд
        const endTime = moment(slot.to).seconds(0); // Обнуление секунд
        const interval = 30; // Интервал в минутах

        while (startTime.isBefore(endTime)) {
          timeSlots.push(startTime.clone());
          startTime.add(interval, 'minutes');
        }
      });
    } else {
      const startTime = moment().startOf('day').seconds(0); // Обнуление секунд
      const endTime = moment().endOf('day').seconds(0); // Обнуление секунд
      const interval = 30;

      while (startTime.isBefore(endTime)) {
        timeSlots.push(startTime.clone());
        startTime.add(interval, 'minutes');
      }
    }

    this.timeSlots.set(timeSlots);
    queueMicrotask(() => this.scrollToActiveTime());
  }

  shouldAddDivider(index: number): boolean {
    if (index === 0) return false;
    const previousTime = this.timeSlots()[index - 1];
    const currentTime = this.timeSlots()[index];
    return currentTime.diff(previousTime, 'minutes') > 30;
  }

  selectFirstAvailableTimeSlot(): void {
    if (this.formControl.value) return;
    if (this.timeSlots().length > 0) {
      this.selectTime(this.timeSlots()[0]);
    }
  }

  selectTime(time: moment.Moment): void {
    const timeWithoutSeconds = time.clone().seconds(0);
    this.selectedTime.set(timeWithoutSeconds);
    this.emitSelectedTime.emit(timeWithoutSeconds);
    this.formControl.patchValue(timeWithoutSeconds);
  }

  isActive(time: moment.Moment): boolean {
    const formControlValue = this.formControl?.value;
    return formControlValue && moment(formControlValue).isSame(time, 'minute');
  }

  getFormattedTime(time: moment.Moment): string {
    return this.isAmPmFormat ? time.format('hh:mm A') : time.format('HH:mm');
  }

  onManualTimeInput(value: string): void {
    console.log(value, '???');
    if (!value) return;
    const [hours, minutes] = value.split(':').map(Number);
    const newTime = moment().set({ hour: hours, minute: minutes, second: 0 });
    this.selectTime(newTime);
  }

  private scrollToActiveTime(): void {
    if (!this.timepickerBody) return;
    const activeIndex = this.timeSlots().findIndex(t =>
      this.isActive(t)
    );
    if (activeIndex < 0) return;

    const itemHeight = 27.14;
    this.timepickerBody.nativeElement.scrollTop = Math.max(activeIndex * itemHeight - 60, 0);
  }
}

