import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { StarsRatingComponent } from '../../components/stars-rating/stars-rating.component';

export interface IReviewCard {
  name: string;
  text: string;
  date: string;
  route: string;
  rating: number; // 1-5
  photos?: string[];
  carType?: string;
  reply?: {                        // ответ компании
    text: string;
    date?: string;
  };
}

@Component({
  selector: 'p-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, StarsRatingComponent],
})
export class ReviewCardComponent {
  @Input({ required: true }) review!: IReviewCard;
  @Output() AAAA2 = new EventEmitter();

  runOutput(): void {
    this.AAAA2.emit();
  }
}
