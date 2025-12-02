import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/img.directive';
import { SkipHydrationDirective } from '@shared/directives/utils/skip-hydration.directive';
import { FaqsComponent } from '@shared/features/faq/faqs.component';
import { _SEO, ISeo } from '@shared/services';
import { _RS } from '@shared/services/router.service';
import { destroy } from '@shared/utils/libs/rxjs';
import {
  ScrollToTopButtonComponent
} from '@ui/components/+features/sctoll-to-top-button/scroll-to-top-button.component';
import { MainHomeBannerComponent } from '@ui/features/banner-main/main-home-banner.component';
import { BannerComponent } from '@ui/features/banner/banner.component';
import { CallbackModalWrapperComponent } from '@ui/features/call-us/modal-wrapper/callback-modal-wrapper.component';
import { scrollToTop } from '@utils/helpers/scroll-to.util';
import { faqList } from '../../const/faq';
import { HomeFeaturesComponent } from '../features/home-features.component';

@Component({
  selector: 'p-page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CustomImageDirective,
    TranslatePipe,
    HomeFeaturesComponent,
    BannerComponent,
    FaqsComponent,
    ScrollToTopButtonComponent,
    MainHomeBannerComponent,
    CallbackModalWrapperComponent,
    SkipHydrationDirective,
  ]
})
export class PageHomeComponent implements OnInit {
  private seo = _SEO();
  destroy$ = destroy();

  @ViewChild(CallbackModalWrapperComponent) callbackModal!: CallbackModalWrapperComponent;

  faqList = signal(faqList);

  private router = _RS();

  ngOnInit() {
    scrollToTop(0);
    this.seo.updateSeo(SEO());
    this.seo.setSchemaOrganization();
  }

  openCallbackModal(isClose = false): void {
    this.callbackModal.open();
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
  };
}
