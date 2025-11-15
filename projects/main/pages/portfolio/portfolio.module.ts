import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { CasePreviewComponent } from '@shared/features/case-preview/case-preview.component';
import {
  ScrollToTopButtonComponent
} from '@ui/components/+features/sctoll-to-top-button/scroll-to-top-button.component';
import { MainHomeBannerComponent } from '../home/components/main-banner/main-home-banner.component';
// import { AppTranslateModule } from '@core/modules/translate';
import { PortfolioComponent } from './components/entry/portfolio.component';

import { PortfolioRoutingModule } from './portfolio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    // AppTranslateModule,
    PortfolioRoutingModule,
    TranslatePipe,
    CustomImageDirective,
    CasePreviewComponent,
    ScrollToTopButtonComponent,
    MainHomeBannerComponent,
  ],
  declarations: [PortfolioComponent],
  exports: [PortfolioComponent],
})
export class PortfolioModule {
}
