import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'prefix', standalone: true})
export class TranslatePrefixPipe implements PipeTransform {

  transform(items: string[], prefix: string): string[] {
    if (!items) return [];
    return items.map(item => `${prefix}${item}`);
  }

}
