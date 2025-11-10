import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  makeStateKey,
  OnInit, signal,
  TransferState
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFindLocationsItemDto } from '@shared/domain/api/swagger/models/i-find-locations-item-dto';
import { ILocationSchema } from '@shared/domain/api/swagger/models/i-location-schema';
import { IQuoteWithPricesDto } from '@shared/domain/api/swagger/models/i-quote-with-prices-dto';
import { ITariffPriceItemDto } from '@shared/domain/api/swagger/models/i-tariff-price-item-dto';
import { ApiQuotesService } from '@shared/domain/api/swagger/services/api-quotes.service';
import { _SEO } from '@shared/services';
import { DeviceService } from '@shared/services/device/device.service';
import { _RS } from '@shared/services/router.service';
import { formatDuration, formatDurationShort } from '@shared/utils/helpers/date-time/format-duration';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import { destroy } from '@shared/utils/libs/rxjs';
import { ITag } from '@ui/components/tags/tags.interface';
import { _TS } from '@utils/angular/ng-api';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { BehaviorSubject, filter, map, merge, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ERoute } from '../../../../domain/constants/route.enum';
import { ETransferState } from '../../../../domain/constants/transfer-state';

const ROUTE_KEY = makeStateKey<IQuoteWithPricesDto>('route-data');

@Component({
  selector: 'p-page-forum',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageRouteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = _RS();
  private apiQuotes = inject(ApiQuotesService);
  private seo = _SEO();
  private ts = _TS();

  slugs = this.route.snapshot.paramMap.get('slug');

  private pickRoute$ = new Subject<{ from: string; to: string }>();

  route$ = this.initRoute();
  title$ = this.route$.pipe(map(r => `${r.route.locationFrom?.names?.ru} - ${r.route.locationTo?.names?.ru}`),)
  tags$: Observable<ITag[]> = this.route$.pipe(map(r => {
    const duration = formatDurationShort({mins: r.route.durationMinutes});

    return [
      {label: 'Расстоние: ', labelBold: `~${r.route.distanceKm}км`,icon: 'roadSign'},
      {label: `Время в пути: `, labelBold: `~${duration}`, icon: 'clocks'},
    ]
  }));

  deviceService = inject(DeviceService);
  isDesktopImg = computed(() => this.deviceService.currentWidth() > 950);
  // isCarousel = computed(() => this.deviceService.currentWidth() > 950);

  destroy$ = destroy();
  isLoading = signal(false);
  isLoaded = signal(false);

  ngOnInit() {
    scrollToTop(0);

    // const v = this.ts.get<IQuoteWithPricesDto>(ROUTE_SEO_KEY, null as any);
    // console.log(v, 'CACHED');

    // const fromSlug = v?.route?.locationFrom?.slug;
    // const toSlug = v?.route?.locationTo?.slug;
    // const fromName = v?.route?.locationFrom?.names?.ru;
    // const toName = v?.route?.locationTo?.names?.ru;
    //
    // this.seo.updateSeo({
    //   title: `ТаксиZZZZZZZZZ ${fromName} — ${toName} | Поездки по России`,
    //   description: `Поездка на такси из ${fromName} в ${toName}. Комфортные автомобили, фиксированная цена, онлайн-бронирование.`,
    //   url: `https://souztransfer.ru/taxi/${fromSlug}_${toSlug}`,
    // });
  }

  private initRoute(): Observable<IQuoteWithPricesDto> {
    return merge(
      of(this.route.snapshot.paramMap.get('slug')).pipe(
        filter(Boolean),
        map(slug => {
          const [from, to] = slug!.split('_');
          return { from, to };
        }),
      ),
      this.pickRoute$
    ).pipe(
      filter(v => !!v.from && !!v.to),
      tap(() =>  this.isLoading.set(true)),
      switchMap(({ from, to }) =>
        this.apiQuotes.quotesControllerRoute({ from, to }).pipe(
          tap((v: IQuoteWithPricesDto) => {
            // isBrowser() && this.ts.set(this.key(`${from}_${to}`), v);

            this.router.updatePathParams(`${v.route.locationFrom.slug}_${v.route.locationTo.slug}`)

            const fromSlug = v.route.locationFrom?.slug;
            const toSlug = v.route.locationTo?.slug;
            const fromName = v.route.locationFrom?.names?.ru;
            const toName = v.route.locationTo?.names?.ru;

            this.seo.updateSeo({
              title: `Такси ${fromName} — ${toName} | Поездки по России`,
              description: `Поездка на такси из ${fromName} в ${toName}. Комфортные автомобили, фиксированная цена, онлайн-бронирование.`,
              url: `https://souztransfer.ru/taxi/${fromSlug}-${toSlug}`,
            });

            this.isLoading.set(false);
            this.isLoaded.set(true);

            this.seo.setSchemaTrip(fromName, toName);
          })
        )
      ),
      shareReplay(1)
    );
  }

  onSelectTariff(tariff: ITariffPriceItemDto): void {
    this.router.router.navigate([`/${ERoute.Booking}/${this.slugs}`],   {
      queryParams: {
        tariffPrice: tariff.price,
        tariffName: tariff.tariff.name,
      },
    })
  }

  onPickRoute(e?: IFindLocationsItemDto[]): void {
    if (!e?.length) return;
    this.pickRoute$.next({ from: e[0].slug, to: e[1].slug });
  }

  private key(query: string) {
    const q = (query ?? '').trim().toLowerCase();
    return makeStateKey<IQuoteWithPricesDto>(`${ETransferState.Routes}:${q}`);
  }
}
