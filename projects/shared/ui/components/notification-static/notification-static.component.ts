import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../../pipes/sanitize/safe-html.pipe';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';

export type NotificationBackgroundType = '' | 'red' | 'warn'
export type NotificationMessageSize = '' | 'sm'
export type NotificationMessageIconSize = '' | 'sm'

@Component({
  selector: 'p-notification-static',
  templateUrl: './notification-static.component.html',
  styleUrls: ['./notification-static.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, SafeHtmlPipe, TranslateModule]
})
export class NotificationStaticComponent {
  @Input() message!: string;
  @Input() icon = 'notification';
  @Input() iconSize = '18';
  @Input() size: NotificationMessageSize = '';
  @Input() type: 'primary' = 'primary';
  @Input() backgroundType: NotificationBackgroundType = '';
}
