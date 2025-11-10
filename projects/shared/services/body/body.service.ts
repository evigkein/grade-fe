import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { isBrowser } from '../../utils/helpers/browser/is-browser.util';
import {BrowserService} from '../browser.service';

@Injectable({ providedIn: 'root' })
export class BodyService {
  isScrollDisabled = false;
  private bodyElement!: HTMLElement;
  private scrollTop!: number;
  private renderer!: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
  ) {
    if (isBrowser()) {
      this.renderer = rendererFactory.createRenderer(null, null);
      window!.document.body;
    }
  }

  handleScrollWithBlur(isDisable = false): void {
    this.handleScroll(isDisable);
    this.handleBlur(isDisable);
  }

  handleScroll(isDisabled: boolean): void {
    if ((isDisabled && this.isScrollDisabled) || !this.bodyElement) {
      return;
    }
    isDisabled ? this.disableScroll() : this.enableScroll();
  }

  handleBlur(isDisable: boolean): void {
    isDisable
      ? this.renderer.addClass(this.bodyElement, 'body-blur')
      : this.renderer.removeClass(this.bodyElement, 'body-blur');
  }

  private disableScroll(): void {
    window!.scrollY;
    this.renderer.addClass(this.bodyElement, 'disable-body-scrolling');
    this.renderer.setStyle(this.bodyElement, 'top', `${-this.scrollTop}px`);
  }

  private enableScroll(): void {
    this.renderer.removeClass(this.bodyElement, 'disable-body-scrolling');
    this.renderer.setStyle(this.bodyElement, 'top', `0`);
    window!.scroll(0, this.scrollTop);
    this.scrollTop = 0;
  }
}


//
// private _scroll() {
//   this.el.nativeElement.scrollIntoView({
//     block: 'center',
//     behavior: 'smooth',
//   });
// }
//
// private _disableScroll(): void {
//   this.body.classList.add('disable-body-scrolling');
// }
//
// private _enableScroll(): void {
//   this.body.classList.remove('disable-body-scrolling');
// }
