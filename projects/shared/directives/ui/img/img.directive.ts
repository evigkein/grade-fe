import { Directive, ElementRef, OnInit, OnChanges, Renderer2, booleanAttribute, numberAttribute, input } from '@angular/core';
import { transformGithubAssetsUrl } from '../../../interceptors/cdn.interceptor';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { destroy } from '@utils/libs/rxjs';
import { computed } from '@angular/core';
import { ISimpleChanges } from '@utils/types';

@Directive({selector: '[img]'})
export class CustomImageDirective implements OnInit, OnChanges {
  img = input.required<string>();
  defaultImage = input('no-image.png');
  errorImage = input('no-image.png');
  priorityImage = input(true);
  fill = input(true);
  width = input<number | undefined>(undefined);
  height = input<number | undefined>(undefined);
  forceLoad = input(false, { transform: booleanAttribute });
  isAsset = input(true);
  disableIOSPreview = input(true, { transform: booleanAttribute });

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  destroy$ = destroy();

  private cdnPrefix = 'https://dp6w21h2w0g5y.cloudfront.net/';
  private imageUrlStart = '../assets/images/';
  private observer!: IntersectionObserver;

  private finalSrc = computed(() => this.getImageUrl(this.img()));

  constructor(private el: ElementRef<HTMLImageElement>, private renderer: Renderer2) {
    if (!isBrowser()) {
      this.loadImage();
      return;
    }

    this.observer = new IntersectionObserver(entries => {
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

    if (this.isAsset()) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.finalSrc());
      this.renderer.setAttribute(this.el.nativeElement, 'loading', 'lazy');
      this.renderer.setAttribute(this.el.nativeElement, 'decoding', 'async');
    } else {
      if (this.forceLoad()) {
        this.loadImage();
      } else {
        this.setImage(this.getImageUrl(this.defaultImage()));
        this.observer.observe(this.el.nativeElement);
      }
    }

    if (this.disableIOSPreview()) this.hardenIOS();
  }

  ngOnChanges(changes: ISimpleChanges<CustomImageDirective>) {
    if (!isBrowser()) return;
    if (!changes.img?.isFirstChange()) this.loadImage();
  }

  private setDefaultAttributes() {
    if (!this.width() && !this.height()) {
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'object-fit', 'cover');
    }

    if (this.priorityImage()) {
      this.renderer.setAttribute(this.el.nativeElement, 'fetchpriority', 'high');
    }

    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', String(this.tabindex()));
    this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'true');
  }

  private hardenIOS() {
    if (!isBrowser()) return;

    const el = this.el.nativeElement;
    this.renderer.setStyle(el, '-webkit-touch-callout', 'none');
    this.renderer.setStyle(el, '-webkit-user-select', 'none');
    this.renderer.setStyle(el, 'user-select', 'none');
    this.renderer.setStyle(el, '-webkit-user-drag', 'none');
    this.renderer.setStyle(el, 'pointer-events', 'none');
  }

  private loadImage() {
    if (!isBrowser() || !this.img()) return;

    const src = this.finalSrc();
    const img = new Image();
    img.src = src;
    img.onload = () => this.setImage(src);
    img.onerror = () => this.setImage(this.getImageUrl(this.errorImage()));
  }

  private setImage(src: string) {
    if (!isBrowser()) return;
    this.renderer.setAttribute(this.el.nativeElement, 'src', src);
  }

  private getImageUrl(url: string): string {
    if (!isBrowser()) {
      if (this.isAsset()) {
        const clean = url || this.defaultImage();
        return clean.startsWith(this.imageUrlStart)
          ? clean
          : `${this.imageUrlStart}${clean}`;
      }
      return url || '';
    }

    if (!url) {
      return this.isAsset()
        ? transformGithubAssetsUrl(`${this.imageUrlStart}${this.defaultImage()}`)
        : `${this.cdnPrefix}${this.defaultImage()}`;
    }

    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    if (!this.isAsset()) return `${this.cdnPrefix}${url}`;

    const assetUrl = url.startsWith(this.imageUrlStart)
      ? url
      : `${this.imageUrlStart}${url}`;

    return transformGithubAssetsUrl(assetUrl);
  }
}
