import {
  AfterViewInit, booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, effect,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2, signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import {
  auditTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';
import { BrowserService } from '../../../../../../services/browser.service';
import { DeviceType } from '../../../../../../services/device/constants/device-size.constants';
import { DeviceService } from '../../../../../../services/device/device.service';
import { NativeEventService } from '../../../../../../services/events/native-event.service';
import { slideAnimationTrigger } from '@utils/angular/animation/show-hide.animation';
import { isBrowser } from '../../../../../../utils/helpers/browser/is-browser.util';
import { destroy } from '../../../../../../utils/libs/rxjs';
import { ISimpleChanges } from '../../../../../../utils/types';

import {ModalService} from '../../modal.service';

import { ModalTitleSize } from './enums/modal-title-size.enum';

const ANIMATION_TIME = '0.15s ease-out';

export type TModalButton = 'primary' | 'warn';

@Component({
    selector: 'p-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    animations: [slideAnimationTrigger('mobileSlideAnimation', ANIMATION_TIME)],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() titleText?: string;
  @Input() subTitleText?: string;
  @Input() isFullScreen = false;
  @Input() backgroundColor?: string;
  @Input() backgroundImage?: string;
  @Input() submitButtonText = '';
  @Input() submitButtonType: TModalButton = 'primary';
  @Input() cancelButtonText = '';
  @Input() cancelButtonType: TModalButton = 'warn';
  @Input() titleSize: ModalTitleSize = ModalTitleSize.medium;
  @Input() id!: string | null;
  @Input() duration!: number;
  @Input() maxHeight = null;
  @Input() minHeight = null;
  @Input() maxWidth = null;
  @Input({transform: booleanAttribute}) isMobileFullScreen = false;
  @Input({transform: booleanAttribute}) isWithoutPadding = false;
  @Input({transform: booleanAttribute}) isSubmitButtonLoading = false;
  @Input({transform: booleanAttribute}) preventBgClose = false;
  @Input({transform: booleanAttribute}) isSnackbar = false;
  @Input({transform: booleanAttribute}) isFlexibleWidth = false;
  @Input({transform: booleanAttribute}) isLeftFullHeight = false;
  @Input({transform: booleanAttribute}) isRightFullHeight = false;
  @Input({transform: booleanAttribute}) isContentCentered = false;
  @Input({transform: booleanAttribute}) isModalHeaderSticky = true;
  @Input({transform: booleanAttribute}) isFlexibleHeights = false;
  @Input({transform: booleanAttribute}) mobileBottomPopup = false;
  @Input({transform: booleanAttribute}) mobileBottomPopupBackground = false;
  @Input({transform: booleanAttribute}) iconClose = false;
  @Input({transform: booleanAttribute}) iconCloseWithBackground = true;
  @Input({transform: booleanAttribute}) scrollContent = false;
  @Input({transform: booleanAttribute}) scrollbarIsNotVisible = false;
  @Input({transform: booleanAttribute}) isFlexLayout = false;
  @Input({transform: booleanAttribute}) isRoundedLayout = false;
  @Input({transform: booleanAttribute}) isScrollToModalTop = false;
  @Input({transform: booleanAttribute}) isAddShadow = false;
  @Input({transform: booleanAttribute}) isModalWrapperContentFullHeight = false;
  @Input({transform: booleanAttribute}) isContentFullWidth = false;
  @Input({transform: booleanAttribute}) scrollFirstEl = false;
  @Input({transform: booleanAttribute}) isButtonsSame = false;

  @Output() scrolled = new EventEmitter<number>();
  @Output() closed = new EventEmitter<boolean>();
  @Output() buttonCancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  @ViewChild('modal', { static: true })
  modalRef!: ElementRef<HTMLElement>;

  @ViewChild('wrapperContent') wrapperContentRef!: ElementRef<HTMLElement>;

  @ViewChild('layout', { static: true }) layoutRef!: ElementRef<HTMLElement>;

  modalTitleSize = ModalTitleSize;
  isOpen = false;
  backgroundImage$ = new Subject<string>();
  isFullscreenMode$ = new BehaviorSubject<boolean>(false);
  isStickyHeaderShadowed$: Observable<boolean> | null = null;
  $deviceType = signal<DeviceType>(this.deviceService.deviceType());
  $isFullscreenMode = signal<boolean>(this.isFullscreenMode());

  isMouseDownClicked = false;
  isMouseUpClicked = false;

  bgDown(): void {
    console.log("")
    // this.isMouseDownClicked = true;
  }

  bgUp(): void {
    // this.isMouseDownClicked && this.closeModal();
  }

  private timeoutId!: ReturnType<typeof setTimeout>;
  private destroy$ = destroy();

  constructor(
    private nativeEventService: NativeEventService,
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
    private browserService: BrowserService,
    private renderer: Renderer2,
  ) {
    effect(() => {
      const currentDeviceType = this.$deviceType();
      this.$isFullscreenMode.set(this.isFullscreenMode());
    });
  }

  ngOnInit(): void {
    this.nativeEventService.scroll$
      .pipe(
        tap(() => this.onScrollEvent()),
        this.destroy$(),
      )
      .subscribe();

    this.isOpen = true;

    if (this.duration) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(this.closeModal, this.duration);
    }

    if (isBrowser()) {
      window.addEventListener('keydown', this.keyboardNavigation);
    }

    this.cdr.markForCheck();
  }

  keyboardNavigation = (e: KeyboardEvent): void => {
    if (!this.modalService.isLastModal(this.id!)) {
      return;
    }

    if (!e.ctrlKey && e.key === 'Escape') {
      this.closeModal();
    }
  };

  private isFullscreenMode(): boolean {
    return (
      this.isFullScreen ||
      (this.isMobileFullScreen && this.deviceService.device() === 'mobile')
    );
  }

  ngOnDestroy(): void {
    if (isBrowser()) {
      window.removeEventListener('keydown', this.keyboardNavigation);
    }
    this.closed.emit(true);
  }

  ngOnChanges(changes: ISimpleChanges<ModalComponent>): void {
    const {isFullScreen, isMobileFullScreen} = changes

    if (this.isScrollToModalTop) {
      this.scrollToModalTop();
    }

    if (
      (isFullScreen?.currentValue !== isFullScreen?.previousValue) ||
      (isMobileFullScreen?.currentValue !== isMobileFullScreen?.previousValue)
    ) {
      this.isFullscreenMode$.next(this.isFullscreenMode());
    }

    if (changes.isModalHeaderSticky) {
      this.isStickyHeaderShadowed$ = this.isModalHeaderSticky
        ? this.handleLayoutScroll()
        : null;
    }
  }

  ngAfterViewInit(): void {
    this.setWrapperContentHeight();

    if (isBrowser() && this.scrollFirstEl) {
      setTimeout(() => {
        this.getFirstElement()?.focus();
      }, 100);
    }
  }

  private getFirstElement(): HTMLElement {
    const focusable = this.layoutRef.nativeElement.querySelectorAll(
      'button:not([disabled]), [href], input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    return focusable[0] as HTMLElement;
  }

  closeModal(): void {
    this.modalService.closeModal(this.id!);
  }

  onScrollEvent(): void {
    if (this.isSnackbar) {
      this.closeModal();
    }

    this.scrolled.emit(this.modalRef.nativeElement.scrollTop);
  }

  onBackgroundClick(event?: Event): void {
    if (!this.preventBgClose) this.closeModal();
  }

  onSubmit(): void {
    this.submit.emit()
  }

  onCancel(): void {
    this.buttonCancel.emit()
  }

  get wrapperContentStyleObject(): Record<string, string> {
    return {
      maxHeight: this.maxHeight!,
      minHeight: this.minHeight!,
      maxWidth: this.maxWidth!,
    };
  }

  recalcContentHeight(): void {
    this.setWrapperContentHeight();
  }

  private setWrapperContentHeight(): void {
    // Для возможности скролла нужно зафиксировать height
    // Установить заранее height невозможно т.к. неизвестно будет ли контент с переполнением и скроллом, либо без
    if (this.scrollContent) {
      const container = this.wrapperContentRef?.nativeElement;
      this.renderer.removeStyle(container, 'height');
      const offsetHeight = container?.offsetHeight || 0;

      if (offsetHeight) {
        this.renderer.setStyle(container, 'height', `${offsetHeight}px`);
      }
    }
  }

  private scrollToModalTop(): void {
    this.modalRef.nativeElement.children[0].scrollIntoView({
      behavior: 'smooth',
    });
  }

  private handleLayoutScroll(): Observable<boolean> {
    return fromEvent(this.layoutRef.nativeElement, 'scroll').pipe(
      auditTime(200),
      filter(() => this.isModalHeaderSticky),
      map(() => this.layoutRef.nativeElement.scrollTop > 0),
      distinctUntilChanged(),
    );
  }
}
