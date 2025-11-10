import {inject, Injectable} from '@angular/core';
import { EMPTY, Observable, fromEvent } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';
import { isBrowser } from '../../utils/helpers/browser/is-browser.util';
import { filterNullish$ } from '../../utils/libs/rxjs/filter-nullish.rxjs.util';

import { EventThrottleService } from './event-throttle.service';

export function EVENTS(): NativeEventService {
  return inject(NativeEventService)
}

enum THROTTLES {
  SCROLL = 100,
  RESIZE = 300,
  MOUSEMOVE = 10,
}

@Injectable({ providedIn: 'root' })
export class NativeEventService {
  scroll$: Observable<Document> = EMPTY;
  resize$: Observable<Window> = EMPTY;

  scrollOffset$: Observable<number> = EMPTY;

  private throttleService = inject(EventThrottleService);

  constructor() {
    if (!isBrowser()) return;
    this.scroll$ = this.initScroll;
    this.resize$ = this.initResize;
    this.scrollOffset$ = this.scroll$.pipe(filterNullish$(), map(doc => doc?.scrollingElement?.scrollTop || 0));
  }

  private get initScroll(): Observable<Document> {
    return this.throttleService.throttleEvent(this.documentScroll$, THROTTLES.SCROLL).pipe(shareReplay(1));
  }

  private get initResize(): Observable<Window> {
    return this.throttleService.throttleEvent(this.windowResize$, THROTTLES.RESIZE).pipe(shareReplay(1))
  }

  private get documentScroll$(): Observable<Document> {
    return fromEvent(document, 'scroll', { passive: true }).pipe(
      map(e => e.target as Document),
      startWith(document)
    ) as Observable<Document>;
  }

  private get windowResize$(): Observable<Window> {
    return fromEvent(window, 'resize', { passive: true }).pipe(
      map(e => e.target as Window),
      startWith(window)
    ) as Observable<Window>;
  }
}
