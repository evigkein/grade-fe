import {IOption} from '../../../../../../../src/app/domain/api/common/api-common.service';
import {ISelectOption} from '../../../../forms/controls/select';

export const winterTimezones: IOption[] = [
  { id: '-12:00', label: 'UTC-12:00 (Baker Island, Howland Island, Niue)' },
  { id: '-11:00', label: 'UTC-11:00 (Pago Pago, Midway Atoll, Niue, Jarvis Island)' },
  { id: '-10:00', label: 'UTC-10:00 (Honolulu, Papeete, Rarotonga, Taiohae, Hawaii, Cook Islands)' },
  { id: '-09:00', label: 'UTC-09:00 (Anchorage, Gambier Islands, French Polynesia, Adak Island)' },
  { id: '-08:00', label: 'UTC-08:00 (Los Angeles, Vancouver, Tijuana, Seattle, San Francisco, Las Vegas)' },
  { id: '-07:00', label: 'UTC-07:00 (Denver, Phoenix, Edmonton, Calgary, Salt Lake City, Tucson)' },
  { id: '-06:00', label: 'UTC-06:00 (Chicago, Mexico City, Guatemala City, Houston, Dallas, Monterrey)' },
  { id: '-05:00', label: 'UTC-05:00 (New York, Toronto, Lima, Bogota, Miami, Atlanta)' },
  { id: '-04:00', label: 'UTC-04:00 (Santiago, Caracas, La Paz, Halifax, Dominican Republic, Puerto Rico)' },
  { id: '-03:00', label: 'UTC-03:00 (Buenos Aires, Sao Paulo, Montevideo, Brasilia, Rio de Janeiro, Salvador)' },
  { id: '-02:00', label: 'UTC-02:00 (South Georgia, Stanley, Rothera, King Edward Point)' },
  { id: '-01:00', label: 'UTC-01:00 (Azores, Cape Verde, Noronha, Scoresbysund, Ponta Delgada, Praia)' },
  { id: '+00:00', label: 'UTC+00:00 (London, Lisbon, Casablanca, Reykjavik, Dublin, Edinburgh)' },
  { id: '+01:00', label: 'UTC+01:00 (Berlin, Paris, Madrid, Rome, Brussels, Warsaw)' },
  { id: '+02:00', label: 'UTC+02:00 (Cairo, Athens, Istanbul, Jerusalem, Finland, Romania)' },
  { id: '+03:00', label: 'UTC+03:00 (Moscow, Saint Petersburg, Nairobi, Baghdad, Riyadh, Qatar)' },
  { id: '+04:00', label: 'UTC+04:00 (Dubai, Baku, Tbilisi, Yerevan, Oman, Armenia)' },
  { id: '+05:00', label: 'UTC+05:00 (Karachi, Tashkent, Yekaterinburg, Islamabad, Maldives, Turkmenistan)' },
  { id: '+06:00', label: 'UTC+06:00 (Dhaka, Almaty, Bishkek, Thimphu, Bhutan, Kyrgyzstan)' },
  { id: '+07:00', label: 'UTC+07:00 (Bangkok, Jakarta, Hanoi, Ho Chi Minh City, Laos, Cambodia)' },
  { id: '+08:00', label: 'UTC+08:00 (Beijing, Singapore, Hong Kong, Perth, Malaysia, Philippines)' },
  { id: '+09:00', label: 'UTC+09:00 (Tokyo, Seoul, Pyongyang, Osaka, Japan, South Korea)' },
  { id: '+10:00', label: 'UTC+10:00 (Sydney, Brisbane, Vladivostok, Guam, Papua New Guinea, Solomon Islands)' },
  { id: '+11:00', label: 'UTC+11:00 (Magadan, Solomon Islands, New Caledonia, Bougainville)' },
  { id: '+12:00', label: 'UTC+12:00 (Auckland, Suva, Kamchatka, Marshall Islands, Fiji, Tuvalu)' },
];

