import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatMins', standalone: true})
export class FormatMinsPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 60) {
      const hours = (value / 60).toFixed(1);
      return value % 60 === 0 ? `${value / 60}h` : `${hours}h`;
    } else {
      return `${value} min`;
    }
  }
}
