import {ISelectOption} from '../../../forms/controls/select';

export enum EAvailableCountries {
  RU = 'RU',
  US = 'US',
  GR = 'GR',
  ES = 'ES',
  NL = 'NL',
  GB = 'GB',
  IT = 'IT',
  DE = 'DE',
  PT = 'PT',
  FR = 'FR',
  IL = 'IL',
  KZ = 'KZ',
  AE = 'AE',
  TR = 'TR',
  CZ = 'CZ',
  CY = 'CY',
  GE = 'GE',
  TH = 'TH',
  AM = 'AM',
}


export const countryPhoneOptions: ISelectOption<EAvailableCountries>[] = [
  {
    label: 'auth.phone.country-label.usa',
    value: EAvailableCountries.US
  },
  {
    label: 'auth.phone.country-label.russia',
    value: EAvailableCountries.RU
  },
  {
    label: 'auth.phone.country-label.greece',
    value: EAvailableCountries.GR
  },
  {
    label: 'auth.phone.country-label.spain',
    value: EAvailableCountries.ES
  },
  {
    label: 'auth.phone.country-label.netherlands',
    value: EAvailableCountries.NL
  },
  {
    label: 'auth.phone.country-label.uk',
    value: EAvailableCountries.GB
  },
  {
    label: 'auth.phone.country-label.italy',
    value: EAvailableCountries.IT
  },
  {
    label: 'auth.phone.country-label.germany',
    value: EAvailableCountries.DE
  },
  {
    label: 'auth.phone.country-label.portugal',
    value: EAvailableCountries.PT
  },
  {
    label: 'auth.phone.country-label.france',
    value: EAvailableCountries.FR
  },
  {
    label: 'auth.phone.country-label.israel',
    value: EAvailableCountries.IL
  },
  {
    label: 'auth.phone.country-label.kazakhstan',
    value: EAvailableCountries.KZ
  },
  {
    label: 'auth.phone.country-label.uae',
    value: EAvailableCountries.AE
  },
  {
    label: 'auth.phone.country-label.turkey',
    value: EAvailableCountries.TR
  },
  {
    label: 'auth.phone.country-label.czech',
    value: EAvailableCountries.CZ
  },
  {
    label: 'auth.phone.country-label.cyprus',
    value: EAvailableCountries.CY
  },
  {
    label: 'auth.phone.country-label.georgia',
    value: EAvailableCountries.GE
  },
  {
    label: 'auth.phone.country-label.thailand',
    value: EAvailableCountries.TH
  },
  {
    label: 'auth.phone.country-label.armenia',
    value: EAvailableCountries.AM
  }
];

export const countryCodes = new Map<EAvailableCountries, string>([
  [EAvailableCountries.RU, '7'],
  [EAvailableCountries.US, '1'],
  [EAvailableCountries.GR, '30'],
  [EAvailableCountries.ES, '34'],
  [EAvailableCountries.NL, '31'],
  [EAvailableCountries.GB, '44'],
  [EAvailableCountries.IT, '39'],
  [EAvailableCountries.DE, '49'],
  [EAvailableCountries.PT, '351'],
  [EAvailableCountries.FR, '33'],
  [EAvailableCountries.IL, '972'],
  [EAvailableCountries.KZ, '7'],
  [EAvailableCountries.AE, '971'],
  [EAvailableCountries.TR, '90'],
  [EAvailableCountries.CZ, '420'],
  [EAvailableCountries.CY, '357'],
  [EAvailableCountries.GE, '995'],
  [EAvailableCountries.TH, '66'],
  [EAvailableCountries.AM, '374'],
]);

export function formatPhoneNumber(phone: string, country: EAvailableCountries): string {
  const countryCode = countryCodes.get(country);

  if (!countryCode) {
    throw new Error('Unsupported country code');
  }

  return `${countryCode}${phone}`;
}
