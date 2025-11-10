import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, shareReplay, map, tap, finalize } from 'rxjs';
import { ApiFaqService } from '@shared/domain/api/swagger/services/api-faq.service';

@Injectable({ providedIn: 'root' })
export class FaqCacheService {
  private api = inject(ApiFaqService);

  private reload$ = new BehaviorSubject<void>(undefined);
  readonly isLoading = signal<boolean>(false);

  readonly faqs$ = this.reload$.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(() =>
      this.api.faqApiControllerFind({ body: {} }).pipe(
        map(r => r.data),
        finalize(() => this.isLoading.set(false))
      )
    ),
    shareReplay(1)
  );

  readonly faqs = toSignal(this.faqs$, { initialValue: [] });

  reload(): void {
    this.reload$.next();
  }
}
