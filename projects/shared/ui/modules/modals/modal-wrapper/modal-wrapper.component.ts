import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  TemplateRef,
  ViewChild,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { TButtonType } from '../../../components/button/button.component';
import { _MODAL } from '../modals/modal.service';
import { ModalTitleSize } from '../modals/modal/modal/enums/modal-title-size.enum';
import { ModalsModule } from '../modals/modal/modals.module';

@Component({
  selector: 'p-modal-wrapper',
  standalone: true,
  imports: [CommonModule, ModalsModule],
  templateUrl: 'modal-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWrapperComponent {
  titleText = input<string | undefined>(undefined);
  subTitleText = input<string | undefined>(undefined);
  backgroundColor = input<string | undefined>(undefined);
  backgroundImage = input<string | undefined>(undefined);
  submitButtonText = input<string>('');
  cancelButtonText = input<string>('');
  submitButtonType = input<TButtonType>('primary');
  cancelButtonType = input<TButtonType>('warn');
  titleSize = input<ModalTitleSize>(ModalTitleSize.medium);
  id = input<string | null>(null);
  duration = input<number | null>(null);
  maxHeight = input<string | null>(null);
  minHeight = input<string | null>(null);
  maxWidth = input<string | null>(null);

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  isWithoutPadding = input(false, { transform: booleanAttribute });
  iconClose = input(true, { transform: booleanAttribute });
  isMobileFullScreen = input(true, { transform: booleanAttribute });

  isFullScreen = input(false, { transform: booleanAttribute });
  isSubmitButtonLoading = input(false, { transform: booleanAttribute });
  preventBgClose = input(false, { transform: booleanAttribute });
  isSnackbar = input(false, { transform: booleanAttribute });
  isFlexibleWidth = input(false, { transform: booleanAttribute });
  isLeftFullHeight = input(false, { transform: booleanAttribute });
  isRightFullHeight = input(false, { transform: booleanAttribute });
  isContentCentered = input(false, { transform: booleanAttribute });
  isModalHeaderSticky = input(true, { transform: booleanAttribute });
  isFlexibleHeights = input(false, { transform: booleanAttribute });
  mobileBottomPopup = input(false, { transform: booleanAttribute });
  mobileBottomPopupBackground = input(false, { transform: booleanAttribute });
  iconCloseWithBackground = input(true, { transform: booleanAttribute });
  scrollContent = input(false, { transform: booleanAttribute });
  scrollbarIsNotVisible = input(false, { transform: booleanAttribute });
  isFlexLayout = input(false, { transform: booleanAttribute });
  isRoundedLayout = input(false, { transform: booleanAttribute });
  isScrollToModalTop = input(false, { transform: booleanAttribute });
  isAddShadow = input(false, { transform: booleanAttribute });
  isModalWrapperContentFullHeight = input(false, { transform: booleanAttribute });
  isContentFullWidth = input(false, { transform: booleanAttribute });
  scrollFirstEl = input(false, { transform: booleanAttribute });
  isButtonsSame = input(false, { transform: booleanAttribute });

  scrolled = output<number>();
  closed = output<boolean>();
  buttonCancel = output<void>();
  submit = output<void>();

  @ViewChild('templateRef') templateRef!: TemplateRef<ElementRef>;

  private modal = _MODAL();
  modalId = signal<string | null>(null);


  open(): void {
    const id = this.modal.openModal({ templateRef: this.templateRef })!;
    this.modalId.set(id);
  }

  close(): void {
    const id = this.modalId();
    if (!id) return;
    this.modal.closeModal(id);
    this.modalId.set(null);
  }
}
