import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MainLogoComponent } from '@ui/features/logo/main-logo.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SvgIconComponent,
    MainLogoComponent
  ],
})
export class FooterComponent {
  @Output() openLoginModal = new EventEmitter();
  @Output() openCallbackModal = new EventEmitter();
  @Output() logOut = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

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
