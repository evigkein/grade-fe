import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { INavLink } from '../../../domain/main/constants/nav-links';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

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
    TranslatePipe
  ],
})
export class NavMobileComponent {
  navLinks = input.required<INavLink[]>();
  @Output() AAAA2 = new EventEmitter();

  runOutput(): void {
    this.AAAA2.emit();
  }
}
