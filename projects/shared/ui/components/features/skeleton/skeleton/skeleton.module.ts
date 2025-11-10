import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonImageModule } from '@shared/LOCAL_UI_KIT/skeleton/skeleton-image/skeleton-image.module';
import { SkeletonBarModule } from '@shared/LOCAL_UI_KIT/skeleton/skeleton-row/skeleton-bar.module';

import { SkeletonComponent } from './skeleton.component';

@NgModule({
  imports: [CommonModule, SkeletonImageModule, SkeletonBarModule],
  declarations: [SkeletonComponent],
  exports: [SkeletonComponent],
})
export class SkeletonModule {}
