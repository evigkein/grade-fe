import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return ({value}: AbstractControl): ValidationErrors | null => {

        if (!value) return null;

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const isLengthValid = value.length >= 8;

        const errors: string[] = [];

        !hasUpperCase && errors.push('The password must contain at least one uppercase letter.');
        !hasLowerCase && errors.push('The password must contain at least one lowercase letter.');
        !hasNumber && errors.push('The password must contain at least one number.');
        !isLengthValid && errors.push('The password must be at least 8 characters long.');

        return errors.length > 0 ? { errors: errors } : null;
    };
}
