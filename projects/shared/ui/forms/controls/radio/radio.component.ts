import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { CustomControlAccessor } from '../../custom-control-accessor';

export interface IRadioOption { value: string, label: string }

@Component({
    selector: 'p-radio-group',
    template: `
    <nz-radio-group class="radio" [formControl]="formControl">
      <label *ngFor="let option of options"
             class="radio__label"
             [class.radio__label--active]="formControl.value === option.value"
             nz-radio
             [nzValue]="option.value">
        <span>{{ option.label | translate }}</span>
      </label>
    </nz-radio-group>
  `,
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzRadioGroupComponent,
    NgForOf,
    ReactiveFormsModule,
    NzRadioComponent,
    TranslateModule
  ]
})
export class RadioGroupComponent extends CustomControlAccessor {
  @Input() options!: IRadioOption[];
}
