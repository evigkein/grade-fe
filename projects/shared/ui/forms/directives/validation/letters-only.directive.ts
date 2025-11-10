import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { _ELREF } from '@utils/angular/ng-api';
import { execCommand, ExecCommandEventsEnum, pasteTextFromClipboard } from '@utils/helpers/browser/exec-command';

@Directive({selector: '[lettersOnly]',standalone: true})
export class LettersOnlyDirective {
  @Input() isLettersOnlyEnabled = true;

  inputElement: HTMLElement

  el = _ELREF()

  constructor() {
    this.inputElement = this.el.nativeElement
  }

  numbers(value: any) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].some((number) => value.includes(number))
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if(!this.isLettersOnlyEnabled) {
      return;
    }

    // Ensure that it is a number
    if ((!e.ctrlKey || !e.metaKey) && this.numbers(e.key)) {
      e.preventDefault()
    } else {
      // let it happen, don't do anything
      return
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if(!this.isLettersOnlyEnabled) {
      return;
    }
    event.preventDefault();
    const pastedInput: string = event.clipboardData!
      .getData('text/plain')
      .replace(/[0-9]/g, '') // get a digit-only string
    execCommand(ExecCommandEventsEnum.insertText, pastedInput)
    pasteTextFromClipboard()// ??
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    if(!this.isLettersOnlyEnabled) {
      return;
    }

    event.preventDefault()
    const textData = event.dataTransfer!.getData('text').replace(/[0-9]/g, '')
    this.inputElement.focus()
    execCommand(ExecCommandEventsEnum.insertText, textData)
    // this.browser.pasteTextFromClipboard()// ??
  }
}
