import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, numberAttribute, signal } from '@angular/core';
import { TextOverflowDirective } from '../../../directives/ui/text-overflow.directive';
import { AutoEllipsisDirective } from '../../../directives/ui/utils/auto-ellipsis.directive';
import { SkipHydrationDirective } from '../../../directives/utils/skip-hydration.directive';
import { TooltipDirective } from '../../modules/tooltip/tooltip.directive';

@Component({
  selector: 'p-fade-text',
  templateUrl: './fade-text.component.html',
  styleUrls: ['./fade-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TextOverflowDirective, TooltipDirective, SkipHydrationDirective, AutoEllipsisDirective]
})
export class FadeTextComponent {
  @Input() text!: string;
  @Input() tooltip?: string;
  @Input({transform: numberAttribute}) maxLines: number = 1;
  @Input() isEnabled = true;

  isTooltipMode = signal(false);
  isOverflowed = signal(false);
  lines = signal<string[]>([]);

  enableTooltipMode(isOverflowed: boolean) {
    this.isTooltipMode.set(isOverflowed);
    this.isOverflowed.set(isOverflowed);
  }

  setLines(lines: string[]) {
    this.lines.set(lines);
    lines.length > 1 && this.isOverflowed.set(true);
    // this.isTooltipMode.set(true)
  }

  overflow() {
    this.isOverflowed.set(true);
  }
}
