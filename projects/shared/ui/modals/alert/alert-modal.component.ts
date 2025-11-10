import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  TemplateRef, ViewChild
} from '@angular/core';
import { _MODAL } from '../../modules/modals/modals/modal.service';
import { ModalsModule } from '../../modules/modals/modals/modal/modals.module';

@Component({
  selector: 'p-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ModalsModule
  ],
})
export class AlertModalComponent {
  @Input() title = '';
  @Input() subTitle = '';
  @Input() buttonText = '';
  // @Input() title = signal<string>('');
  // @Input() subTitle = signal<string>('');

  @ViewChild('templateRef') templateRef!: TemplateRef<unknown>;

  modal = _MODAL();
  modalId = signal<string | null>(null);

  open(): void {
    const modalId = this.modal.openModal({ templateRef: this.templateRef })!;
    this.modalId.set(modalId);
  }

  close(): void {
    this.modal.closeModal(this.modalId());
    this.modalId.set(null);
  }

  constructor() {
    // effect(() => {
    //   if (this.title()) {
    //     console.log('message changed →', this.title());
    //   }
    // });
  }
}

// @ViewChild(AlertModalComponent) successModal!: AlertModalComponent;
