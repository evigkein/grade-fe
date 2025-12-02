import {CommonModule} from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  OnInit,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import { NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

import {popoverPositions} from './popover-position';

@Component({
  selector: 'p-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzPopoverModule],
  encapsulation: ViewEncapsulation.None,
})
export class PopoverComponent implements OnInit {
  template = input.required<TemplateRef<void>>();
  position = input<popoverPositions>('bottomRight');
  trigger = input<NzTooltipTrigger>(null);
  type = input<'withoutArrow' | null>(null);
  isPopoverWithoutArrows = input(true, {transform: booleanAttribute});
  isVisible = input(false, {transform: booleanAttribute});
  hasBackdropType = input<'transparent' | 'full' | undefined>(undefined);
  isPopoverArrowPointAtCenter = input(false, {transform: booleanAttribute});
  isLoading = input(false, {transform: booleanAttribute});
  tabindex = input(0, {transform: numberAttribute});

  visibleChange = output<boolean>();

  classes = computed(() => {
    return [
      'popover',
      this.type() === 'withoutArrow' ? 'popover--without-arrow' : '',
      this.isLoading() ? 'popover--loading' : '',
    ].filter(Boolean).join(' ');
  });

  popoverClassName = computed(() => {
    if (this.type() === 'withoutArrow') return 'nz-popover-without-arrow';
    return '';
  });

  ngOnInit() {}

  onBackdropClick() {
    this.visibleChange.emit(false);
  }
}
