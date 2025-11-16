import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  input,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { TooltipDirective } from '../../../../../directives/ui/tooltip.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

export type TooltipHelpMarginLeft = 'm' | 'xs' | 's' | 'none';
export type TooltipHelpPosition = 'after' | 'before' | 'above' | 'below' | 'left' | 'right';

@Component({
  selector: 'p-tooltip-help',
  templateUrl: './tooltip-help.component.html',
  styleUrls: ['./tooltip-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TooltipDirective, TranslateModule],
})
export class TooltipHelpComponent {
  tooltip = input.required<string | TemplateRef<void>>();
  size = input<'s' | 'm'>('s');
  position = input<TooltipHelpPosition>('above');
  marginLeftType = input<TooltipHelpMarginLeft>('none');
  label = input<string>();

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  classes = computed(() => {
    return [
      this.label() ? 'mark--has-label' : '',
      `mark--margin-left-${this.marginLeftType()}`,
      `mark--${this.size()}`,
    ]
      .filter(Boolean)
      .join(' ');
  });
}
