import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';
import { CustomControlAccessor } from '../../../../custom-control-accessor';
import { TInput } from '../../input.component';
import { InputModule } from '../../input.module';

@Component({
  selector: 'p-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, InputModule],
})
export class InputPassword extends CustomControlAccessor {
  @Input() label = 'auth.login.password.label';

  type = signal<TInput>('password');
  icon = computed(() => this.type() === 'password' ? 'eyeCrossed' : 'eye');

  iconClicked(): void {
    this.type.set(this.type() === 'password' ? 'text' : 'password');
  }
}
