import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StopEventsDirective } from '../../../directives/utils';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { LoaderComponent, TSpinnerColor } from '../loader/spinner/loader.component';
import { ButtonClickDirective } from './button-click.directive';

export type TButton = 'transparent' | 'primary' | 'warn' | 'link' | 'icon';
export type TButtonColor = 'primary' | 'stroke' | 'warn' | 'red' | 'yellow' | 'pink-light' | 'gray' | 'inherit' | '';
export type TButtonTextColor = 'primary' | '';
export type TButtonSize = 'xs' | 'sm' | 'm' | 'l' | 'xl' | 'inherit' | 'max' | '';
export type TButtonWidth = 'width-primary' | 'm' | 'wide' | 'inherit' | 'max';
export type TButtonAlign = 'left' | 'center' | 'right';
export type TButtonPadding = 'sm' | 'none' | 'icon' | 'side-m' | 'side-r-0' | '';


@Component({
  selector: 'p-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, LoaderComponent, TranslateModule, StopEventsDirective]
})
export class ButtonComponent extends ButtonClickDirective implements OnInit {
  @Input() label!: string;
  @Input() color: TButtonColor = '';
  @Input() colorText: TButtonTextColor = '';
  @Input() type: TButton = 'primary';
  @Input() size: TButtonSize = '';
  @Input() width: TButtonWidth = 'width-primary';
  @Input() align: TButtonAlign = 'center';
  @Input() spinnerColor: TSpinnerColor = 'button';
  @Input() br: 'm' | '' = '';
  // @Input() icon: string = '';
  @Input() iconPrefix: string | undefined = '';
  @Input() iconPrefixSize = '18';
  @Input() iconPrefixColor: string = '';
  @Input() iconPostfix: string | undefined = '';
  @Input() iconPostfixSize = '18';
  @Input({transform: booleanAttribute}) isBgTransparent = true;
  @Input({transform: booleanAttribute}) withoutPadding = false;
  @Input({transform: booleanAttribute}) isMaxHeight = false;
  @Input({transform: booleanAttribute}) isHeightInherit = false;
  // @Input() type: ButtonType = 'primary';
  @Input() padding: TButtonPadding = '';

  @HostBinding('class.btn--wide')
  get isWide() {
    return this.width === 'wide';
  }

  // private appConfig = inject(APP_CONFIG, {optional: true});

  ngOnInit() {
    // if (!this.color && this.appConfig?.buttonDefaultColor) {
    //   this.color = this.appConfig?.buttonDefaultColor as ButtonColorType;
    // }
  }
}
