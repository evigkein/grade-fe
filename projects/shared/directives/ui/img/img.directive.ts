import { booleanAttribute, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { transformGithubAssetsUrl } from '../../../interceptors/cdn.interceptor';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { ISimpleChanges } from '@utils/types';

@Directive({ selector: '[img]', standalone: true })
export class CustomImageDirective implements OnInit, OnChanges {
  @Input({ required: true }) img!: string;
  @Input() defaultImage = '../assets/images/no-image.png';
  @Input() errorImage = '../assets/images/no-image.png';
  @Input() priorityImage = true;
  @Input() fill = true;
  @Input() width?: number;
  @Input() height?: number;
  @Input({ transform: booleanAttribute }) forceLoad = false;

  @Input() isAsset = true;

  @Input({ transform: booleanAttribute }) disableIOSPreview = true;

  cdnPrefix = 'https://dp6w21h2w0g5y.cloudfront.net/';
  imageUrlStart = '../assets/images/';

  private observer!: IntersectionObserver;
  private removeListeners: Array<() => void> = [];

  constructor(private el: ElementRef<HTMLImageElement>, private renderer: Renderer2) {
    if (!isBrowser()) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.unobserve(entry.target);
        }
      });
    });
  }

  ngOnInit() {
    this.setDefaultAttributes();

    if (this.isAsset) {
      const src = this.getImageUrl(this.img);
      this.renderer.setAttribute(this.el.nativeElement, 'src', src);
      this.renderer.setAttribute(this.el.nativeElement, 'loading', 'lazy');
      this.renderer.setAttribute(this.el.nativeElement, 'decoding', 'async');
    } else {
      if (this.forceLoad) {
        this.loadImage();
      } else {
        this.setImage(this.defaultImage);
        this.observer.observe(this.el.nativeElement);
      }
    }

    if (this.disableIOSPreview) this.hardenIOS();
  }

  ngOnChanges(changes: ISimpleChanges<CustomImageDirective>) {
    if (!isBrowser()) return;
    if (!changes.img?.isFirstChange()) this.loadImage();
  }

  private setDefaultAttributes() {
    if (!this.width && !this.height) {
      this.fill = true;
      this.priorityImage = true;
    }

    if (this.fill) {
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'object-fit', 'cover'); // можно вернуть
    }

    if (this.priorityImage) {
      this.renderer.setAttribute(this.el.nativeElement, 'fetchpriority', 'high');
    }

    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
    this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'true'); // если картинка декоративная
  }

  private hardenIOS() {
    if (!isBrowser()) return;

    this.renderer.setStyle(this.el.nativeElement, '-webkit-touch-callout', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-webkit-user-select', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-webkit-user-drag', 'none');

    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');

    const ts = this.renderer.listen(this.el.nativeElement, 'touchstart', (e: TouchEvent) => e.preventDefault());
    const td = this.renderer.listen(this.el.nativeElement, 'touchend',   (e: TouchEvent) => e.preventDefault());
    const gs = this.renderer.listen(this.el.nativeElement, 'gesturestart', (e: Event) => e.preventDefault());
    const db = this.renderer.listen(this.el.nativeElement, 'dblclick', (e: MouseEvent) => e.preventDefault());

    this.removeListeners.push(ts, td, gs, db);
  }

  private loadImage() {
    if (!isBrowser() || !this.img) return;

    const img = new Image();
    const src = this.getImageUrl(this.img);
    img.src = src;
    img.onload = () => this.setImage(src);
    img.onerror = () => this.setImage(this.errorImage);
  }

  private setImage(src: string) {
    if (!isBrowser()) return;
    this.renderer.setAttribute(this.el.nativeElement, 'src', src);
  }

  private getImageUrl(url: string): string {
    let finalUrl: string;
    if (url.startsWith('http')) finalUrl = url;
    else if (!this.isAsset) finalUrl = `${this.cdnPrefix}${this.img}`;
    else finalUrl = url.startsWith(this.imageUrlStart) ? url : `${this.imageUrlStart}${url}`;
    return transformGithubAssetsUrl(finalUrl);
  }
}
