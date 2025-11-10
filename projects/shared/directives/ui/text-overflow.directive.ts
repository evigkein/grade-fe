import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  inject, numberAttribute,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {resizeObserver} from '../../utils/helpers/browser/resize-observer.util';
import { destroy } from '../../utils/libs/rxjs';
import {debounceSafeDefault} from '../../utils/libs/rxjs/debounce-safe';

@Directive({ selector: '[textOverflow]', standalone: true })
export class TextOverflowDirective implements AfterViewInit, OnDestroy {
  @Input('textOverflow') additionalClass = '';
  @Input('textOverflowDisabled') disabled = false;
  @Input({transform: numberAttribute}) maxLines = 1;
  @Output() textOverflowed = new EventEmitter<boolean>();
  @Output() overflowLines = new EventEmitter<string[]>();

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private resizeObserver!: ResizeObserver | null;
  private resizeSubject = new Subject<void>();

  destroy$ = destroy();

  constructor() {
    if (this.disabled) return;
    this.resizeSubject.pipe(debounceTime(debounceSafeDefault), this.destroy$()).subscribe(() => {
      this.checkOverflow();
    });
  }

  ngAfterViewInit() {
    if (this.disabled) return;
    this.resizeObserver = resizeObserver(this.el.nativeElement, () => {
      this.resizeSubject.next();
    });
    this.resizeSubject.pipe(debounceTime(debounceSafeDefault), this.destroy$()).subscribe(() => {
      this.checkOverflow();
    });
    this.checkOverflow();
  }

  ngOnDestroy() {
    if (this.disabled) return;
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.resizeSubject.complete();
  }

  private checkOverflow(): void {
    if (this.disabled) return;
    if(this.maxLines > 1) {
      this.checkMultiLine();
      return;
    }
    const cell = this.el.nativeElement;
    const isOverflowing = cell.scrollWidth > cell.clientWidth;
    if (isOverflowing) {
      if (this.additionalClass) {
        this.renderer.addClass(cell, this.additionalClass);
      }
      this.textOverflowed.emit(true);
    } else {
      if (this.additionalClass) {
        this.renderer.removeClass(cell, this.additionalClass);
      }
      this.textOverflowed.emit(false);
    }
  }

  private checkMultiLine(): void {
    const cell = this.el.nativeElement;
    const isOverflowing = cell.scrollWidth > cell.clientWidth;

    if (isOverflowing) {

    }
  }
}
