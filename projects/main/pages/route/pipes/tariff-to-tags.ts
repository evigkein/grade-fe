import { Pipe, PipeTransform } from '@angular/core';
import { ITariffSchema } from '@shared/domain/api/swagger/models/i-tariff-schema';
import { ITag } from '@ui/components/tags/tags.interface';

@Pipe({name: 'tariffToTags', standalone: true})
export class TariffToTagsPipe implements PipeTransform {
  transform(tariff: ITariffSchema): ITag[] {
    if (!tariff) return [];

    const tags: ITag[] = [];

    if (tariff.seats) {
      tags.push({ label: `Кол-во мест: `, labelBold: `${tariff.seats}`, icon: 'users' });
    }

    const optionMap: Record<string, string> = {
      'багаж': 'tagBag',
      'детское кресло': 'tagHeart',
      'кондиционер': 'tagSnow',
    };

    (tariff.options ?? []).forEach((opt: string) => {
      const icon = optionMap[opt.toLowerCase()] ?? 'tag';
      tags.push({ label: this.capitalize(opt), icon });
    });

    return tags;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
