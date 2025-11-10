import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function matchFieldsFormValidator(field: string, fieldToCompare: string, customError?: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const password = formGroup.get(field)?.value;
    const confirmPassword = formGroup.get(fieldToCompare)?.value;
    return password === confirmPassword
      ? customError ? {customError} : null
      : {passwordNotMatch: true};
  };
}

export function matchFieldsValidator(fieldToCompare: string, customError?: string): ValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control.parent;
    if (!formGroup) return null;

    const currentControlValue = control.value;
    const valueToCompare = formGroup.get(fieldToCompare)?.value;

    if (valueToCompare === currentControlValue) return null;
    return customError ? {customError} : {passwordNotMatch: true};
  };
}
