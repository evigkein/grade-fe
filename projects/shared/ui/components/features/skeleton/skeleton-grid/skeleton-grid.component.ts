import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { trackByFn } from '@utils/angular';

@Component({
  selector: 'p-skeleton-grid',
  templateUrl: './skeleton-grid.component.html',
  styleUrls: ['./skeleton-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class SkeletonGridComponent implements OnInit {
  @Input() type!: 'nft-card' | 'collection-card';
  @Input() template!: TemplateRef<any>;
  @Input() columns = 4;
  @Input() rows = 3;
  @Input() gapSizeInPx = 20;
  @Input() itemHeight = 328;
  @Input() itemWidth: string | number = 224;
  @Input() skeletonRows = 2;

  skeletons!: undefined[];
  trackBy = trackByFn;

  @HostBinding('style.--amount-of-columns') get amountOfColumns(): string {
    return this.columns.toString();
  }
  @HostBinding('style.--amount-of-rows') get amountOfRows(): string {
    return this.rows.toString();
  }
  @HostBinding('style.--gap-size') get gapSize(): string {
    return `${this.gapSizeInPx}px`;
  }
  @HostBinding('style.--skeleton-item-height') get skeletonHeight(): string {
    return `${this.itemHeight}px`;
  }
  @HostBinding('style.--skeleton-item-width') get skeletonWidth(): string {
    return typeof this.itemWidth === 'number' ? `${this.itemWidth}px` : this.itemWidth;
  }

  constructor() {}

  ngOnInit(): void {
    this.initSkeletons();
  }

  initSkeletons(): void {
    const amountOfSkeletons = this.columns * this.rows;
    this.skeletons = Array.from({ length: amountOfSkeletons });
  }
}
