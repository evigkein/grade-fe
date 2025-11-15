import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomImageDirective } from '@shared/directives/ui/img/priority.directive';
import { StopEventsDirective } from '@shared/directives/utils';
import { ButtonComponent } from '@ui/components/button/button.component';
import { ChangeLanguageComponent } from '@ui/features/choose-lang/change-language.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { headerLinks } from '../constants/header-links';

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
    SvgIconComponent,
    StopEventsDirective,
    ButtonComponent,
    ChangeLanguageComponent,
    CustomImageDirective,
  ],
})
export class HeaderComponent {
  @Output() openLoginModal = new EventEmitter();
  @Output() logOut = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();
  @Output() openCallbackModal = new EventEmitter();

  headerLinks = signal(headerLinks);

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
