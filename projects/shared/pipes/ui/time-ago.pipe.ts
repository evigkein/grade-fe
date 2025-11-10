import { Pipe, PipeTransform } from '@angular/core';
import { _TRANSLATE } from '../../core';
import { calculateTimeDifference } from '../../utils/libs/date/get-time-ago.util';

@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
  private translate = _TRANSLATE();

  transform(value: Date | string, templateType: 'timeAgo' | 'aboutAgo' = 'timeAgo'): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    const { amount, unit } = calculateTimeDifference(date);

    const translatedUnit = this.translate.translate(unit);
    const translatedTemplate = this.translate.translate(templateType, { amount: amount.toString(), time: translatedUnit });

    return translatedTemplate;
  }
}
