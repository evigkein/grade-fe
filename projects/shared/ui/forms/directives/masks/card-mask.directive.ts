import { Directive } from '@angular/core';
import { MaskInputCoreDirective } from './mask-core.directive';

@Directive({ selector: '[appCreditCardMask]', standalone: true })
export class CreditCardMaskDirective extends MaskInputCoreDirective {
    protected maskValue(value: string): string {
        const numericValue = value.replace(/[^0-9]/g, '').slice(0, 16);
        return numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
}
