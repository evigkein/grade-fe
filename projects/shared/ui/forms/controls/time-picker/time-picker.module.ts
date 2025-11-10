import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core';
import { TimePickerComponent } from './time-picker.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  imports: [CommonModule, NzTimePickerModule, FormsModule, ReactiveFormsModule, TranslateModule],
  declarations: [TimePickerComponent],
  exports: [TimePickerComponent, ReactiveFormsModule],
})
export class TimePickerModule {}
