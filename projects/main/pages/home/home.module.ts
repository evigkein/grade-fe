import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/img.directive';
import { StopEventsDirective } from '@shared/directives/utils';
import { FaqsComponent } from '@shared/features/faq/faqs.component';
import {
  ScrollToTopButtonComponent
} from '@ui/components/+features/sctoll-to-top-button/scroll-to-top-button.component';
import { AccordionComponent } from '@ui/components/accordion';
import { ButtonComponent } from '@ui/components/button/button.component';
import { BannerComponent } from '@ui/features/banner/banner.component';
import { CallbackModalWrapperComponent } from '@ui/features/call-us/modal-wrapper/callback-modal-wrapper.component';
import { AlertModalComponent } from '@ui/modals/alert/alert-modal.component';
import { ModalWrapperComponent } from '@ui/modules/modals/modal-wrapper/modal-wrapper.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { PageHomeComponent } from './components/entry/home.component';
import { HomeFeaturesComponent } from './components/features/home-features.component';
import { MainHomeBannerComponent } from '@ui/features/banner-main/main-home-banner.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomImageDirective,
    AccordionComponent,
    TranslatePipe,
    SvgIconComponent,
    HomeFeaturesComponent,
    ButtonComponent,
    StopEventsDirective,
    BannerComponent,
    FaqsComponent,
    ScrollToTopButtonComponent,
    ModalWrapperComponent,
    AlertModalComponent,
    MainHomeBannerComponent,
    CallbackModalWrapperComponent,
  ],
  declarations: [PageHomeComponent],
  exports: [PageHomeComponent],
})
export class HomeModule {
}
