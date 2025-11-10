import { Directive, ElementRef, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { _ELREF } from '../../../../utils/angular/ng-api';
import { MaskInputCoreDirective } from '../mask-core.directive';
import { maskYear } from '../utils/format-year.util';
import { YearInputMaskDirective } from '../year-mask.directive';

@Directive({selector: '[dateOfBirthMask]', standalone: true})
export class DateOfBirthMaskDirective extends MaskInputCoreDirective {
  @Input() americanFormat: boolean = false;
  private el = _ELREF()

  protected maskValue(value: string): string {
    let numericValue = value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (this.americanFormat) {
      const month = numericValue.slice(0, 2);
      const day = numericValue.slice(2, 4);
      const year = numericValue.slice(4, 8);
      formattedValue = `${month.padEnd(2, '_')}/${day.padEnd(2, '_')}/${year.padEnd(4, '_')}`;
    } else {
      const day = numericValue.slice(0, 2);
      const month = numericValue.slice(2, 4);
      const year = numericValue.slice(4, 8);
      formattedValue = `${day.padEnd(2, '_')}/${month.padEnd(2, '_')}/${year.padEnd(4, '_')}`;
    }

    return formattedValue;
  }

  @HostListener('input', ['$event.target.value'])
  override onInputChange(value: string): void {
    const newValue: string = this.maskValue(value);
    this.ngControl.control?.setValue(newValue, { emitEvent: false });
    this.el.nativeElement.value = newValue;
  }

  @HostListener('focus')
  onFocus(): void {
    this.updatePlaceholder();
  }

  @HostListener('blur')
  onBlur(): void {
    this.el.nativeElement.placeholder = '';
  }

  private updatePlaceholder(): void {
    if (this.americanFormat) {
      this.el.nativeElement.placeholder = 'MM/DD/YYYY';
    } else {
      this.el.nativeElement.placeholder = 'DD/MM/YYYY';
    }
  }
}
