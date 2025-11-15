import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  signal,
  input, computed
} from '@angular/core';

import { destroy } from '@utils/libs/rxjs';
import { isSSR } from '@utils/helpers/browser/is-browser.util';
import { scrollToTop } from '@utils/helpers/scroll-to.util';
import { _SCROLL } from '../../../../services/events/scroll.service';

@Component({
  selector: 'p-scroll-to-top-button',
  templateUrl: './scroll-to-top-button.component.html',
  styleUrls: ['./scroll-to-top-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ScrollToTopButtonComponent {
  private scroll = _SCROLL();

  threshold = input<number>(1000);
  isVisible = computed(() => this.scroll.scrollY() > this.threshold());

  destroy$ = destroy();

  scrollToTop(): void {
    if (isSSR()) return;
    scrollToTop(1000);
  }
}
