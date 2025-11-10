import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalCacheService } from '@core/modules/local-cache.service';
import { IFindReviewsItemDto } from '@shared/domain/api/swagger/models/i-find-reviews-item-dto';
import { ApiFaqService } from '@shared/domain/api/swagger/services/api-faq.service';
import { ApiReviewsService } from '@shared/domain/api/swagger/services/api-reviews.service';
import { _RS } from '@shared/services/router.service';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import { isControlInvalid } from '@ui/forms/utils/is-control-valid';
import { _NOTIFY } from '@ui/modules/notifications/notification.service';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { destroy } from '@utils/libs/rxjs';
import { map, shareReplay, tap } from 'rxjs';
import { ERoute } from '../../../../domain/constants/route.enum';
import { goBack } from '@utils/helpers/browser/window.util';
import { ReviewsCacheService } from '../../services/reviews.service';

@Component({
  selector: 'p-page-forum',
  templateUrl: './page-reviews.component.html',
  styleUrls: ['./page-reviews.component.scss'],
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageReviewsComponent implements OnInit {
  private router = _RS();
  private apiReviews = inject(ApiReviewsService)
  private notify = _NOTIFY();

  reviewsService = inject(ReviewsCacheService)
  destroy$ = destroy();

  private PAGE_SIZE = 5;
  visibleCount = signal(this.PAGE_SIZE);

  reviews$: Signal<IFindReviewsItemDto[]> = this.reviewsService.reviews;

  form = new FormBuilder().group({
    name: ['', [Validators.required]],
    route: ['', [Validators.required]],
    phone: [''],
    rating: [5],
    text: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit() {
    scrollToTop(0);
  }

  showMore(total: number): void {
    const next = this.visibleCount() + this.PAGE_SIZE;
    this.visibleCount.set(Math.min(next, total));
  }

  goBack() {
    if (!isBrowser()) return;
    goBack(this.router.router, `/${ERoute.Main}`)
  }

  submit(): void {
    if(this.form.value.text.length < 6) this.notify.showError('Минимальная длина отзыва: 5 символов')
    if (isControlInvalid(this.form)) return;

    this.apiReviews.reviewsApiControllerCreate({body: this.form.value} as any)
      .pipe(
        tap(() => this.reviewsService.reload()),
        this.destroy$()
      )
      .subscribe()
  }
}
