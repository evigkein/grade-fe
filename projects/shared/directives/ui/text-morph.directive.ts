import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import gsap from 'gsap';
import SplitType from 'split-type';
import { isBrowser } from '../../utils/helpers/browser/is-browser.util';

@Directive({selector: '[textMorph]', standalone: true })
export class TextMorphDirective implements OnChanges {
  @Input() textMorph: string = '';

  private currentText = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(!isBrowser()) return;
    if (!changes['textMorph'] || this.textMorph === this.currentText) return;

    const el = this.el.nativeElement;
    const newText = this.textMorph;
    const oldText = this.currentText;
    this.currentText = newText;

    const tl = gsap.timeline();

    const oldSplit = new SplitType(el, { types: 'chars' });
    tl.to(oldSplit.chars, {
      y: -20,
      opacity: 0,
      stagger: 0.02,
      duration: 0.2,
      onComplete: () => {
        oldSplit.revert();
        el.textContent = newText;

        const newSplit = new SplitType(el, { types: 'chars' });
        gsap.from(newSplit.chars, {
          y: 20,
          opacity: 0,
          stagger: 0.02,
          duration: 0.3,
        });
      },
    });
  }
}
