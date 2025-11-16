import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'p-page-empty',
  standalone: true,
  templateUrl: './page-empty.component.html',
  styleUrls: ['./page-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, ButtonComponent],
})
export class PageEmptyComponent {
  title = input.required<string>();
  subTitle = input.required<string>();
  buttonText = input<string>();
  icon = input('info');

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  @Output() action = new EventEmitter<void>();

  onActionClick() {
    this.action.emit();
  }
}
