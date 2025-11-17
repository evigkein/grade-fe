import {
  Directive,
  ElementRef,
  OnInit,
  input,
  output,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { fromEvent, merge, filter } from 'rxjs';
import { destroy } from '@utils/libs/rxjs';
import {
  IN_FRAME_TIME,
  MIN_HORIZONTAL_DISTANCE,
  MIN_HORIZONTAL_RATIO,
  SWIPE_INITIAL_DATA,
} from './swipe.constants';
import { ISwipe, swipeCoords } from './swipe.interface';

@Directive({ selector: '[swipe]', standalone: true })
export class SwipeDirective implements OnInit {
  hasMouseHandling = input(false, { transform: booleanAttribute });
  isDesktopSwipe = input(false, { transform: booleanAttribute });
  isReversed = input(true, { transform: booleanAttribute });
  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  swipeRight = output<void>();
  swipeLeft = output<void>();
  swipeStart = output<swipeCoords>();
  swipeEnd = output<swipeCoords>();
  swiped = output<{ direction: 'left' | 'right'; distance: number }>();

  private swipeData: ISwipe = SWIPE_INITIAL_DATA;
  private lastSwipeTime = 0;
  destroy$ = destroy();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initHandlingSwipes();
  }

  private handleSwipeStart(e: TouchEvent | MouseEvent): void {
    const coord: swipeCoords =
      'touches' in e ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY];
    this.startSwipe(coord, Date.now());
    this.swipeStart.emit(coord);
  }

  private handleSwipeEnd(e: TouchEvent | MouseEvent): void {
    const coord: swipeCoords =
      'changedTouches' in e
        ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
        : [e.clientX, e.clientY];
    const time = Date.now();
    this.endSwipe(coord, time);
    this.swipeEnd.emit(coord);
  }

  private startSwipe(coord: swipeCoords, time: number): void {
    this.swipeData = { coord, time };
  }

  private endSwipe(coord: swipeCoords, time: number): void {
    if (time - this.lastSwipeTime < 200) return;
    this.lastSwipeTime = time;

    const direction: swipeCoords = [
      coord[0] - this.swipeData.coord[0],
      coord[1] - this.swipeData.coord[1],
    ];
    const duration = time - this.swipeData.time;
    const isMouse = !(window as any).TouchEvent;

    if (this.isSwipeAction(direction, duration, isMouse)) {
      let dir: 'left' | 'right' = direction[0] < 0 ? 'left' : 'right';
      const distance = Math.abs(direction[0]);

      if (this.isReversed()) dir = dir === 'left' ? 'right' : 'left';

      this.swiped.emit({ direction: dir, distance });
      dir === 'left' ? this.swipeLeft.emit() : this.swipeRight.emit();
    }
  }

  private isSwipeAction(direction: swipeCoords, duration: number, isMouse = false): boolean {
    const [horizontal, vertical] = direction;
    const minDistance = isMouse ? MIN_HORIZONTAL_DISTANCE * 1.5 : MIN_HORIZONTAL_DISTANCE;
    const isLongEnough = Math.abs(horizontal) > minDistance;
    const isHorizontalEnough = Math.abs(horizontal) > Math.abs(vertical * MIN_HORIZONTAL_RATIO);
    const isInTimeFrame = duration < IN_FRAME_TIME;
    return isLongEnough && isHorizontalEnough && isInTimeFrame;
  }

  private initHandlingSwipes(): void {
    const native = this.el.nativeElement;

    const touchStart$ = fromEvent<TouchEvent>(native, 'touchstart');
    const touchEnd$ = fromEvent<TouchEvent>(native, 'touchend');
    const touchCancel$ = fromEvent<TouchEvent>(native, 'touchcancel');

    const mouseDown$ = fromEvent<MouseEvent>(native, 'mousedown').pipe(
      filter(() => this.hasMouseHandling() || this.isDesktopSwipe())
    );
    const mouseUp$ = fromEvent<MouseEvent>(native, 'mouseup').pipe(
      filter(() => this.hasMouseHandling() || this.isDesktopSwipe())
    );

    merge(touchStart$, mouseDown$)
      .pipe(this.destroy$())
      .subscribe((e) => this.handleSwipeStart(e));

    merge(touchEnd$, touchCancel$, mouseUp$)
      .pipe(this.destroy$())
      .subscribe((e) => this.handleSwipeEnd(e));
  }
}
