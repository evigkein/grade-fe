import { Directive, Input, OnInit, Optional, Self, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgModel, Validators,
} from '@angular/forms';
import { getUId } from '../../utils/helpers/different';
import { destroy } from '../../utils/libs/rxjs';

@Directive()
export abstract class CustomControlAccessor implements ControlValueAccessor, OnInit {
  @Input() formControlName!: FormControlName | string | number | null;
  @Input() id!: string;
  @Input() formControl: FormControl = new FormControl() as FormControl;
  isAlertEnabled = true;
  protected destroy$ = destroy();

  parent?: FormGroup<any> | FormArray<any> | null | undefined;
  isRequired = signal(false);

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl !== null) {
      // Setting the value accessor directly (instead of using the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
      if (!this.id && this.formControlName) this.id = `${this.formControlName}`;
      if (!this.id) this.id = getUId();
    }
  }

  onTouched = (): void => {
  };

  writeValue(obj: any): void {
  }

  registerOnChange(fn: (_: any) => void): void {
  }

  ngOnInit(): void {
    if (this.ngControl?.control) {
      this.formControl = this.ngControl.control as any;
      this.parent = this.ngControl?.control?.parent;
      this.isRequired.set(!!this.formControl?.hasValidator?.(Validators.required));
      return;
    }

    if (this.ngControl instanceof FormControlName) {
      const formGroupDirective = this.ngControl.formDirective as FormGroupDirective;
      if (formGroupDirective) {
        this.formControl = formGroupDirective.form.controls[this.ngControl.name!] as FormControl;
      }
    } else if (this.ngControl instanceof FormControlDirective) {
      this.formControl = this.ngControl.control;
    } else if (this.ngControl instanceof NgModel) {
      this.formControl = this.ngControl.control;
      this.formControl.valueChanges
        .pipe(this.destroy$())
        .subscribe(() => this.ngControl.viewToModelUpdate(this.formControl.value));
    } else if (!this.ngControl) {
      this.isAlertEnabled && console.error('You should provide any type of form control directive');
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  focus(): void {
    this.onTouched?.();
  }
}


