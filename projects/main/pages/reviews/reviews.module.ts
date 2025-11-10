import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallUsComponent } from '@shared/features/call-us/call-us.component';
import { RussianNumberMaskDirective } from '@shared/features/different/rus-phone-mask';
import { ButtonComponent } from '@ui/components/button/button.component';
import { SkeletonGridComponent } from '@ui/components/features/skeleton/skeleton-grid/skeleton-grid.component';
import { StarsRatingComponent } from '@ui/components/stars-rating/stars-rating.component';
import { FaqCardComponent } from '@ui/features/faq-card/faq-card.component';
import { ReviewCardComponent } from '@ui/features/review-card/review-card.component';
import { InputModule } from '@ui/forms/controls/input/input.module';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { PageReviewsComponent } from './components/entry/page-reviews.component';

import { ReviewsRoutingModule } from './reviews-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    CallUsComponent,
    FaqCardComponent,
    ReviewCardComponent,
    ButtonComponent,
    InputModule,
    RussianNumberMaskDirective,
    StarsRatingComponent,
    SvgIconComponent,
    SkeletonGridComponent,
  ],
  declarations: [PageReviewsComponent],
  exports: [PageReviewsComponent],
})
export class ReviewsModule {
}
