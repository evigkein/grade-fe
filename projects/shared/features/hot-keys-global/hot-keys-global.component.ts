import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { _TRANSLATE } from '@core/modules/translate';
import { isSSR } from '@utils/helpers/browser/is-browser.util';
import { _KEYBOARD } from '@services/events/keyboard.service';

@Component({
  selector: 'p-hot-keys-global',
  templateUrl: './hot-keys-global.component.html',
  styleUrls: ['./hot-keys-global.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class HotKeysGlobalComponent {
  private keyboard = _KEYBOARD();
  private lang = _TRANSLATE();

  constructor() {
    effect(() => {
      if (this.keyboard.hotkeyEvent() === 'CTRL_L') {
        this.toggleLanguage();
      }
    });
  }

  toggleLanguage() {
    if(isSSR()) return;
    const next = this.lang.lang() === 'ru' ? 'en' : 'ru';

    document.startViewTransition?.(() => {
      this.lang.setLanguage(next);
    }) ?? this.lang.setLanguage(next);
  }
}
