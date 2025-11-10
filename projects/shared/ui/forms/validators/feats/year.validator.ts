import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function yearRangeValidator(minYear: number, maxYear: number, customError?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const year = parseInt(control.value, 10);
    if (isNaN(year) || year < minYear || year > maxYear) {
      return {
        yearRange: { minYear, maxYear },
        customError: customError || `The year must be between ${minYear} and ${maxYear}.`
      };
    }
    return null;
  };
}
