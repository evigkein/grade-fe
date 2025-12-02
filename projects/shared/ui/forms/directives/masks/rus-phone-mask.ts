import { Directive } from '@angular/core';
import { MaskInputCoreDirective } from './mask-core.directive';

@Directive({
  selector: '[appRussianNumberMask]',
  standalone: true,
})
export class RussianNumberMaskDirective extends MaskInputCoreDirective {
  protected maskValue(value: string): string {
    let digits = (value || '').replace(/\D/g, '');

    // максимум 11 цифр
    digits = digits.slice(0, 11);

    // Разбиваем
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 8);
    const d = digits.slice(8, 10);

    let result = '';
    if (a.length > 0) result += `(${a}`;
    if (a.length === 3) result += ')';
    if (b.length > 0) result += ` ${b}`;
    if (c.length > 0) result += `-${c}`;
    if (d.length > 0) result += `-${d}`;

    return result;
  }
}
