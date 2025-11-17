import { Directive, HostListener, input } from '@angular/core';
import { _NOTIFY } from '@ui/modules/notifications/notification.service';
import { copyText } from '@utils/helpers/browser/window.util';

@Directive({selector: '[copy]', standalone: true})
export class CopyDirective {
  copy = input('');
  saveText = input('');

  private notify = _NOTIFY();

  @HostListener('click')
  onClick() {
    const text = this.saveText();
    if (!text) return;
    copyText(text);
    this.notify.showSuccess(text, 'copied', {icon: 'copy'});
  }
}
