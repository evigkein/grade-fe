import { Directive, Input, OnChanges, OnDestroy } from '@angular/core';
import { _ELREF } from '@utils/angular/ng-api';
import IMask, { InputMask, MaskedDateOptions, MaskedNumberOptions, MaskedDynamicOptions, MaskedRegExpOptions, MaskedFunctionOptions, MaskedPatternOptions } from 'imask';

type MaskOptions =
  | string
  | MaskedDateOptions
  | MaskedNumberOptions
  | MaskedDynamicOptions
  | MaskedRegExpOptions
  | MaskedFunctionOptions
  | MaskedPatternOptions;

@Directive({ selector: '[inputMask]', standalone: true })
export class MaskDirective implements OnChanges, OnDestroy {
  @Input('inputMask') mask: MaskOptions = '';

  private maskInstance: InputMask<any> | any = null;
  private el = _ELREF();

  ngOnChanges(): void {
    if (this.mask) {
      const maskOptions: any = this.createMaskOptions(this.mask);

      if (this.maskInstance) {
        this.maskInstance.updateOptions(maskOptions);
      } else {
        this.maskInstance = IMask(this.el.nativeElement, maskOptions);
      }
    }
  }

  ngOnDestroy(): void {
    this.maskInstance?.destroy();
  }

  private createMaskOptions(mask: MaskOptions): any {
    return typeof mask === 'string' ? { mask } : mask;
  }
}
