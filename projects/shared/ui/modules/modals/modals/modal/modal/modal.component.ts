import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  computed,
  signal,
  effect,
  booleanAttribute, input, numberAttribute
} from '@angular/core';
import { slideAnimationTrigger } from '@utils/angular/animation/show-hide.animation';
import { isSSR } from '@utils/helpers/browser/is-browser.util';
import { TButtonType } from '../../../../../components/button/button.component';

import { ModalTitleSize } from './enums/modal-title-size.enum';
import { ModalService } from '../../modal.service';
import { DeviceService } from '../../../../../../services/device/device.service';


const ANIMATION_TIME = '0.15s ease-out';

@Component({
  selector: 'p-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [slideAnimationTrigger('mobileSlideAnimation', ANIMATION_TIME)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  // =====================
  // INPUT SIGNALS
  // =====================

  titleText = input<string | undefined>(undefined);
  subTitleText = input<string | undefined>(undefined);

  isFullScreen = input(false, {transform: booleanAttribute});
  isMobileFullScreen = input(false, {transform: booleanAttribute});
  isWithoutPadding = input(false, {transform: booleanAttribute});
  isSubmitButtonLoading = input(false, {transform: booleanAttribute});
  preventBgClose = input(false, {transform: booleanAttribute});
  isSnackbar = input(false, {transform: booleanAttribute});
  isFlexibleWidth = input(false, {transform: booleanAttribute});
  isLeftFullHeight = input(false, {transform: booleanAttribute});
  isRightFullHeight = input(false, {transform: booleanAttribute});
  isContentCentered = input(false, {transform: booleanAttribute});
  isModalHeaderSticky = input(true, {transform: booleanAttribute});
  isFlexibleHeights = input(false, {transform: booleanAttribute});
  mobileBottomPopup = input(false, {transform: booleanAttribute});
  mobileBottomPopupBackground = input(false, {transform: booleanAttribute});
  iconClose = input(false, {transform: booleanAttribute});
  iconCloseWithBackground = input(true, {transform: booleanAttribute});
  scrollContent = input(false, {transform: booleanAttribute});
  scrollbarIsNotVisible = input(false, {transform: booleanAttribute});
  isFlexLayout = input(false, {transform: booleanAttribute});
  isRoundedLayout = input(false, {transform: booleanAttribute});
  isScrollToModalTop = input(false, {transform: booleanAttribute});
  isAddShadow = input(false, {transform: booleanAttribute});
  isModalWrapperContentFullHeight = input(false, {transform: booleanAttribute});
  isContentFullWidth = input(false, {transform: booleanAttribute});
  scrollFirstEl = input(false, {transform: booleanAttribute});
  isButtonsSame = input(false, {transform: booleanAttribute});

  titleSize = input<ModalTitleSize>(ModalTitleSize.medium);

  submitButtonText = input<string>('');
  cancelButtonText = input<string>('');

  backgroundColor = input<string | null>(null);
  backgroundImage = input<string | null>(null);

  maxHeight = input<string | null>(null);
  minHeight = input<string | null>(null);
  maxWidth = input<string | null>(null);

  duration = input<number | null>(null);
  id = input<string | null>(null);

  submitButtonType = input<TButtonType>('primary');
  cancelButtonType = input<TButtonType>('warn');

  // =====================
  // OUTPUTS
  // =====================

  @Output() scrolled = new EventEmitter<number>();
  @Output() closed = new EventEmitter<boolean>();
  @Output() buttonCancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  // =====================
  // TEMPLATE REFS
  // =====================

  @ViewChild('modal', { static: true }) modalRef!: ElementRef<HTMLElement>;
  @ViewChild('wrapperContent') wrapperContentRef!: ElementRef<HTMLElement>;
  @ViewChild('layout', { static: true }) layoutRef!: ElementRef<HTMLElement>;

  // =====================
  // INTERNAL SIGNALS
  // =====================

  isOpen = signal(false);
  modalTitleSize = ModalTitleSize;
  deviceType = signal(this.deviceService.deviceType());

  // Fullscreen based on device
  $isFullscreenMode = computed(() =>
    this.isFullScreen() ||
    (this.isMobileFullScreen() && this.deviceService.device() === 'mobile')
  );

  // Sticky header shadow
  isStickyHeaderShadowed = signal(false);

  private timeoutId: any = null;

  // =====================
  // CTOR
  // =====================

  constructor(
    private modalService: ModalService,
    private deviceService: DeviceService
  ) {

    // Пересчитывать fullscreen при смене устройства
    effect(() => {
      this.$isFullscreenMode();
    });
  }

  // =====================
  // INIT
  // =====================

  ngAfterViewInit(): void {
    if(isSSR()) return;
    this.isOpen.set(true);

    // Auto close by duration
    effect(() => {
      const dur = this.duration();
      if (!dur) return;

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => this.closeModal(), dur);
    });

    if (this.scrollFirstEl()) {
      queueMicrotask(() => {
        const first = this.findFirstFocusable();
        first?.focus();
      });
    }

    effect(() => {
      if (this.isModalHeaderSticky()) {
        this.observeScrollForShadow();
      }
    });

    // Modal scroll handler
    this.modalRef.nativeElement.addEventListener('scroll', () => {
      if (this.isSnackbar()) this.closeModal();
      this.scrolled.emit(this.modalRef.nativeElement.scrollTop);
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
    this.closed.emit(true);
  }

  // =====================
  // LOGIC
  // =====================

  keyboardNavigation = (e: KeyboardEvent) => {
    if (!this.modalService.isLastModal(this.id()!)) return;
    if (e.key === 'Escape' && !e.ctrlKey) this.closeModal();
  };

  private observeScrollForShadow() {
    const el = this.layoutRef.nativeElement;

    el.addEventListener('scroll', () => {
      this.isStickyHeaderShadowed.set(el.scrollTop > 0);
    });
  }

  private findFirstFocusable(): HTMLElement | null {
    const layout = this.layoutRef.nativeElement;
    const items = layout.querySelectorAll(
      'button:not([disabled]), [href], input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    return items.length ? (items[0] as HTMLElement) : null;
  }

  closeModal(): void {
    this.modalService.closeModal(this.id()!);
  }

  onScrollEvent(): void {
    this.scrolled.emit(this.modalRef.nativeElement.scrollTop);
  }

  onBackgroundClick(): void {
    if (!this.preventBgClose()) this.closeModal();
  }

  onSubmit(): void {
    this.submit.emit();
  }

  onCancel(): void {
    this.buttonCancel.emit();
  }

  scrollToModalTop(): void {
    this.modalRef.nativeElement.children[0].scrollIntoView({ behavior: 'smooth' });
  }
}
