import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject, Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';

/**
 * Директива предназначена для ограничения перемещения клавишей TAB
 * в пределах элемента, на который она навешана
 */
@Directive({selector: '[tabTrap]', standalone: true})
export class TabTrapDirective implements OnInit, OnDestroy {
  private readonly HIDDEN_STYLE = `
    position: absolute;
    left: 0;
    display: block;
    width: 1px;
    height: 1px;
    opacity: 0;
    cursor: none;
    font-size: 1.6rem;
  `;
  private readonly HIDDEN_STYLE_BEFORE = `${this.HIDDEN_STYLE}top:0;`;
  private readonly HIDDEN_STYLE_AFTER = `${this.HIDDEN_STYLE}bottom:0;`;
  private readonly _isBrowser: boolean;
  private _unsubscribers: Array<() => void> = [];
  private _gateBefore!: HTMLInputElement;
  private _gateAfter!: HTMLInputElement;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: never,
    @Inject(DOCUMENT) private _document: Document,
    private _elementRef: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
  ) {
    this._isBrowser = isBrowser();
  }

  ngOnInit(): void {
    this._isBrowser && this._initTrap();
  }

  ngOnDestroy(): void {
    this._unsubscribers.forEach((un) => un());
  }

  private _isChild(node: Element, parent: Element): boolean {
    let isChild = false;
    let _node = node;

    while (Boolean(_node) && _node.tagName.toUpperCase() !== 'BODY') {
      if (_node === parent) {
        isChild = true;
        break;
      }

      _node = this._renderer.parentNode(_node);
    }

    return isChild;
  }

  private _initTrap(): void {
    const hostElement = this._elementRef.nativeElement;
    const parent = this._renderer.parentNode(hostElement);
    const nextSibling = this._renderer.nextSibling(hostElement);

    this._gateBefore = this._createInput('before');
    this._gateAfter = this._createInput('after');

    this._renderer.insertBefore(parent, this._gateBefore, hostElement);
    this._renderer.insertBefore(parent, this._gateAfter, nextSibling);

    const un = this._renderer.listen(
      'window',
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key?.toUpperCase() !== 'TAB') {
          return;
        }

        const isActiveChild = this._isChild(
          this._document.activeElement!,
          hostElement,
        );

        this._moveGates(!isActiveChild);
      },
    );

    this._unsubscribers.push(un);
  }

  private _createInput(position: 'after' | 'before'): HTMLInputElement {
    const input = this._renderer.createElement('input') as HTMLInputElement;
    const handler = this._getTabOutHandler();
    const un = this._renderer.listen(input, 'focus', handler);
    let style = '';

    switch (position) {
      case 'after':
        style = this.HIDDEN_STYLE_AFTER;
        break;
      case 'before':
        style = this.HIDDEN_STYLE_BEFORE;
        break;
      default:
        break;
    }

    this._renderer.setAttribute(input, 'style', style);
    this._unsubscribers.push(un);

    return input;
  }

  private _getTabOutHandler() {
    const hostElement = this._elementRef.nativeElement;

    return (e: FocusEvent & any) => {
      requestAnimationFrame(() => {
        const relatedTarget = e.relatedTarget || e.fromElement;
        const gatesTrapped =
          e.target === this._gateBefore || e.target === this._gateAfter;

        if (gatesTrapped && this._isChild(relatedTarget, hostElement)) {
          e.preventDefault();
          relatedTarget.focus();
        }
      });
    };
  }

  private _moveGates(isOpen: boolean): void {
    [this._gateBefore, this._gateAfter].forEach((gate) => {
      this._renderer.setAttribute(gate, 'tabindex', isOpen ? '-1' : '0');
    });
  }
}
