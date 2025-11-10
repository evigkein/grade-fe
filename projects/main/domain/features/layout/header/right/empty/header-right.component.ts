import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output, SimpleChanges
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SkipHydrationDirective } from '@shared/directives/utils/skip-hydration.directive';
import { ButtonComponent } from '@ui/components/button/button.component';
import { ActionsMenuComponent } from '@ui/components/features/actions-menu/actions-menu.component';
import { PhoneLinkComponent } from '@ui/features/phone-call/phone.component';
import { SmIconsComponent } from '@ui/features/sm-icons/sm-icons.component';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { getHeaderActions } from '../../../constants/dots-menu';

@Component({
  selector: 'p-header-right',
  templateUrl: './header-right.component.html',
  styleUrls: ['./header-right.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgIf, ButtonComponent, PhoneLinkComponent, SmIconsComponent, ActionsMenuComponent, SkipHydrationDirective, SvgIconComponent],
})
export class HeaderRightComponent {
  @Input({ required: true }) currentWidth!: number;
  @Input({ transform: booleanAttribute }) isHeader = false;
  @Output() navigate = new EventEmitter<string>();
  @Output() openCallbackModal = new EventEmitter();

  getHeaderMenuActionsOptions = getHeaderActions();

  onHeaderMenuAction(e: any): void {
    this.navigate.emit(e);
  }

  onCallClick() {
    this.openCallbackModal.emit()
  }
}
