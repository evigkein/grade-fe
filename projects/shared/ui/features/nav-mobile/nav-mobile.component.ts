import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { INavLink } from '../../../domain/main/constants/nav-links';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { ChangeLanguageComponent } from '../choose-lang/change-language.component';

@Component({
  selector: 'p-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    ChangeLanguageComponent
  ],
})
export class NavMobileComponent {
  navLinks = input.required<INavLink[]>();
}
