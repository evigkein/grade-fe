import { Directive, ElementRef, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { debounceTime, fromEvent, Observable, startWith, tap } from 'rxjs';
import { _ELREF, _Zone } from '../../../utils/angular/ng-api';
import { destroy } from '../../../utils/libs/rxjs';

export const SCROLL_THRESHOLD_DEFAULT = 20;

@Directive({ selector: '[scroll]', standalone: true })
export class ScrollDirective implements OnInit {
  @Input() scrollBottomThreshold = SCROLL_THRESHOLD_DEFAULT;
  @Input() addScrollableClass = '';
  @Output() scrollToBottom: EventEmitter<number> = new EventEmitter<number>();
  @Output() scrolledToBottom: EventEmitter<void> = new EventEmitter<void>();

  private el = _ELREF();
  private zone = _Zone();
  private destroy$ = destroy();
  scroll$ = this.initScroll();

  ngOnInit() {
    this.scroll$.subscribe();
  }

  private onScroll(): void {
    const element = this.el.nativeElement as HTMLElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const totalScrollHeight = element.scrollHeight;

    if (this.scrollBottomThreshold)
      this.checkScrollBottom(this.scrollBottomThreshold, scrollPosition, totalScrollHeight);
  }

  private initScroll(): Observable<Event | null> {
    return new Observable<Event | null>(observer => {
      this.zone.runOutsideAngular(() => {
        const element = this.el.nativeElement;
        const event$ = fromEvent<Event>(element, 'scroll').pipe(
          debounceTime(200),
          startWith(null),
          tap(() => this.onScroll()),
          this.destroy$(),
        );
        event$.subscribe(observer);
      });
    });
  }

  private checkScrollBottom(scrollThreshold: number, scrollPosition: number, totalScrollHeight: number): void {
    const remainingScroll = totalScrollHeight - scrollPosition;
    this.scrollToBottom.emit(remainingScroll);

    if (scrollPosition >= totalScrollHeight - scrollThreshold) this.scrolledToBottom.emit();
  }
}
