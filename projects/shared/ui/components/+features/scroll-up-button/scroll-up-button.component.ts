import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef, inject, signal, numberAttribute, booleanAttribute,
} from '@angular/core';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { EVENTS } from '../../../../services/events/native-event.service';
import { isBrowser } from '@utils/helpers/browser/is-browser.util';
import { scrollToTitle } from '@utils/helpers/scroll-to.util';
import { destroy, skipEqual$ } from '@utils/libs/rxjs';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';

@Component({
  selector: 'p-scroll-up-button',
  templateUrl: './scroll-up-button.component.html',
  styleUrls: ['./scroll-up-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class ScrollUpButtonComponent implements AfterViewInit {
  @Input({transform: booleanAttribute}) isMobile!: boolean;
  @Input({transform: numberAttribute}) minScroll = 400;
  @Input({transform: numberAttribute}) minScrollMobile = 200;
  @Input() selector!: string;
  @Input() container?: HTMLElement;

  isHidden = signal(false);
  events = EVENTS();
  destroy$ = destroy();

  ngAfterViewInit(): void {
    if(!isBrowser()) return;

    this.events.scrollOffset$
      .pipe(
        map(offset => this.computeVisibility(offset)),
        skipEqual$(),
        tap((isHidden) => this.isHidden.set(isHidden)),
        this.destroy$(),
      )
      .subscribe();
  }

  scrollUp(): void {
    scrollToTitle(this.selector, this.container);
  }

  private computeVisibility(offset: number): boolean {
    const minPageYOffset = this.isMobile ? this.minScrollMobile : this.minScroll;
    return offset < minPageYOffset;
  }
}
