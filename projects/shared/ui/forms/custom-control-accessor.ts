import {
  Directive,
  Input,
  OnInit,
  Optional,
  Self,
  signal,
  computed,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { getUId } from '@utils/helpers/different';
import { destroy } from '@utils/libs/rxjs';

@Directive()
export abstract class CustomControlAccessor<T = any> implements ControlValueAccessor, OnInit {
  @Input() id: string = getUId();
  destroy$ = destroy();


  readonly value = signal<T | null>(null);
  readonly disabled = signal(false);
  readonly isRequired = signal(false);
  formControl?: FormControl<T | null> = new FormControl() as FormControl;

  protected onChange: (value: T | null) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (!this.ngControl?.control) {
      console.error(
        `${this.constructor.name}: NgControl doesn't found. Check formControlName / ngModel / [formControl].`,
      );
      return;
    }

    this.formControl = this.ngControl.control as FormControl<T | null>;

    this.isRequired.set(
      !!this.formControl.hasValidator?.(Validators.required),
    );

    this.value.set(this.formControl.value);
  }

  // ===== ControlValueAccessor API =====

  writeValue(value: T | null): void {
    // Приходит значение извне → кладём в свой сигнал (без эмита назад)
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);

    if (this.formControl) {
      isDisabled
        ? this.formControl.disable({ emitEvent: false })
        : this.formControl.enable({ emitEvent: false });
    }
  }

  protected updateValueFromUI(value: T | null): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  readonly required = computed(() => this.isRequired());
}
