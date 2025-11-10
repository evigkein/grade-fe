import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit, signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { _ROUTER } from '@shared/services/router.service';
import { _MODAL } from '@shared/ui/modules/modals/modals/modal.service';
import { scrollToTop } from '@shared/utils/helpers/scroll-to.util';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {getSettingsMenu} from './options.const';

@Component({
    selector: 'p-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccountEntryComponent implements OnInit {
  // user = USER();
  // users = _USER();
  router = _ROUTER();
  modal = _MODAL();
  options$ = of(getSettingsMenu(true))

  @ViewChild('modal') public modalRef!: TemplateRef<ElementRef>;
  menuModalId = signal<string>(null!);

  ngOnInit() {
    scrollToTop(0);
    if(this.router.url === '/settings') this.router.navigateByUrl('/settings/user')
  }

  manuAction(action: string): void {
    if(action === 'e-profile') this.router.navigateByUrl('/settings/e-profile');
    this.openMenu(true);
  }

  openMenu(isClose?: boolean): void {
    if(isClose) {
      this.modal.closeModal(this.menuModalId())
      this.menuModalId.set(null!);
      return;
    }
    const modalId = this.modal.openModal({templateRef: this.modalRef})!;
    this.menuModalId.set(modalId);
  }
}
