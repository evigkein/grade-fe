import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  numberAttribute,
  OnChanges,
} from '@angular/core';
import { ISimpleChanges } from '@core';

@Component({
  selector: 'p-bubble',
  template: '{{ count > 9 ? "9+" : count }}',
  styleUrls: ['./bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class BubbleComponent implements OnChanges {
  @Input({required: true, transform: numberAttribute}) count = 0;
  @Input() isChangeAnimated = true;

  @HostBinding('class.animated') animated = false;

  @HostListener('animationend') onAnimationend(): void {
    this.animated = false;
  }

  ngOnChanges({count}: ISimpleChanges<BubbleComponent>): void {
    if (count && this.isChangeAnimated && !count.firstChange) {
      this.animated = true;
    }
  }
}
