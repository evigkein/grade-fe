import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  numberAttribute
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StopEventsDirective } from '../../../directives/utils';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { LoaderComponent, TSpinnerColor } from '../loader/spinner/loader.component';
import { ButtonClickDirective } from './button-click.directive';

export type TButtonType = 'primary' | 'secondary' | 'warn' | 'icon' | 'link' | 'transparent';
export type TButtonSize = 's' | 'm' | 'l';
export type TButtonWidth = 'max' | 'auto';
export type TButtonAlign = 'left' | 'center' | 'right';
export type TButtonPadding = 'none' | 'icon' | '';

@Component({
  selector: 'p-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    LoaderComponent,
    TranslateModule,
    StopEventsDirective,
  ]
})
export class ButtonComponent extends ButtonClickDirective {
  label = input<string>('');
  type = input<TButtonType>('primary');
  size = input<TButtonSize>('m');
  width = input<TButtonWidth>('auto');
  align = input<TButtonAlign>('center');
  padding = input<TButtonPadding>('');

  spinnerColor = input<TSpinnerColor>('button');

  iconPrefix = input<string | undefined>(undefined);
  iconPrefixSize = input(18, {transform: numberAttribute});
  iconPrefixColor = input<string>('');

  iconPostfix = input<string | undefined>(undefined);
  iconPostfixSize = input<number>(18);

  isBgTransparent = input(true, {transform: booleanAttribute});
  withoutPadding = input(false, {transform: booleanAttribute});
  isMaxHeight = input(false, {transform: booleanAttribute});
  isHeightInherit = input(false, {transform: booleanAttribute});

  classes = computed(() => {
    return [
      'btn',
      `btn--type-${this.type()}`,
      `btn--size-${this.size()}`,
      `btn--width-${this.width()}`,
      `btn--align-${this.align()}`,
      this.withoutPadding() ? 'btn--without-padding' : '',
      this.isMaxHeight() ? 'btn--h-max' : '',
      this.isHeightInherit() ? 'btn--h-inherit' : '',
      this.isIconOnly() ? 'btn--icon-only' : '',
      this.isDisabled() ? 'btn--disabled' : '',
    ].filter(Boolean).join(' ');
  });

  isIconOnly = computed(() => {
    return !this.label() && (this.iconPrefix() || this.iconPostfix());
  });

  isWide = computed(() => this.width() === 'max');

  @HostBinding('class.btn--wide')
  get hostWide() {
    return this.isWide();
  }
}
