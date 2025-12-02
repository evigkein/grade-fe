import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@core/modules/translate/translate.pipe';
import { CustomImageDirective } from '@shared/directives/ui/img/img.directive';
import { CasePreviewComponent, ICasePreview } from '@shared/features/case-preview/case-preview.component';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import {
  ScrollToTopButtonComponent
} from '@ui/components/+features/sctoll-to-top-button/scroll-to-top-button.component';
import { MainHomeBannerComponent } from '@ui/features/banner-main/main-home-banner.component';

@Component({
  selector: 'p-page-work',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslatePipe,
    CustomImageDirective,
    CasePreviewComponent,
    ScrollToTopButtonComponent,
    MainHomeBannerComponent,
  ],
})
export class PortfolioComponent implements OnInit {
  portfolio = signal(portfolio());

  ngOnInit() {
    scrollToTop(0);
  }
}

function portfolio(): ICasePreview[] {
  return [
    {
      id: 'avo-marketplace',
      title: 'work.case1.title',
      subtitle: 'work.case1.subtitle',
      description: 'work.case1.description',
      image: 'work/case_avo.png',
      url: 'https://avonft.ru'
    },
    {
      id: 'blink',
      title: 'work.case2.title',
      subtitle: 'work.case2.subtitle',
      description: 'work.case2.description',
      image: 'work/case_blink.png',
      url: 'https://t.me/blink_game_ai'
    },
    {
      id: 'buycoin',
      title: 'work.case3.title',
      subtitle: 'work.case3.subtitle',
      description: 'work.case3.description',
      image: 'work/case_dapp.png',
      url: 'https://dapp.buycoin.bot'
    },
    {
      id: 'soyuz-transfer',
      title: 'work.case4.title',
      subtitle: 'work.case4.subtitle',
      description: 'work.case4.description',
      image: 'work/case_sz.png',
      url: 'https://soyz-transfer.ru'
    }
  ];
}
