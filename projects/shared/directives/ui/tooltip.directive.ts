import {
  Directive,
  TemplateRef,
  effect,
  input,
  computed,
  inject, Input,
} from '@angular/core';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { TranslateFacade } from '@core/modules/translate';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective extends NzTooltipDirective {
  tooltip = input.required<string | TemplateRef<void>>();
  @Input() override placement: 'top' | 'left' | 'right' | 'bottom' = 'top';
  @Input() override trigger: 'click' | 'focus' | 'hover' = 'hover';
  textAlign = input<'center' | 'left' | 'right'>();
  overlayClass = input('');
  ex = input<'center' | 'left' | 'right'>();

  private translate = inject(TranslateFacade);

  translated = computed(() => {
    const v = this.tooltip();
    return typeof v === 'string' ? this.translate.translate(v) : v;
  });

  classes = computed(() => {
    return [
      this.overlayClass(),
      this.textAlign() ? `tooltip-align--${this.textAlign()}` : '',
      this.ex() ? `tooltip-ex--${this.ex()}` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    super();

    effect(() => {
      const title = this.translated();
      const cls = this.classes();

      this.title = title;
      this.overlayClassName = cls;
    });
  }
}
