import {AfterViewInit, Directive, ElementRef, Renderer2, RendererFactory2} from '@angular/core';
import { NgControl } from '@angular/forms';

type InputType = 'text' | 'search' | 'email' | 'password';

@Directive({selector: '[formErrorsMatcher]', standalone: true,})
export class FormErrorMatcherDirective implements AfterViewInit {
  isAdded = false;
  mutationObserver!: MutationObserver;
  renderer!: Renderer2;

  constructor(
    private ngControl: NgControl,
    private el: ElementRef,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    const formControlName = this.ngControl.name?.toString();
    const element = this.el.nativeElement;
    const formControlElement = findChildElementWithFormControlNameOrId(this.el, formControlName!);

    if (formControlElement) {
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'class') {
            this.checkTouchedClass(element, formControlElement!);
          }
        });
      });

      this.mutationObserver.observe(element, { attributes: true });
    }
  }

  private checkTouchedClass(element: HTMLElement, elementToAdd: HTMLElement) {
    if (element?.classList.contains('ng-touched') && !this.isAdded) {
      this.isAdded = true;
      this.disconnect();
      this.renderer.addClass(elementToAdd, 'ng-dirty');
      this.renderer.addClass(elementToAdd, 'ng-touched');
    }
  }

  private disconnect(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null!;
    }
  }
}

function findChildElementWithFormControlNameOrId(parentElement: ElementRef, targetName: string): HTMLElement | null {
  for (const child of parentElement.nativeElement.children) {
    const childFormControlName = child.getAttribute('formControlName');
    const childId = child.getAttribute('id');

    if (childFormControlName === targetName || childId === targetName) {
      return child;
    }
  }

  return null;
}



// //
// hostDirectives: [
//   {
//     directive: TouchedDirtyDirective
//     // inputs: ['appTouchedDirtyObject: appTouchedDirty']
//   }
// ],

// if (!isFormValid(this.form) {
//
