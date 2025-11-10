import {Pipe, PipeTransform} from '@angular/core';
import {getCurrency, TCurrency} from '../utils/constants/currency.util';

@Pipe({name: 'currencyFormat', standalone: true})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currency: TCurrency = 'USD', locale: string = 'en-US'): string {
    return getCurrency(value,locale, currency);
  }

}
