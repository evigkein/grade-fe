import {Pipe, PipeTransform} from '@angular/core';
import {bytesToSize} from '@core';

@Pipe({name: 'bytesToSize', standalone: true})
export class BytesToSizePipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return bytesToSize(parseInt(value, 10))
  }
}
