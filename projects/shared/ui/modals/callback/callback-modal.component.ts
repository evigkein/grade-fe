import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output, signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CallbackFormComponent } from '../../../features/call-us/call-us-modal/callback-form.component';
import { _MODAL } from '../../modules/modals/modals/modal.service';
import { ModalsModule } from '../../modules/modals/modals/modal/modals.module';
import { AlertModalComponent } from '../alert/alert-modal.component';

@Component({
  selector: 'p-callback-modal',
  templateUrl: './callback-modal.component.html',
  styleUrls: ['./callback-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CallbackFormComponent,
    ModalsModule,
    AlertModalComponent
  ],
})
export class CallbackModalComponent {
  @ViewChild('templateRef', { static: true }) templateRef!: TemplateRef<ElementRef>;

  @Output() submitted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private modal = _MODAL();
  modalId = signal<string | null>(null);

  open(): void {
    const id = this.modal.openModal({ templateRef: this.templateRef })!;
    this.modalId.set(id);
  }

  close(): void {
    if (this.modalId()) {
      this.modal.closeModal(this.modalId());
      this.modalId.set(null);
      this.closed.emit();
    }
  }

  closeCallbackModal(): void {
    this.canceled.emit();
    this.close();
  }

  handleSubmit(): void {
    this.submitted.emit();
    this.close();
  }
}
