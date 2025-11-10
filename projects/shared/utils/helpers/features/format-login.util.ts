import { validateEmail } from '../../../../../../src/app/domain/modules/auth/validators/email.validator';
import { countryCodes } from '../../constants/options/phone-country';

export function formatLoginValue(value: string): string {
  if (!value) return 'error.login.empty';

  if (value.startsWith('+')) {
    const trimmed = value.replace(/[^\d]/g, '');
    const matched = Array.from(countryCodes.values()).find(code =>
      trimmed.startsWith(code)
    );

    if (matched) {
      return trimmed;
    } else {
      return 'error.phone.country';
    }
  }

  const phonePattern = /^[0-9+\-\s\(\)]+$/;
  if (phonePattern.test(value)) {
    if (value.length > 9 && value.length < 16) {
      return value;
    } else {
      return 'error.phone.invalid';
    }
  }

  const emailError = validateEmail(value);
  if (emailError) return emailError;

  return value;
}
