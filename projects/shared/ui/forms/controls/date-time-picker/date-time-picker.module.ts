import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { DateTimePickerComponent } from './date-time-picker.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  imports: [CommonModule, NzTimePickerModule, FormsModule, ReactiveFormsModule, TranslateModule, NzDatePickerComponent],
  declarations: [DateTimePickerComponent],
  exports: [DateTimePickerComponent, ReactiveFormsModule],
})
export class DateTimePickerModule {}
