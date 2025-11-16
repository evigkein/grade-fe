import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  TemplateRef,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trackByFn } from '@utils/angular';

@Component({
  selector: 'p-skeleton-grid',
  standalone: true,
  templateUrl: './skeleton-grid.component.html',
  styleUrls: ['./skeleton-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SkeletonGridComponent {
  type = input.required<'nft-card' | 'collection-card'>();
  template = input.required<TemplateRef<any>>();

  columns = input(4, { transform: numberAttribute });
  rows = input(3, { transform: numberAttribute });
  gapSizeInPx = input(20, { transform: numberAttribute });
  itemHeight = input(328, { transform: numberAttribute });
  itemWidth = input<string | number>('224');

  skeletonRows = input(2, { transform: numberAttribute });

  isLoading = input(false);
  tabindex = input(0, { transform: numberAttribute });

  trackBy = trackByFn;

  skeletons = computed(() => {
    const total = this.columns() * this.rows();
    return Array.from({ length: total });
  });

  @HostBinding('style.--amount-of-columns') get amountOfColumns() {
    return `${this.columns()}`;
  }

  @HostBinding('style.--amount-of-rows') get amountOfRows() {
    return `${this.rows()}`;
  }

  @HostBinding('style.--gap-size') get gapSize() {
    return `${this.gapSizeInPx()}px`;
  }

  @HostBinding('style.--skeleton-item-height') get skeletonHeight() {
    return `${this.itemHeight()}px`;
  }

  @HostBinding('style.--skeleton-item-width') get skeletonWidth() {
    const w = this.itemWidth();
    return typeof w === 'number' ? `${w}px` : w;
  }
}
