import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AlertModalComponent } from '../../../modals/alert/alert-modal.component';
import { ModalWrapperComponent } from '../../../modules/modals/modal-wrapper/modal-wrapper.component';
import { CallbackFormComponent } from '../call-us-form/callback-form.component';

@Component({
  selector: 'p-callback-wrapper',
  templateUrl: './callback-modal-wrapper.component.html',
  styleUrls: ['./callback-modal-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AlertModalComponent,
    CallbackFormComponent,
    ModalWrapperComponent
  ],
})
export class CallbackModalWrapperComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  @ViewChild(ModalWrapperComponent) modal!: ModalWrapperComponent;
  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent;

  open(): void {
    this.modal.open();
  }

  openAlertModal(): void {
    this.modal.close();
    this.alertModal.open();
  }
}
