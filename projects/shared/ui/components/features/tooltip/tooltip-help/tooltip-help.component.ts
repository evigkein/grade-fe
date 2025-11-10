import { NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {TooltipDirective} from '../../../../../directives/ui/tooltip.directive';

export type TooltipHelpMarginLeft = 'm' | 'xs' | 's' | 'none';
export type TooltipHelpPosition = 'after' | 'before' | 'above' | 'below' | 'left' | 'right';

@Component({
  selector: 'p-tooltip-help',
  templateUrl: './tooltip-help.component.html',
  styleUrls: ['./tooltip-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TooltipDirective, TranslateModule, NgIf],
  // host: {ngSkipHydration: 'true'}
})
export class TooltipHelpComponent {
  @Input() tooltip!: string | TemplateRef<void> | undefined;
  @Input() size: 's' | 'm' = 's';
  @Input() position: TooltipHelpPosition = 'above';
  @Input() marginLeftType: TooltipHelpMarginLeft = 'none';
  @Input() label?: string;
}