export const summerTimezones: IOption[] = [
  { id: '-12:00', label: 'UTC-12:00 (Baker Island, Howland Island, Niue)' },
  { id: '-11:00', label: 'UTC-11:00 (Pago Pago, Midway Atoll, Niue, Jarvis Island)' },
  { id: '-10:00', label: 'UTC-10:00 (Honolulu, Papeete, Rarotonga, Taiohae, Hawaii, Cook Islands)' },
  { id: '-09:00', label: 'UTC-09:00 (Anchorage, Gambier Islands, French Polynesia, Adak Island)' },
  { id: '-08:00', label: 'UTC-08:00 (Vancouver, Tijuana, Seattle, San Francisco, Las Vegas)' },
  { id: '-07:00', label: 'UTC-07:00 (Los Angeles, Denver, Phoenix, Edmonton, Calgary, Salt Lake City, Tucson)' },
  { id: '-06:00', label: 'UTC-06:00 (Chicago, Mexico City, Guatemala City, Houston, Dallas, Monterrey)' },
  { id: '-05:00', label: 'UTC-05:00 (New York, Toronto, Lima, Bogota, Miami, Atlanta)' },
  { id: '-04:00', label: 'UTC-04:00 (Santiago, Caracas, La Paz, Halifax, Dominican Republic, Puerto Rico)' },
  { id: '-03:00', label: 'UTC-03:00 (Buenos Aires, Sao Paulo, Montevideo, Brasilia, Rio de Janeiro, Salvador)' },
  { id: '-02:00', label: 'UTC-02:00 (South Georgia, Stanley, Rothera, King Edward Point)' },
  { id: '-01:00', label: 'UTC-01:00 (Azores, Cape Verde, Noronha, Scoresbysund, Ponta Delgada, Praia)' },
  { id: '+00:00', label: 'UTC+00:00 (London, Lisbon, Casablanca, Reykjavik, Dublin, Edinburgh)' },
  { id: '+01:00', label: 'UTC+01:00 (Berlin, Paris, Madrid, Rome, Brussels, Warsaw)' },
  { id: '+02:00', label: 'UTC+02:00 (Cairo, Athens, Istanbul, Jerusalem, Finland, Romania)' },
  { id: '+03:00', label: 'UTC+03:00 (Moscow, Saint Petersburg, Nairobi, Baghdad, Riyadh, Qatar)' },
  { id: '+04:00', label: 'UTC+04:00 (Dubai, Baku, Tbilisi, Yerevan, Oman, Armenia)' },
  { id: '+05:00', label: 'UTC+05:00 (Karachi, Tashkent, Yekaterinburg, Islamabad, Maldives, Turkmenistan)' },
  { id: '+06:00', label: 'UTC+06:00 (Dhaka, Almaty, Bishkek, Thimphu, Bhutan, Kyrgyzstan)' },
  { id: '+07:00', label: 'UTC+07:00 (Bangkok, Jakarta, Hanoi, Ho Chi Minh City, Laos, Cambodia)' },
  { id: '+08:00', label: 'UTC+08:00 (Beijing, Singapore, Hong Kong, Perth, Malaysia, Philippines)' },
  { id: '+09:00', label: 'UTC+09:00 (Tokyo, Seoul, Pyongyang, Osaka, Japan, South Korea)' },
  { id: '+10:00', label: 'UTC+10:00 (Sydney, Brisbane, Vladivostok, Guam, Papua New Guinea, Solomon Islands)' },
  { id: '+11:00', label: 'UTC+11:00 (Magadan, Solomon Islands, New Caledonia, Bougainville)' },
  { id: '+12:00', label: 'UTC+12:00 (Auckland, Suva, Kamchatka, Marshall Islands, Fiji, Tuvalu)' },
];

function isDstObserved(date: Date): boolean {
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);

  // Проверяем разницу между текущим смещением и смещением в январе и июле
  const standardTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());

  return date.getTimezoneOffset() < standardTimezoneOffset;
}

export function getTimezones(): IOption[] {
  const currentDate = new Date();
  const isDst = isDstObserved(currentDate);

  return isDst ? summerTimezones : winterTimezones;
}

export function getTimezoneOptions(): ISelectOption[] {
  return getTimezones().map((i => ({label: i.label, value: i.id})))
}
