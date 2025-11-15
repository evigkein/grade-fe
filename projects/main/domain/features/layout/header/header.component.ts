import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangeLanguageComponent } from '@ui/features/choose-lang/change-language.component';
import { MainLogoComponent } from '@ui/features/logo/main-logo.component';
import { navLinks } from '../constants/nav-links';

@Component({
  selector: 'p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    ChangeLanguageComponent,
    RouterLinkActive,
    MainLogoComponent,
  ],
})
export class HeaderComponent {
  @Output() openLoginModal = new EventEmitter();
  @Output() logOut = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();
  @Output() openCallbackModal = new EventEmitter();

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
