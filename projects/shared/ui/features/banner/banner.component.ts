import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '../../../directives/ui/img/priority.directive';
import { StopEventsDirective } from '../../../directives/utils';

export type TBannerAlign = 'left' | 'center' | 'right';
export type TBannerSize = 'l' | 'm' | 's';
export type TBannerBg = 'full' | 'side';

@Component({
  selector: 'p-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    StopEventsDirective,
    TranslatePipe,
    CustomImageDirective,
    NgClass
  ]
})
export class BannerComponent {
  textAlign = input<TBannerAlign>('left');
  size = input<TBannerSize>('l');
  bg = input<TBannerBg>('full');

  imgUrl = input<string>('');
  titleText = input<string>('');
  linkText = input<string>('');
  linkUrl = input<string>('');
}
