import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  booleanAttribute,
  numberAttribute,
  ViewChild,
  signal, computed,
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { trackByFn } from '../../../../utils/angular';
import { isBrowser } from '../../../../utils/helpers/browser/is-browser.util';
import { mutationObserver } from '../../../../utils/helpers/browser/mutation-observer.util';
import { destroy } from '../../../../utils/libs/rxjs';
import { CarouselItemDirective } from './carousel-item.directive';

export enum SCROLL_DIRECTION { Backward = 'backward', Forward = 'forward' }

@Component({
  selector: 'p-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input({ transform: numberAttribute }) minItemWidth = 280;
  @Input({ transform: numberAttribute }) gap = 16;
  @Input({ transform: numberAttribute }) itemWidth?: number;
  @Input({ transform: booleanAttribute }) autoplay = false;
  @Input({ transform: booleanAttribute }) dots = false;
  @Input({ transform: numberAttribute }) maxItemsInView?: number;
  @Input({ transform: booleanAttribute }) alignItems = true;
  @Input({ transform: booleanAttribute }) hasButtons = true;

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('outer', { static: true }) outerRef!: ElementRef<HTMLElement>;
  @ViewChild('inner', { static: true }) innerRef!: ElementRef<HTMLElement>;
  @ContentChildren(CarouselItemDirective, { descendants: true }) items!: QueryList<CarouselItemDirective>;

  SCROLL_DIRECTION = SCROLL_DIRECTION;

  isArrowBackShown = false;
  isArrowForwardShown = false;

  private destroy$ = destroy();
  private resizeOuter?: ResizeObserver;
  private resizeInner?: ResizeObserver;
  private mutation?: MutationObserver;

  itemsPerView = signal(1);
  currentIndex = signal(0);
  currentPage = computed(() => {
    const perView = Math.max(1, this.itemsPerView());
    const total = Math.max(0, this.items?.length ?? 0);
    const idx = this.currentIndex();

    return Math.min(Math.floor(idx / perView + 0.0001), Math.ceil(total / perView) - 1);
  });

  trackBy = trackByFn;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.observeResize();
    this.observeMutations();
    fromEvent(this.outerRef.nativeElement, 'scroll')
      .pipe(debounceTime(60), startWith(null), this.destroy$())
      .subscribe(() => this.onScrolled());

    setTimeout(() => this.reflow(), 0);
  }

  dotsCount = computed(() => {
    const count = this.items?.length ?? 0;
    const perView = this.itemsPerView();
    return count ? Math.ceil(count / perView) : 0;
  });

  move(dir: SCROLL_DIRECTION): void {
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView());
    if (dir === SCROLL_DIRECTION.Forward) this.currentIndex.set(Math.min(maxIndex, this.currentIndex() + this.itemsPerView()));
    else this.currentIndex.set(Math.max(0, this.currentIndex() - this.itemsPerView()));

    this.scrollToIndex(this.currentIndex());
  }

  resetScrollPosition(): void {
    this.currentIndex.set(0);
    this.scrollToIndex(0);
  }

  private reflow(): void {
    const outer = this.outerRef.nativeElement;
    const inner = this.innerRef.nativeElement;
    const width = outer.clientWidth;

    const count = this.items.length || 1;
    const gapTotal = (this.gap) * Math.max(0, this.itemsPerView() - 1);

    let perView: number;
    if (this.itemWidth && this.itemWidth > 0) {
      perView = Math.max(1, Math.floor((width + this.gap) / (this.itemWidth + this.gap)));
    } else {
      perView = Math.max(1, Math.floor((width + this.gap) / (this.minItemWidth + this.gap)));
    }

    if (this.maxItemsInView && this.maxItemsInView > 0) {
      perView = Math.min(perView, this.maxItemsInView);
    }
    perView = Math.min(perView, count);

    const basis = Math.floor((width - this.gap * (perView - 1)) / perView);

    this.items.forEach((it) => {
      const el = it.el.nativeElement;
      el.style.flex = `0 0 ${basis}px`;
      el.style.minWidth = `${basis}px`;
      el.style.maxWidth = `${basis}px`;
    });

    inner.style.gap = `${this.gap}px`;

    this.itemsPerView.set(perView);

    const maxIndex = Math.max(0, count - this.itemsPerView());
    if (this.currentIndex() > maxIndex) this.currentIndex.set(maxIndex);
    this.scrollToIndex(this.currentIndex(),false);
    this.updateButtons();
    this.cdr.markForCheck();
  }

  private scrollToIndex(index: number, smooth = true): void {
    if(!isBrowser()) return;
    const outer = this.outerRef.nativeElement;
    const first = this.items?.get(index)?.el.nativeElement;
    if (!first) return;

    const targetLeft = first.offsetLeft - this.innerRef.nativeElement.offsetLeft;
    outer.scrollTo({ left: targetLeft, behavior: smooth ? 'smooth' : 'auto' });
    this.indexChange.emit(index);
    this.updateButtons();
  }

  private onScrolled(): void {
    const left = this.outerRef.nativeElement.scrollLeft;
    let nearest = 0;
    let minDelta = Number.MAX_VALUE;

    this.items.forEach((it, idx) => {
      const pos = it.el.nativeElement.offsetLeft - this.innerRef.nativeElement.offsetLeft;
      const delta = Math.abs(left - pos);
      if (delta < minDelta) {
        minDelta = delta;
        nearest = idx;
      }
    });

    if (nearest !== this.currentIndex()) {
      this.currentIndex.set(nearest);
      this.indexChange.emit(nearest);
    }
    this.updateButtons();
  }

  private updateButtons(): void {
    const maxIndex = Math.max(0, (this.items?.length || 0) - this.itemsPerView());
    this.isArrowBackShown = this.currentIndex() > 0;
    this.isArrowForwardShown = this.currentIndex() < maxIndex;
    this.cdr.markForCheck();
  }

  private observeResize(): void {
    if (typeof window === 'undefined') return;
    const onResize = () => this.reflow();

    this.resizeOuter = new ResizeObserver(onResize);
    this.resizeOuter.observe(this.outerRef.nativeElement);

    this.resizeInner = new ResizeObserver(onResize);
    this.resizeInner.observe(this.innerRef.nativeElement);

    fromEvent(window, 'orientationchange').pipe(this.destroy$()).subscribe(onResize);
  }

  private observeMutations(): void {
    this.mutation = mutationObserver(this.innerRef.nativeElement, () => this.reflow());
    merge(this.items.changes).pipe(startWith(null), debounceTime(0), this.destroy$()).subscribe(() => this.reflow());
  }

  ngOnDestroy(): void {
    this.resizeOuter?.disconnect();
    this.resizeInner?.disconnect();
    this.mutation?.disconnect();
  }
}
