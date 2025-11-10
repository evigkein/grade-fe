import { booleanAttribute, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { _ELREF } from '@utils/angular/ng-api';
import { execCommand, ExecCommandEventsEnum } from '@utils/helpers/browser/exec-command';

@Directive({selector: '[noSymbols]', standalone: true})
export class NoSymbolsDirective {
  @Input({transform: booleanAttribute}) isNoSymbolsEnabled = true;

  private allowedCharacters = /^[\p{L}\p{N}\s&-]+$/u;

  inputElement: HTMLElement;
  el = _ELREF();

  constructor() {
    this.inputElement = this.el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (!this.isNoSymbolsEnabled) {
      return;
    }

    const key = e.key;

    if (!this.allowedCharacters.test(key) && !this.isNavigationKey(e)) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (!this.isNoSymbolsEnabled) {
      return;
    }

    event.preventDefault();
    const pastedInput: string = event.clipboardData!
      .getData('text/plain')
      .replace(/[^a-zA-Z0-9\s&-]/g, ''); // Удаляем все символы, кроме разрешённых
    execCommand(ExecCommandEventsEnum.insertText, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    if (!this.isNoSymbolsEnabled) {
      return;
    }

    event.preventDefault();
    const textData = event.dataTransfer!.getData('text').replace(/[^a-zA-Z0-9\s&-]/g, '');
    this.inputElement.focus();
    execCommand(ExecCommandEventsEnum.insertText, textData);
  }

  private isNavigationKey(e: KeyboardEvent): boolean {
    const navigationKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    return navigationKeys.includes(e.key);
  }
}
