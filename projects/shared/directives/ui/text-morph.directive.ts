import { Directive, ElementRef, input, effect } from '@angular/core';
import gsap from 'gsap';
import SplitType from 'split-type';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';

@Directive({selector: '[textMorph]', standalone: true })
export class TextMorphDirective {
  textMorph = input('');
  private currentText = '';

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      if (!isBrowser()) return;
      const newText = this.textMorph();
      if (newText === this.currentText) return;

      const elNative = this.el.nativeElement;
      this.currentText = newText;

      const tl = gsap.timeline();

      const oldSplit = new SplitType(elNative, { types: 'chars' });
      tl.to(oldSplit.chars, {
        y: -20,
        opacity: 0,
        stagger: 0.02,
        duration: 0.2,
        onComplete: () => {
          oldSplit.revert();
          elNative.textContent = newText;

          const newSplit = new SplitType(elNative, { types: 'chars' });
          gsap.from(newSplit.chars, {
            y: 20,
            opacity: 0,
            stagger: 0.02,
            duration: 0.3,
          });
        },
      });
    });
  }
}
