import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Output } from '@angular/core';
import { StopEventsDirective } from '@shared/directives/utils';
import { _DEVICE } from '@shared/services/device/device.service';
import { ButtonComponent } from '@ui/components/button/button.component';
import { PhoneLinkComponent } from '@ui/features/phone-call/phone.component';
import { SmIconsComponent } from '@ui/features/sm-icons/sm-icons.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { HeaderRightComponent } from '../header/right/empty/header-right.component';

@Component({
  selector: 'p-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    HeaderRightComponent,
    StopEventsDirective,
    SvgIconComponent,
    NgIf,
    SmIconsComponent,
    PhoneLinkComponent,
    ButtonComponent
  ],
})
export class FooterComponent {
  @Output() openLoginModal = new EventEmitter();
  @Output() openCallbackModal = new EventEmitter();
  @Output() logOut = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

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
    this.openCallbackModal.emit();
  }

  onNavigate(route: string): void {
    this.navigate.emit(route)
  }

  onHeaderMenuAction(e: any): void {

  }
}
