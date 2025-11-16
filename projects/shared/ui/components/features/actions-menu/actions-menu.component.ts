import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
  signal,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ButtonComponent } from '../../button/button.component';
import { IActionOption } from './interfaces';

@Component({
  selector: 'p-actions-menu',
  standalone: true,
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NzMenuModule, NzDropDownModule, ButtonComponent],
})
export class ActionsMenuComponent {
  actions = input.required<IActionOption[]>();

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  @Output() action = new EventEmitter<string>();

  active = signal(false);
  visible = signal(false);

  handleClick(v: string) {
    this.action.emit(v);
    this.visible.set(false);
  }
}
