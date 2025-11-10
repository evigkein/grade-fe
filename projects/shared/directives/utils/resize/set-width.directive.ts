import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { _ELREF, _R2 } from '../../../utils/angular/ng-api';
import { ISimpleChanges } from '../../../utils/types';

@Directive({selector: '[setWidth]', standalone: true})
export class SetWidthDirective implements OnChanges {
  @Input({required: true}) wrapperWidth!: number;

  private el = _ELREF();
  private r = _R2();

  ngOnChanges(changes: ISimpleChanges<SetWidthDirective>): void {
    if (changes.wrapperWidth && this.wrapperWidth && changes.wrapperWidth.currentValue !== this.wrapperWidth) {
      this.setWidth(this.wrapperWidth);
    }
  }

  private setWidth(width: number): void {
    const widthPx = `${width}px`;
    this.r.setStyle(this.el.nativeElement, 'width', widthPx, 2);
    this.r.setStyle(this.el.nativeElement, 'max-width', widthPx, 2);
  }
}
