import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  numberAttribute,
  OnChanges,
  signal,
  ViewChild
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StopEventsDirective } from '../../../../directives/utils';
import { ISimpleChanges } from '../../../../utils/types';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'p-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent, StopEventsDirective]
})
export class BlockInfoComponent implements OnChanges, AfterViewInit {
  @Input() titleText!: string;
  @Input({transform: numberAttribute}) minHeight = 0;
  @Input({transform: numberAttribute}) maxHeight = Infinity;

  @ViewChild('content', {static: false}) content!: ElementRef;

  isExpanded = signal(false);
  contentHeight = signal(this.minHeight);
  needsExpandButton = signal(false);

  ngOnChanges(changes: ISimpleChanges<BlockInfoComponent>) {
    if (changes.minHeight) {
      this.contentHeight.set(this.minHeight);
    }
    if (this.content) {
      this.updateExpandButtonVisibility();
    }
  }

  ngAfterViewInit() {
    this.updateExpandButtonVisibility();
  }

  expandContent() {
    this.contentHeight.set(this.maxHeight === Infinity ? this.content.nativeElement.scrollHeight : this.maxHeight);
    this.isExpanded.set(true);
  }

  collapseContent() {
    this.contentHeight.set(this.minHeight);
    this.isExpanded.set(false);
    this.updateExpandButtonVisibility();
  }

  updateExpandButtonVisibility() {
    if (this.content) {
      const contentElement = this.content.nativeElement;
      const needsExpand = contentElement.scrollHeight > this.minHeight;
      this.needsExpandButton.set(needsExpand);
    }
  }
}
