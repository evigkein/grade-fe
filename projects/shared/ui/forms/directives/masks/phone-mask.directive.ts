// phone-mask.directive.ts
import { Directive } from '@angular/core';
import { MaskInputCoreDirective } from './mask-core.directive';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

@Directive({
  selector: '[phoneInputMask]',
  standalone: true,
})
export class PhoneMaskDirective extends MaskInputCoreDirective {
  protected maskValue(value: string): string {
    // 1) Оставляем только цифры (поддержка вставок)
    let digits = value.replace(/\D/g, '');

    // 2) Поддержка «8» как начала российского номера
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);

    // 3) Пытаемся распарсить как E.164
    const parsed = parsePhoneNumberFromString('+' + digits);

    if (parsed?.countryCallingCode && parsed?.nationalNumber) {
      const code = parsed.countryCallingCode;
      const national = String(parsed.nationalNumber);

      // 4) Формат «как в России», если код = 7
      if (code === '7') {
        const a = national.slice(0, 3);
        const b = national.slice(3, 6);
        const c = national.slice(6, 8);
        const d = national.slice(8, 10);

        // Заполняем по мере ввода
        if (national.length <= 3) return `+7 (${a}`;
        if (national.length <= 6) return `+7 (${a}) ${b}`;
        if (national.length <= 8) return `+7 (${a}) ${b}-${c}`;
        return `+7 (${a}) ${b}-${c}-${d}`;
      }

      // 5) Для других стран — отдаём «как есть» в виде +code <national> с мягким форматированием
      return `+${code} ${this.chunkNational(national)}`.trim();
    }

    // 6) Фолбэк «как набирается»
    return new AsYouType().input('+' + digits);
  }

  private chunkNational(n: string): string {
    // Небольшая читаемость: 3-3-2-2
    if (n.length <= 3) return n;
    if (n.length <= 6) return `${n.slice(0, 3)} ${n.slice(3)}`;
    if (n.length <= 8) return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
    return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 8)} ${n.slice(8, 10)}`;
  }
}
