import { inject, Injectable, signal } from '@angular/core';

interface ImageGalleryConfig {
  images: string[];
  title?: string;
  fullScreen?: boolean;
  submitText?: string;
  cancelText?: string;
}

export function _IMAGE_GALLERY(): ImageGalleryService {
  return inject(ImageGalleryService)
}

@Injectable({providedIn: 'root'})
export class ImageGalleryService {
  private readonly galleryData = signal<ImageGalleryConfig | null>(null, {});

  get data() {
    return this.galleryData();
  }

  open(config: ImageGalleryConfig): void {
    this.galleryData.set({
      images: config.images || [],
      title: config.title,
      fullScreen: !!config.fullScreen,
      submitText: config.submitText || '',
      cancelText: config.cancelText || ''
      // ...
    });
  }

  close(): void {
    this.galleryData.set(null);
  }
}
