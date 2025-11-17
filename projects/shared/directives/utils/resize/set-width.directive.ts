import { Directive, input, numberAttribute, effect } from '@angular/core';
import { _ELREF, _R2 } from '../../../utils/angular/ng-api';

@Directive({selector: '[setWidth]', standalone: true})
export class SetWidthDirective {
  wrapperWidth = input.required({ transform: numberAttribute });

  private el = _ELREF();
  private r = _R2();

  constructor() {
    effect(() => {
      const width = this.wrapperWidth();
      if (width) this.setWidth(width);
    });
  }

  private setWidth(width: number): void {
    const widthPx = `${width}px`;
    this.r.setStyle(this.el.nativeElement, 'width', widthPx, 2);
    this.r.setStyle(this.el.nativeElement, 'max-width', widthPx, 2);
  }
}
