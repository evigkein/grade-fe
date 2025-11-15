import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MainLogoComponent } from '@ui/features/logo/main-logo.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { navLinks } from '../constants/nav-links';

@Component({
  selector: 'p-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SvgIconComponent,
    MainLogoComponent,
    RouterLink,
    TranslatePipe,
    RouterLinkActive
  ],
})
export class FooterComponent {
  @Output() openLoginModal = new EventEmitter();
  @Output() openCallbackModal = new EventEmitter();
  @Output() logOut = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

  navLinks = signal(navLinks);

  onOpenLoginModal(): void {
    this.openLoginModal.emit();
  }

  action(action?: string): void {
  }

  onLogout(): void {
    this.logOut.emit();
  }

  onCallClick(): void {
    this.openCallbackModal.emit();
  }

  onNavigate(route: string): void {
    this.navigate.emit(route);
  }

  onHeaderMenuAction(e: any): void {

  }
}
