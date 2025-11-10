import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit, Output,
  signal
} from '@angular/core';
import {CustomControlAccessor} from '../../custom-control-accessor';

@Component({
  selector: 'p-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckboxComponent extends CustomControlAccessor implements OnInit {
  @Input() label!: string;
  @Input() type!: string;
  @Output() action = new EventEmitter();
  @Input({transform: booleanAttribute}) isCentered = false;
  isFocused = signal(false);

  override ngOnInit() {
    super.ngOnInit();
  }

  onAction(): void {
    const value = this.formControl.value ?? false;
    this.formControl.patchValue(!value)
    this.action.emit(this.formControl.value);
  }
}
