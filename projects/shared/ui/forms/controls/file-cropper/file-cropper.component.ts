import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, ViewChild } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, OutputFormat } from 'ngx-image-cropper';
import { ModalWrapperComponent } from '../../../modules/modals/modal-wrapper/modal-wrapper.component';
import { FileInputComponent } from '../file-input/file-input.component';

@Component({
  selector: 'p-file-cropper',
  templateUrl: './file-cropper.component.html',
  styleUrl: './file-cropper.component.scss',
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [ImageCropperComponent, ReactiveFormsModule, FileInputComponent, CommonModule, ModalWrapperComponent],
})
export class FileCropperComponent {
  @Input() formArray!: FormArray;
  @Input() aspectRatio = 1;
  @Input() resizeToWidth = 300;
  @Input() format: OutputFormat = 'png';
  @Output() save = new EventEmitter<Blob>();
  @Output() cancel = new EventEmitter<Blob>();
  @ViewChild('cropModal') cropModal!: ModalWrapperComponent;

  imageChangedEvent: Event | null = null;
  imageEvent: Event | null = null;
  croppedImagePreview: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  onImageChanged(event: Event) {
    this.imageEvent = event;
    this.cropModal.open();
  }

  onFileUploaded(files: FileList): void {
    // if (!files.length) return;
    //
    // this.imageEvent = { target: { files } } as any as Event;
    // this.imageChangedEvent.set({ target: { files: [file] } } as any as Event);
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImagePreview = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    const croppedBlob = event.blob!;
    this.formArray.clear();
    this.formArray.push(new FormControl(croppedBlob));
    // this.save.emit(croppedBlob);
  }

  loadImageFailed(): void {
    console.log('failed');
    this.imageChangedEvent = null;
    this.croppedImagePreview = '';
  }

  imageLoaded() {
    console.log('LOADED');
  }
  cropperReady() {
    console.log('ready');
  }

  saveCroppedImage(): void {
    this.save.emit();
    console.log('Image saved:', this.imageEvent);
  }

  onCancel(): void {
    this.croppedImagePreview = '';
    this.cancel.emit()
  }
}
