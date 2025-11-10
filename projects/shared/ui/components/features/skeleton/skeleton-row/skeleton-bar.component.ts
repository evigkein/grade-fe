import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'p-skeleton-bar',
  templateUrl: './skeleton-bar.component.html',
  styleUrls: ['./skeleton-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class SkeletonBarComponent {}
