import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { AppTranslateModule } from '@core/modules/translate';
import { ForumComponent } from './components/entry/forum.component';

import { EmptyRoutingModule } from './empty-routing.module';

@NgModule({
  imports: [
    CommonModule,
    // AppTranslateModule,
    EmptyRoutingModule,
  ],
  declarations: [ForumComponent],
  exports: [ForumComponent],
})
export class EmptyModule {
}
