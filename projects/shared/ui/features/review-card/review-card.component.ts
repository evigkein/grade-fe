import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsRatingComponent } from '../../components/stars-rating/stars-rating.component';

export interface IReviewCard {
  name: string;
  text: string;
  date: string;
  route: string;
  rating: number;
  photos?: string[];
  carType?: string;
  reply?: {
    text: string;
    date?: string;
  };
}

@Component({
  selector: 'p-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, StarsRatingComponent],
})
export class ReviewCardComponent {
  review = input.required<IReviewCard>();

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  onRun = output<void>();

  classes = computed(() => {
    return [
      'review-post',
      this.isLoading() ? 'review-post--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  runOutput() {
    this.onRun.emit();
  }
}
