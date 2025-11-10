import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallUsComponent } from '@shared/features/call-us/call-us.component';
import { SkeletonGridComponent } from '@ui/components/features/skeleton/skeleton-grid/skeleton-grid.component';
import { FaqCardComponent } from '@ui/features/faq-card/faq-card.component';
import { PageFaqComponent } from './components/entry/page-faq.component';

import { PageFaqRoutingModule } from './page-faq-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PageFaqRoutingModule,
    CallUsComponent,
    FaqCardComponent,
    SkeletonGridComponent,
  ],
  declarations: [PageFaqComponent],
  exports: [PageFaqComponent],
})
export class PageFaqModule {
}
