import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, computed,
  EventEmitter,
  Output
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { StopEventsDirective } from '@shared/directives/utils';
import { SkipHydrationDirective } from '@shared/directives/utils/skip-hydration.directive';
import { _DEVICE } from '@shared/services/device/device.service';
import { ButtonComponent } from '@ui/components/button/button.component';
import { ActionsMenuComponent } from '@ui/components/features/actions-menu/actions-menu.component';
import { PhoneLinkComponent } from '@ui/features/phone-call/phone.component';
import { SmIconsComponent } from '@ui/features/sm-icons/sm-icons.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { HeaderRightComponent } from './right/empty/header-right.component';

@Component({
  selector: 'p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIf,
    AsyncPipe,
    ButtonComponent,
    SvgIconComponent,
    PhoneLinkComponent,
    SmIconsComponent,
    StopEventsDirective,
    ActionsMenuComponent,
    SkipHydrationDirective,
    HeaderRightComponent,
  ],
})
export class HeaderComponent {
  @Output() openLoginModal = new EventEmitter();
  @Output() logOut = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();
  @Output() openCallbackModal = new EventEmitter();

  deviceService = _DEVICE();
  currentWidth = this.deviceService.currentWidth;
  isDesktopImg = computed(() => this.deviceService.currentWidth() > 950);

  onOpenLoginModal(): void {
    this.openLoginModal.emit();
  }

  action(action?: string): void {
  }

  onLogout(): void {
    this.logOut.emit();
  }

  onCallClick(): void {
    this.openCallbackModal.emit()
  }

  onNavigate(route: string): void {
    this.navigate.emit(route)
  }

  onHeaderMenuAction(e: any): void {

  }

}
