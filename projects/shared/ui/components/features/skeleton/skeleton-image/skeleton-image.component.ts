import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'p-skeleton-image',
  templateUrl: './skeleton-image.component.html',
  styleUrls: ['./skeleton-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class SkeletonImageComponent {}
