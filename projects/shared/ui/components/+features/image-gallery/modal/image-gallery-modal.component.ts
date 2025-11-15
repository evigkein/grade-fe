import {
  Component,
  ElementRef,
  effect,
  signal,
  TemplateRef,
  ViewChild, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomImageDirective } from '../../../../../directives/ui/img/priority.directive';
import { _MODAL } from '../../../../modules/modals/modals/modal.service';
import { ModalsModule } from '../../../../modules/modals/modals/modal/modals.module';
import { TButtonType } from '../../../button/button.component';
import { _IMAGE_GALLERY } from '../image-gallery.service';

@Component({
  selector: 'p-image-gallery-modal',
  templateUrl: './image-gallery-modal.component.html',
  styleUrls: ['./image-gallery-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, CustomImageDirective, ModalsModule],
})
export class ImageGalleryModalComponent {
  @ViewChild('galleryModal') galleryModalRef!: TemplateRef<ElementRef>;
  modal = _MODAL();
  modalId = signal<string | null>(null);

  gallery = _IMAGE_GALLERY();

  images = signal<string[]>([]);
  title = signal<string>('Image');
  fullScreen = signal<boolean>(false);
  submitText = signal<string>('');
  cancelText = signal<string>('');
  submitType: TButtonType = 'primary';
  cancelType: TButtonType = 'warn';
  imgWidth?: number;
  imgHeight?: number;

  dataChange = effect(() => {
    const data = this.gallery.data;
    if (data) {
      this.images.set(data.images);
      this.title.set(data.title!);
      this.fullScreen.set(data.fullScreen!);
      this.submitText.set(data.submitText!);
      this.cancelText.set(data.cancelText!);
      this.openModal();
    } else {
      this.closeModal();
    }
  });

  openModal(): void {
    // Если модалка уже открыта, повторно не открываем
    if (!this.modalId()) {
      const id = this.modal.openModal({ templateRef: this.galleryModalRef });
      this.modalId.set(id!);
    }
  }

  closeModal(): void {
    if (this.modalId()) {
      this.modal.closeModal(this.modalId()!);
      this.modalId.set(null);
    }
  }

  onSubmit(): void {
    this.closeModal();
    this.gallery.close();
  }

  onClosed(): void {
    this.closeModal();
    this.gallery.close();
  }
}
