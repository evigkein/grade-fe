import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, ViewChild, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { _RS } from '@shared/services/router.service';
import { AlertModalComponent } from '@ui/modals/alert/alert-modal.component';
import { CallbackModalComponent } from '@ui/modals/callback/callback-modal.component';
import { _MODAL } from '@ui/modules/modals/modals/modal.service';
import { ModalsModule } from '@ui/modules/modals/modals/modal/modals.module';
import { destroy } from '@utils/libs/rxjs';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'p-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FooterComponent,
    RouterOutlet,
    HeaderComponent,
    ModalsModule,
  ],
})
export class LayoutComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  @ViewChild(CallbackModalComponent) callbackModal!: CallbackModalComponent;
  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent;

  callbackModalId = signal<string>(null!);
  private modal = _MODAL();

  destroy$ = destroy();
  private router = _RS();

  // private userService = inject(CurrentUserService);

  // user$ = this.userService.user$;

  openLoginModal(): void {
  }

  logout(): void {
  }

  navigate(route: string): void {
    this.router.router.navigate([`/${route}`]);
  }

  openCallbackModal(isClose = false): void {
    this.callbackModal.open();
    if (isClose) {
      this.callbackModal.closeCallbackModal();
      return;
    }
  }

  openAlertModal(): void {
    this.alertModal.open();
  }
}
