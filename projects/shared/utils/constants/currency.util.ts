import { formatCurrency } from '@angular/common';
import {isBrowser} from '../helpers/browser/is-browser.util';


export type TCurrency = 'USD';
export type TCurrencySymbol = '$';
export type TCurrencyType = '1.0-0';

export const priceCurrencyMap: Map<TCurrency, TCurrencySymbol> = new Map([['USD', '$']]);

export const priceCurrencySsrMap: Map<TCurrency, TCurrency> = new Map([['USD', 'USD']]);

export function getCurrency(
  value: number,
  locale = 'en-EN',
  currency: TCurrency = 'USD',
  type: TCurrencyType = '1.0-0'
): string {
  const symbol = isBrowser() ? priceCurrencyMap.get(currency)! : priceCurrencySsrMap.get(currency)!;
  return formatCurrency(value, locale, symbol, currency, type);
}
