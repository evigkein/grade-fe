import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewEncapsulation,
  input,
  computed, booleanAttribute, numberAttribute
} from '@angular/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTooltipTrigger } from 'ng-zorro-antd/tooltip';
import { popoverPositions } from './popover-position';

@Component({
  selector: 'p-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzPopoverModule],
  encapsulation: ViewEncapsulation.None,
})
export class PopoverComponent {
  template = input.required<TemplateRef<void>>();
  position = input<popoverPositions>('bottomRight');
  trigger = input<NzTooltipTrigger | null>(null);
  type = input<'withoutArrow' | null>(null);
  isPopoverWithoutArrows = input(true, { transform: booleanAttribute });
  isVisible = input(false, { transform: booleanAttribute });
  hasBackdrop = input(false, { transform: booleanAttribute });
  isPopoverArrowPointAtCenter = input(false, { transform: booleanAttribute });

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  @Output() visibleChange = new EventEmitter<boolean>();

  popoverClassName = '';

  constructor() {
    this.initPopoverClass();
  }

  initPopoverClass() {
    if (this.type() === 'withoutArrow') {
      this.popoverClassName = 'nz-popover-without-arrow';
    }
  }

  classes = computed(() => {
    return [
      'popover',
      this.isPopoverWithoutArrows() ? 'popover--no-arrows' : '',
      this.type() === 'withoutArrow' ? 'popover--type-without-arrow' : '',
      this.isLoading() ? 'popover--loading' : '',
    ].filter(Boolean).join(' ');
  });
}
