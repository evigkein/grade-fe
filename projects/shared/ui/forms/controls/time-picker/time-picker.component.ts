import { booleanAttribute, Component, Input, ViewEncapsulation } from '@angular/core';
import { CustomControlAccessor } from '../../custom-control-accessor';

@Component({
    selector: 'p-time-picker',
    template: `
    <nz-time-picker
      [nzDisabled]="formControl.disabled"
      [formControl]="formControl"
      [nzFormat]="nzFormat"
      [nzMinuteStep]="nzMinuteStep"
      [nzUse12Hours]="nzUse12Hours"
      [nzPlaceHolder]="placeholder | translate"
      [nzBorderless]="borderless"
      nzNowText="now"
    >
    </nz-time-picker>
  `,
    styleUrls: ['./time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TimePickerComponent extends CustomControlAccessor {
  private _date!: Date
  @Input() nzFormat = 'h:mm a';
  @Input() nzMinuteStep = 15;
  @Input() placeholder = 'time-picker.placeholder';
  @Input({transform:booleanAttribute}) nzUse12Hours = true;
  @Input({transform:booleanAttribute}) borderless = false;

  get date() {
    return this._date;
  }

  set date(value: Date) {
    this._date = value
    this.setTimeValue(value)
  }

  override writeValue(val: Date): void {
    this.date = new Date(val)
  }

  private setTimeValue(datetime?: Date) {
    // @ts-ignore
    const date = new Date(datetime)
    if (this.date != null) {
      this.formControl.setValue(date.getTime())
    }
  }
}
