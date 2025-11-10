import { Directive } from '@angular/core';
import { MaskInputCoreDirective } from './mask-core.directive';

@Directive({ selector: '[appCardExpirationMask]', standalone: true })
export class CardExpirationMaskDirective extends MaskInputCoreDirective {
    protected maskValue(value: string): string {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue.length === 1 && numericValue[0] > '1') {
            return '0' + numericValue;
        } else if (numericValue.length > 2) {
            return numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4);
        }
        return numericValue;
    }
}
