import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  signal,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextOverflowDirective } from '../../../directives/ui/text-overflow.directive';
import { AutoEllipsisDirective } from '../../../directives/ui/utils/auto-ellipsis.directive';
import { SkipHydrationDirective } from '../../../directives/utils/skip-hydration.directive';
import { TooltipDirective } from '../../modules/tooltip/tooltip.directive';
import { isControlInvalid } from '@ui/forms/utils/is-control-valid';

@Component({
  selector: 'p-fade-text',
  standalone: true,
  templateUrl: './fade-text.component.html',
  styleUrls: ['./fade-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TextOverflowDirective,
    TooltipDirective,
    SkipHydrationDirective,
    AutoEllipsisDirective,
  ],
})
export class FadeTextComponent {
  text = input.required<string>();
  tooltip = input<string>();
  maxLines = input(1, { transform: numberAttribute });
  isEnabled = input(true, { transform: booleanAttribute });

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  isTooltipMode = signal(false);
  isOverflowed = signal(false);
  lines = signal<string[]>([]);

  constructor() {
    this.initState();
  }

  private initState() {}

  enableTooltipMode(isOv: boolean) {
    this.isTooltipMode.set(isOv);
    this.isOverflowed.set(isOv);
  }

  setLines(v: string[]) {
    this.lines.set(v);
    v.length > 1 && this.isOverflowed.set(true);
  }

  overflow() {
    this.isOverflowed.set(true);
  }
}
