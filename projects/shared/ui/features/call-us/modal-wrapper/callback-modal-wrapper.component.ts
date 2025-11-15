import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AlertModalComponent } from '../../../modals/alert/alert-modal.component';
import { CallbackFormComponent } from '../call-us-form/callback-form.component';
import { CallbackModalComponent } from '../callback-modal/callback-modal.component';

@Component({
  selector: 'p-callback-wrapper',
  templateUrl: './callback-modal-wrapper.component.html',
  styleUrls: ['./callback-modal-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AlertModalComponent,
    CallbackModalComponent,
    CallbackFormComponent
  ],
})
export class CallbackModalWrapperComponent {
  @Input() AAAA!: string;
  @Output() AAAA2 = new EventEmitter();

  @ViewChild(CallbackModalComponent) callbackModal!: CallbackModalComponent;
  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent;

  open(): void {
    this.callbackModal.open();
  }

  openAlertModal(): void {
    this.callbackModal.close();
    this.alertModal.open();
  }
}
