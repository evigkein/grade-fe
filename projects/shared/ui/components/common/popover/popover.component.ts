import {CommonModule} from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnInit,
  Output,
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
  @Input() template!: TemplateRef<void>;
  @Input() position: popoverPositions = 'bottomRight';
  @Input() trigger: NzTooltipTrigger = null;
  @Input() type: 'withoutArrow' | null = null;
  @Input() isPopoverWithoutArrows = true;
  @Input() isVisible = false;
  @Input({transform: booleanAttribute}) hasBackdrop = false;
  @Input() isPopoverArrowPointAtCenter = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  popoverClassName = '';

  ngOnInit() {
    if (this.type === 'withoutArrow') {
      this.popoverClassName = 'nz-popover-without-arrow';
    }
  }
}
