import { Directive, HostListener, Input } from '@angular/core';
import { _NOTIFY } from '../../../ui/modules/notifications/notification.service';
import { copyText } from '../../../utils/helpers/browser/window.util';

@Directive({selector: '[copy]', standalone: true})
export class CopyDirective {
  @Input() copy!: string;
  @Input() saveText!: string;

  private notify = _NOTIFY();

  @HostListener('click')
  onClick() {
    if (!this.saveText) return;
    copyText(this.saveText);
    this.notify.showSuccess(this.saveText, 'copied', {icon: 'copy'});
  }
}
