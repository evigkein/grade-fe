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
import { HomeServicesComponent } from '../services/home-services.component';
import { HomePartnershipComponent } from '../partnership/home-partnership.component';

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
    HomeServicesComponent,
    HomePartnershipComponent,
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
    title: 'A Grade Technologies — Enterprise Digital Engineering & Fintech Solutions',
    description: `
A Grade Technologies delivers enterprise-grade digital engineering solutions. We build resilient, scalable platforms for finance, Web3, and large-scale operations. Our team combines deep experience from leading financial and technology companies to create systems that grow with your business.
  `.trim(),
    keywords: `
digital engineering, enterprise software development, fintech solutions, web3 development, 
blockchain infrastructure, financial platforms, scalable architecture, custom software development
  `.trim(),
    url: 'https://agrade.tech',
    image: 'https://agrade.tech/assets/og-image.jpg',
    type: 'website',
  };
}
