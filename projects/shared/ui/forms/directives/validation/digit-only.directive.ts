import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { _ELREF } from '@utils/angular/ng-api';
import {
  isSpecialKeyboardCombination,
  keyboardEventsEnum,
  navigationKeyboardKeys
} from '@utils/constants/DOM/keyboard-events';
import { execCommand, ExecCommandEventsEnum } from '@utils/helpers/browser/exec-command';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { getOnlyNumbersString, onlyDigitsRegExp } from '../../validators/validation-patterns';

@Directive({ selector: '[digitsOnly]', standalone: true })
export class DigitOnlyDirective {
  @Input() isDigitsOnlyEnabled = true;
  @Input() hasDecimal = false;

  private decimalCounter = 0;
  inputElement: HTMLElement;

  private el = _ELREF();

  constructor(@Optional() private control: NgControl) {
    this.inputElement = this.el.nativeElement;
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(e: KeyboardEvent) {
    if (!this.isDigitsOnlyEnabled) {
      return;
    }

    if (
      navigationKeyboardKeys.includes(e.key as any) || // Allow: navigation keys: backspace, delete, arrows etc.
      isSpecialKeyboardCombination(e) ||
      (this.hasDecimal && e.key === '.' && this.decimalCounter < 1) // Allow: only one decimal point
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('keyup', [ '$event' ])
  public onKeyUp(event: KeyboardEvent) {
    if (!this.isDigitsOnlyEnabled) {
      return;
    }

    if (!this.hasDecimal) {
      return;
    } else {
      this.decimalCounter = this.control.value.split('.').length - 1;
    }
  }

  @HostListener('paste', [ '$event' ])
  onPaste(event: ClipboardEvent) {
    if (!this.isDigitsOnlyEnabled || !event) {
      return;
    }

    event.preventDefault();
    const pastedInput: string = event.clipboardData!
      .getData('text/plain')
      .replace(onlyDigitsRegExp, ''); // get a digit-only string
    execCommand(ExecCommandEventsEnum.insertText, pastedInput);
  }

  @HostListener('drop', [ '$event' ])
  onDrop(event: DragEvent) {
    if (!this.isDigitsOnlyEnabled) {
      return;
    }
    const textData = event.dataTransfer!.getData('text');
    this.inputElement.focus();

    this.handleEvents(event, textData);
  }

  private handleEvents(event: ClipboardEvent | DragEvent, value: string) {
    if(!isBrowser()) return;
    const pasted = this.insertText(value, this.hasDecimal);

    if (pasted) {
      event.preventDefault();
    } else {
      if (navigator.clipboard) {
        navigator!.clipboard.writeText(value);
        execCommand(ExecCommandEventsEnum.paste);
      }
    }
  }

  private isValidDecimal(string: string): boolean {
    return string.split('.').length <= 2;
  }

  private insertText(value: string, hasDecimal = false): boolean {
    return execCommand(ExecCommandEventsEnum.insertText, getOnlyNumbersString(value, hasDecimal));
  }
}
