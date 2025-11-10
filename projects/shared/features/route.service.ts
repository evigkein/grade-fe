import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { IQuoteWithPricesDto } from '../domain/api/swagger/models/i-quote-with-prices-dto';
import { ApiQuotesService } from '../domain/api/swagger/services/api-quotes.service';
import { RouterService } from '../services/router.service';

@Injectable({ providedIn: 'root' })
export class RouteDataService {
  private pickRouteSubject = new BehaviorSubject<{ from?: string; to?: string } | null>(null);
  pickRoute$ = this.pickRouteSubject.asObservable().pipe(filter(Boolean));

  constructor(
    private apiQuotes: ApiQuotesService,
    private route: ActivatedRoute,
    private router: RouterService
  ) {}

  public pickRoute(from: string, to: string): void {
    this.pickRouteSubject.next({ from, to });
  }

  public getRoute$(): Observable<IQuoteWithPricesDto> {
    const slug$ = of(this.route.snapshot.paramMap.get('slug')).pipe(
      filter(Boolean),
      map((slug) => {
        const [from, to] = slug!.split('_');
        return { from, to };
      })
    );

    return merge(slug$, this.pickRoute$).pipe(
      filter((v) => !!v.from && !!v.to),
      distinctUntilChanged(
        (a, b) => a.from === b.from && a.to === b.to // 🔒 не перезапрашиваем, если слаги те же
      ),
      switchMap(({ from, to }) =>
        this.apiQuotes.quotesControllerRoute({ from, to }).pipe(
          tap((v) => {
            const newSlug = `${v.route.locationFrom.slug}-${v.route.locationTo.slug}`;
            this.router.updatePathParams(newSlug);
          })
        )
      ),
      shareReplay(1)
    );
  }
}
