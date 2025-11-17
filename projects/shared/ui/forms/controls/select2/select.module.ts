import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslatePipe } from '@ngx-translate/core';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';
import { LabelComponent } from '../../components/input-label/input-label.component';
import { SelectComponent } from './select.component'
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NzSelectModule, SvgIconComponent, LabelComponent, TranslatePipe],
  declarations: [SelectComponent],
  exports: [SelectComponent, ReactiveFormsModule],
})
export class SelectModule {}
