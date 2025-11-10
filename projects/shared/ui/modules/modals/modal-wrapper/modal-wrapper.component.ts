import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { _MODAL } from '../modals/modal.service';
import { ModalTitleSize } from '../modals/modal/modal/enums/modal-title-size.enum';
import { TModalButton } from '../modals/modal/modal/modal.component';
import { ModalsModule } from '../modals/modal/modals.module';

@Component({
  selector: 'p-modal-wrapper',
  templateUrl:'modal-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ModalsModule],
})
export class ModalWrapperComponent {
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

  // boolean inputs (auto transform)
  @Input({ transform: Boolean }) isMobileFullScreen = false;
  @Input({ transform: Boolean }) isWithoutPadding = false;
  @Input({ transform: Boolean }) isSubmitButtonLoading = false;
  @Input({ transform: Boolean }) preventBgClose = false;
  @Input({ transform: Boolean }) isSnackbar = false;
  @Input({ transform: Boolean }) isFlexibleWidth = false;
  @Input({ transform: Boolean }) isLeftFullHeight = false;
  @Input({ transform: Boolean }) isRightFullHeight = false;
  @Input({ transform: Boolean }) isContentCentered = false;
  @Input({ transform: Boolean }) isModalHeaderSticky = true;
  @Input({ transform: Boolean }) isFlexibleHeights = false;
  @Input({ transform: Boolean }) mobileBottomPopup = false;
  @Input({ transform: Boolean }) mobileBottomPopupBackground = false;
  @Input({ transform: Boolean }) iconClose = false;
  @Input({ transform: Boolean }) iconCloseWithBackground = true;
  @Input({ transform: Boolean }) scrollContent = false;
  @Input({ transform: Boolean }) scrollbarIsNotVisible = false;
  @Input({ transform: Boolean }) isFlexLayout = false;
  @Input({ transform: Boolean }) isRoundedLayout = false;
  @Input({ transform: Boolean }) isScrollToModalTop = false;
  @Input({ transform: Boolean }) isAddShadow = false;
  @Input({ transform: Boolean }) isModalWrapperContentFullHeight = false;
  @Input({ transform: Boolean }) isContentFullWidth = false;
  @Input({ transform: Boolean }) scrollFirstEl = false;
  @Input({ transform: Boolean }) isButtonsSame = false;

  // ────────────── Выходные события ──────────────
  @Output() scrolled = new EventEmitter<number>();
  @Output() closed = new EventEmitter<boolean>();
  @Output() buttonCancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  // ────────────── ViewChild ──────────────
  @ViewChild('templateRef', { static: true })
  templateRef!: TemplateRef<ElementRef>;

  // ────────────── Modal API ──────────────
  private modal = _MODAL();
  modalId = signal<string | null>(null);

  open(): void {
    const id = this.modal.openModal({ templateRef: this.templateRef })!;
    this.modalId.set(id);
  }

  close(): void {
    if (this.modalId()) {
      this.modal.closeModal(this.modalId());
      this.modalId.set(null);
    }
  }
}
