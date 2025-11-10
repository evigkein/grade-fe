import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ButtonComponent } from '../../button/button.component';
import { IActionOption } from './interfaces';

@Component({
  selector: 'p-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzMenuModule, NzDropDownModule, ButtonComponent,]
})
export class ActionsMenuComponent {
  @Input({required: true}) actions: IActionOption[] = [];
  @Output() action = new EventEmitter();

  active = false;
  visible = false;

  constructor() {
  }

  handleClick(action: string) {
    this.action.emit(action);
    this.visible = false;
  }
}
