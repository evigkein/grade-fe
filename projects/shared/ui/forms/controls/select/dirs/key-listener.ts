import { Directive, EventEmitter, HostListener, output, Output } from '@angular/core';

@Directive({
  selector: '[pKeypress]',
  standalone: true,
})
export class PKeypressDirective {
  pKeypress = output<KeyboardEvent>();

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    this.pKeypress.emit(e);
  }
}
