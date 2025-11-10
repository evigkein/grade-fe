import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueNameValidator(existingNames: string[]): ValidatorFn {
  const namesToCheck = new Set(existingNames.map(name => normalizeName(name)));

  return (control: AbstractControl): ValidationErrors | null => {
    const nameToMatch = normalizeName(control.value);
    if (namesToCheck.has(nameToMatch)) {
      return { isUnique: false };
    }
    return null;
  };
}

function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/[-_]/g, '');
}
