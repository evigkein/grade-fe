import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, shareReplay, map, tap, finalize } from 'rxjs';
import { ApiReviewsService } from '@shared/domain/api/swagger/services/api-reviews.service';

@Injectable({ providedIn: 'root' })
export class ReviewsCacheService {
  private api = inject(ApiReviewsService);

  private reload$ = new BehaviorSubject<void>(undefined);
  readonly isLoading = signal<boolean>(false);

  readonly reviews$ = this.reload$.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(() =>
      this.api.reviewsApiControllerFind({ body: {} }).pipe(
        map(r => r.data),
        finalize(() => this.isLoading.set(false))
      )
    ),
    shareReplay(1)
  );

  readonly reviews = toSignal(this.reviews$, { initialValue: [] });

  reload(): void {
    this.reload$.next();
  }
}
