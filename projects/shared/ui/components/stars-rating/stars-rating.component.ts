import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  numberAttribute,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, SvgIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarsRatingComponent),
      multi: true,
    },
  ],
})
export class StarsRatingComponent implements ControlValueAccessor {
  @Input() maxStars = 5;
  @Input({ transform: numberAttribute }) rating = 5;
  @Input({ transform: booleanAttribute }) hasRating = false;
  @Input({ transform: booleanAttribute }) hasCount = false;
  @Input({ transform: booleanAttribute }) isControl = false;
  @Input({ transform: numberAttribute }) reviewsCount = 0;

  @Output() ratingChange = new EventEmitter<number>();

  hoveredStar = 0;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  setRating(star: number): void {
    if (!this.isControl) return;
    this.rating = star;
    this.ratingChange.emit(star);
    this.onChange(star);
    this.onTouched();
  }

  onHover(star: number): void {
    if (!this.isControl) return;
    this.hoveredStar = star;
  }

  onLeave(): void {
    this.hoveredStar = 0;
  }

  writeValue(value: number): void {
    if (typeof value === 'number') this.rating = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
