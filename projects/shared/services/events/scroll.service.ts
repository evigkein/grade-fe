import { computed, inject, Injectable, signal } from '@angular/core';
import { isSSR } from '@utils/helpers/browser/is-browser.util';
import { destroy } from '@utils/libs/rxjs';
import { fromEvent } from 'rxjs';
import { auditTime, map, pairwise, startWith, tap } from 'rxjs/operators';

type ScrollDirection = 'up' | 'down' | 'none';

interface ScrollSample {
  y: number;
  t: number;
}

export function _SCROLL(): ScrollService {
  return inject(ScrollService)
}

@Injectable({providedIn: 'root'})
export class ScrollService {

  readonly scrollY = signal(0);
  readonly scrollDirection = signal<ScrollDirection>('none');
  readonly scrollSpeed = signal(0);
  readonly scrollProgress = signal(0);
  readonly nearTop = computed(() => this.scrollY() <= 80);
  readonly nearBottom = computed(() => {
    if (isSSR()) return false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return false;
    return max - this.scrollY() <= 120;
  });

  private destroy$ = destroy();

  constructor() {
    if (isSSR()) return;

    fromEvent(window, 'scroll', {passive: true})
      .pipe(
        auditTime(16),
        map<unknown, ScrollSample>(() => ({
          y: window.scrollY || document.documentElement.scrollTop || 0,
          t: performance.now(),
        })),
        startWith<ScrollSample>({
          y: window.scrollY || 0,
          t: performance.now(),
        }),
        pairwise(),
        tap(([prev, curr]) => {
          const dy = curr.y - prev.y;
          const dt = (curr.t - prev.t) || 16;
          const speed = Math.abs(dy) / (dt / 1000);

          const dir: ScrollDirection =
            dy > 0 ? 'down' :
              dy < 0 ? 'up' :
                this.scrollDirection();

          const y = curr.y;

          this.scrollY.set(y);
          this.scrollDirection.set(dir);
          this.scrollSpeed.set(speed);

          const doc = document.documentElement;
          const maxScrollable = doc.scrollHeight - window.innerHeight;
          const progress =
            maxScrollable > 0
              ? Math.min(1, Math.max(0, y / maxScrollable))
              : 0;

          this.scrollProgress.set(progress);
        }),
        this.destroy$(),
      )
      .subscribe();
  }

  scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
    if (isSSR()) return;
    window.scrollTo({top: 0, behavior});
  }

  scrollToY(y: number, behavior: ScrollBehavior = 'smooth'): void {
    if (isSSR()) return;
    window.scrollTo({top: y, behavior});
  }
}
