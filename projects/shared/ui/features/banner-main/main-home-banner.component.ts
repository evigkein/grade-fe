import { UpperCasePipe } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '../../../directives/ui/img/priority.directive';

@Component({
  selector: 'p-home-banner-main',
  templateUrl: './main-home-banner.component.html',
  styleUrls: ['./main-home-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslatePipe,
    UpperCasePipe,
    CustomImageDirective,
  ],
})
export class MainHomeBannerComponent {
  title = input<string>('work.title');
  subt = input<string>('work.subt');
  desc1 = input<string>('work.desc1');
  desc2 = input<string>('work.desc2');
  img = input<string>('home/homeBanner.jpg');
  isTitleColored = input(false, {transform: booleanAttribute});
}
