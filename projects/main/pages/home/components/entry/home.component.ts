import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { IFindLocationsItemDto } from '@shared/domain/api/swagger/models/i-find-locations-item-dto';
import { IFindTariffsItemDto } from '@shared/domain/api/swagger/models/i-find-tariffs-item-dto';
import { ApiQuotesService } from '@shared/domain/api/swagger/services/api-quotes.service';
import { ApiTariffsService } from '@shared/domain/api/swagger/services/api-tariffs.service';
import { _SEO, ISeo } from '@shared/services';
import { _DEVICE, DeviceService } from '@shared/services/device/device.service';
import { _RS } from '@shared/services/router.service';
import { destroy } from '@shared/utils/libs/rxjs';
import { map, Observable, tap } from 'rxjs';
import { homeFeatures } from '../../const/features';
import { TRIP_CARD_MOCKS } from '../../const/popular-trips';

@Component({
  selector: 'p-page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PageHomeComponent implements OnInit {
  apiTariffs = inject(ApiTariffsService);
  apiQuotes = inject(ApiQuotesService);
  private seo = _SEO();

  // apiOrder = inject(ApiOrdersService)
  destroy$ = destroy();

  private router = _RS();

  // locations$ = this.initLocations();
  tariffs$ = this.initAutopark();

  deviceService = _DEVICE();
  isDesktopImg = computed(() => this.deviceService.currentWidth() > 950);

  // locationsFrom$ = this.initLocations(this.fromControl);
  // locationsTo$ = this.initLocations(this.toControl);

  homeFeatures = homeFeatures;
  popularTrips = TRIP_CARD_MOCKS;

  ngOnInit() {
    this.seo.updateSeo(SEO());
    this.seo.setSchemaOrganization();
    // scrollToTop(0);
  }

  onPickRoute(e?: IFindLocationsItemDto[]): void {
    const body = {from: e[0].slug, to: e[1].slug};
    if(!e?.[0]?.slug || !e?.[0]?.slug) return;

    this.router.router.navigate([`/taxi/${e[0].slug}_${e[1].slug}`])

    // this.apiQuotes.quotesControllerRoute({body}).pipe(
    //   tap(v => {
    //     console.log(v, 'VV');
    //   }),
    //   this.destroy$(),
    // ).subscribe();
  }

  private initAutopark(): Observable<IFindTariffsItemDto[]> {
    return this.apiTariffs.tariffsApiControllerFind().pipe(
      map(v => v.data.map(i => ({...i, price: 444}))),
    );
  }
}


function SEO(): Partial<ISeo> {
  return {
    title: 'SouzTransfer — ваш надёжный сервис онлайн-заказа такси и трансферов по России',
    description: `
SouzTransfer — современный онлайн-сервис для заказа такси и трансферов по всей России. 
Рассчитайте стоимость поездки онлайн и закажите комфортный трансфер по России. 
Здесь вы можете быстро рассчитать стоимость поездки, выбрать класс автомобиля — эконом, стандарт, комфорт, бизнес, минивэны, микроавтобус и зоотакси — и оформить заказ за пару минут. 
Мы работаем с проверенными перевозчиками и гарантируем надёжность, комфорт и безопасность каждой поездки. 
Наши клиенты заказывают трансферы из аэропортов, железнодорожных и автовокзалов, отелей и городов в любые направления. 
SouzTransfer подходит как для индивидуальных поездок, так и для встреч гостей, корпоративных и групповых трансферов. 
На сайте достаточно указать точку отправления и прибытия — система мгновенно рассчитает цену и предложит варианты транспорта. 
После оформления заявки с вами свяжется диспетчер, подтвердит заказ и поможет уточнить детали маршрута. 
Такси всех категорий — от эконома до бизнес-класса, даже зоотакси. 
Трансферы между городами и регионами России. 
Микроавтобусы и минивэны для больших групп. 
Поддержка клиентов 24/7 и прозрачные тарифы без скрытых платежей. 
Выбирая SouzTransfer, вы экономите время и получаете уверенность, что трансфер будет подан вовремя. 
Мы делаем каждую поездку комфортной и безопасной — для вас, ваших близких и гостей.
© 2025 SouzTransfer.ru — онлайн-заказ такси и трансферов по России.
  `.trim(),
    keywords: `
такси, трансфер, заказать такси онлайн, SouzTransfer, трансфер по России, 
такси аэропорт, трансфер вокзал, корпоративный трансфер, минивэн, микроавтобус, зоотакси, 
комфортный трансфер, бизнес-такси, междугороднее такси, онлайн-трансфер, поездка Россия
  `.trim(),
    url: 'https://souztransfer.ru',
    image: 'https://souztransfer.ru/assets/og-image.jpg',
    type: 'website',
  }
}
