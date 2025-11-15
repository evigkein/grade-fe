import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, ViewChild, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StickyDirective } from '@shared/directives/ui/sticky.directive';
import { _RS } from '@shared/services/router.service';
import {
  ScrollToTopButtonComponent
} from '@ui/components/+features/sctoll-to-top-button/scroll-to-top-button.component';
import { CallbackModalWrapperComponent } from '@ui/features/call-us/modal-wrapper/callback-modal-wrapper.component';
import { AlertModalComponent } from '@ui/modals/alert/alert-modal.component';
import { CallbackModalComponent } from '@ui/features/call-us/callback-modal/callback-modal.component';
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
    CallbackModalWrapperComponent,
    ScrollToTopButtonComponent,
  ],
})
export class LayoutComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  @ViewChild(CallbackModalWrapperComponent) callbackModal!: CallbackModalWrapperComponent;

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
  }
}
