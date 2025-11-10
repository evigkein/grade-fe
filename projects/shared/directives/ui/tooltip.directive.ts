import {
  Directive,
  Input,
  HostBinding,
  ElementRef,
  Renderer2,
  AfterViewInit,
  TemplateRef,
  ViewContainerRef, OnChanges, SimpleChanges, inject, ChangeDetectorRef
} from '@angular/core';
import { TranslateFacade } from '@core/modules/translate';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';

@Directive({selector: '[tooltip]', standalone: true})
export class TooltipDirective extends NzTooltipDirective implements AfterViewInit, OnChanges {
  @Input({required: true}) tooltip!: string | TemplateRef<void>;
  @Input() override placement: 'top' | 'left' | 'right' | 'bottom' = 'top';
  @Input() override trigger: 'click' | 'focus' | 'hover' = 'hover';
  @Input() textAlign: 'center' | 'left' | 'right' | undefined;
  @Input() overlayClass = '';
  @Input() ex: 'center' | 'left' | 'right' | undefined;

  @HostBinding('class') elementClass!: string;

  private translate = inject(TranslateFacade);

  override ngAfterViewInit() {
    const t = this.tooltip;
    this.title = t ? this.getTitle(t) : t;
    if (this.textAlign) {
      this.overlayClassName = `tooltip-align--${this.textAlign}`; // Установка класса стилей
    }
    super.ngAfterViewInit();
  }

  private getTitle(t: string | TemplateRef<void>): string | TemplateRef<void> {
    return typeof t === 'string' ? this.translate.translate(t) : this.tooltip;
  }
}
