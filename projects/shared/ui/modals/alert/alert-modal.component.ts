import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  input,
  signal,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalWrapperComponent } from '../../modules/modals/modal-wrapper/modal-wrapper.component';
import { _MODAL } from '../../modules/modals/modals/modal.service';
import { ModalsModule } from '../../modules/modals/modals/modal/modals.module';
import { destroy } from '@utils/libs/rxjs';

@Component({
  selector: 'p-alert-modal',
  standalone: true,
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalsModule, TranslatePipe, ModalWrapperComponent],
})
export class AlertModalComponent {
  destroy$ = destroy();

  titleText = input.required<string>();
  subTitle = input.required<string>();
  buttonText = input('OK');

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  @ViewChild(ModalWrapperComponent) modal!: ModalWrapperComponent;

  modalId = signal<string | null>(null);

  open(): void {
    this.modal.open();
  }

  close(): void {
    this.modal.close();
  }
}


// @ViewChild(AlertModalComponent) successModal!: AlertModalComponent;
