import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  TemplateRef, ViewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICreateOrderReqDto } from '@shared/domain/api/swagger/models/i-create-order-req-dto';
import { IQuoteWithPricesDto } from '@shared/domain/api/swagger/models/i-quote-with-prices-dto';
import { ApiOrdersService } from '@shared/domain/api/swagger/services/api-orders.service';
import { ApiQuotesService } from '@shared/domain/api/swagger/services/api-quotes.service';
import { ApiTripsService } from '@shared/domain/api/swagger/services/api-trips.service';
import { RouteDataService } from '@shared/features/route.service';
import { _ROUTE, _RS } from '@shared/services/router.service';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import { ITag } from '@ui/components/tags/tags.interface';
import { isControlInvalid } from '@ui/forms/utils/is-control-valid';
import { AlertModalComponent } from '@ui/modals/alert/alert-modal.component';
import { _NOTIFY } from '@ui/modules/notifications/notification.service';
import { _FB } from '@utils/angular/ng-api';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { formatDurationShort } from '@utils/helpers/date-time/format-duration';
import { extractDigits } from '@utils/helpers/numbers/extract-digits';
import { getFutureDate } from '@utils/libs/date/get-future-date.util';
import { destroy } from '@utils/libs/rxjs';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { ERoute } from '../../../../domain/constants/route.enum';

@Component({
  selector: 'p-page-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageBookingComponent implements OnInit {
  private routeA = inject(ActivatedRoute);
  private fb = _FB();
  private apiQuotes = inject(ApiQuotesService);
  private router = _RS();
  private aRoute = _ROUTE();
  private notiry = _NOTIFY();
  private apiTrips = inject(ApiTripsService);
  private apiOrders = inject(ApiOrdersService);

  // TODO переписать на переиспользование роутов между страницами. А пока так.
  private routeData = inject(RouteDataService);

  @ViewChild(AlertModalComponent) successModal!: AlertModalComponent;

  private route$ = this.initRoute();

  readonly route = toSignal(this.route$);
  readonly titleFrom = computed(() => this.route()?.route.locationFrom?.names?.ru ?? '');
  readonly titleTo = computed(() => this.route()?.route.locationTo?.names?.ru ?? '');
  readonly title = computed(() => {
    const from = this.titleFrom();
    const to = this.titleTo();
    return from && to ? `${from} - ${to}` : '';
  });

  readonly tags = computed<ITag[]>(() => {
    const r = this.route();
    if (!r) return [];

    const duration = formatDurationShort({ mins: r.route.durationMinutes });
    return [
      { label: 'Расстояние: ', labelBold: `~${r.route.distanceKm}км`, icon: 'roadSign' },
      { label: 'Время в пути: ', labelBold: `~${duration}`, icon: 'clocks' },
    ];
  });

  form = this.initForm();
  destroy$ = destroy();

  ngOnInit() {
    scrollToTop(0);
  }

  private initRoute(): Observable<IQuoteWithPricesDto> {
    const slugs = this.routeA.snapshot.paramMap.get('slug');
    const [from, to] = slugs!.split('_');

    return this.apiQuotes.quotesControllerRoute({ from, to }).pipe(
      // tap(v => {
      //   this.router.updatePathParams(`${v.route.locationFrom.slug}_${v.route.locationTo.slug}`)
      // }),
      shareReplay(1),
    )
  }

  submit(): void {
    if(isControlInvalid(this.form)) return;
    const route: IQuoteWithPricesDto = this.route();
    if(!route) this.router.router.navigate([`${ERoute.Route}`]);

    const locationFrom = route.route.locationFrom;
    const locationTo = route.route.locationFrom;

    const departureLocation = `${locationFrom.region}, ${locationFrom.type} ${locationFrom.name}`;
    const destinationLocation = `${locationTo.region}, ${locationTo.type} ${locationTo.name}`;

    const { tariffPrice, tariffName } = this.aRoute.snapshot.queryParams;

    const form = this.form.value;

    const body: ICreateOrderReqDto = {
      childCarSeatCount: form.needChildSeat ? 1 : 0,
      dateTime: new Date(form.dateTime).toISOString(),
      departureAddress: form.fromAddress,
      departureLocation,
      destinationLocation,
      destinationAddress: form.toAddress,
      isPetsOnTrip: false,
      price: +tariffPrice,
      mobileNumber: `7${extractDigits(form.phone)}`,
      tariff: tariffName,
      passengerCount: +form.passengers,
      fullName: form.fullName,
      route: route.route,
    } as any as ICreateOrderReqDto;

    this.apiOrders.orderControllerCreateOrder({body})
      .pipe(
        tap(() => this.successModal.open()),
        this.destroy$(),
      )
      .subscribe()
  }

  goBack() {
    if (!isBrowser()) return;
    const slugs = this.routeA.snapshot.paramMap.get('slug');
    this.router.router.navigate([`/${ERoute.Route}/${slugs}`])
  }

  private initForm() {
    return this.fb.group({
      fromAddress: ['', [Validators.required]],
      dateTime: ['', [Validators.required]],
      toAddress: ['', [Validators.required]],
      passengers: [1],
      needChildSeat: [false],
      hasPet: [false],
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      comment: [''],
    });
  }

  protected readonly minDate = new Date();
  protected readonly maxDate = getFutureDate(5, 'w')
}
