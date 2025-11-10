import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface ParsedPhone {
  prefix: string;
  number: string;
  formattedNumber: string;
  mask: string;
  defaultNumber: string;
}

export function parsePhone(raw: string): ParsedPhone | null {
  const phoneNumber = parsePhoneNumberFromString(raw);
  if (!phoneNumber || !phoneNumber.isValid()) return null;

  const prefix = phoneNumber.countryCallingCode;
  const number = phoneNumber.nationalNumber;

  const digits = number.replace(/\D/g, '');
  let formattedNumber = '';
  let maskFormat = '';

  if (digits.length <= 3) {
    formattedNumber = `(${digits}`;
    maskFormat = '(000';
  } else if (digits.length <= 6) {
    formattedNumber = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    maskFormat = '(000) 000';
  } else if (digits.length <= 8) {
    formattedNumber = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    maskFormat = '(000) 000-00';
  } else {
    formattedNumber = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
    maskFormat = '(000) 000-00-00';
  }

  const defaultNumber = `+${prefix}${number}`;

  return { prefix, number, formattedNumber, mask: maskFormat, defaultNumber };
}

// console.log(parsePhone('+995313018765'));

/*
Вывод:
{
  prefix: '995',
  number: '313018765',
  formattedNumber: '(313) 018-76-5',
  maskFormat: '(000) 000-00-00',
  defaultNumber: '+995313018765'
}
*/
