import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  input,
  signal,
  computed,
  booleanAttribute,
  numberAttribute,
  Output,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'p-stars-rating',
  standalone: true,
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  maxStars = input(5, { transform: numberAttribute });
  rating = input(5, { transform: numberAttribute });
  hasRating = input(false, { transform: booleanAttribute });
  hasCount = input(false, { transform: booleanAttribute });
  isControl = input(false, { transform: booleanAttribute });
  reviewsCount = input(0, { transform: numberAttribute });

  @Output() ratingChange = new EventEmitter<number>();

  hoveredStar = signal(0);

  private ratingState = signal(this.rating());

  constructor() {
    effect(() => {
      this.ratingState.set(this.rating());
    });
  }

  stars = computed(() => Array.from({ length: this.maxStars() }));

  ratingValue = computed(() => this.ratingState());

  private onChange = (value: number) => {};
  private onTouched = () => {};

  setRating(star: number) {
    if (!this.isControl()) return;
    this.ratingState.set(star);
    this.ratingChange.emit(star);
    this.onChange(star);
    this.onTouched();
  }

  onHover(star: number) {
    if (!this.isControl()) return;
    this.hoveredStar.set(star);
  }

  onLeave() {
    this.hoveredStar.set(0);
  }

  writeValue(value: number) {
    if (typeof value === 'number') {
      this.ratingState.set(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
