import {CommonModule} from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {CheckboxComponent} from '../checkbox/checkbox.component';

@Component({
  selector: 'p-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule]
})
export class SwitchComponent extends CheckboxComponent {
  @Input() labelPosition: 'left' | 'right' = 'right';
}
