import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '../../../../pipes/sanitize/safe-html.pipe';
import { SvgIconComponent } from '../../../modules/svg-icon/svg-icon.component';

export type NotificationBackgroundType = '' | 'red'
export type NotificationMessageSize = '' | 'sm'

@Component({
  selector: 'ds-notification-static',
  templateUrl: './notification-static.component.html',
  styleUrls: ['./notification-static.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent, SafeHtmlPipe]
})
export class NotificationStaticComponent {
  @Input() message!: string;
  @Input() icon = '';
  @Input() size: NotificationMessageSize = '';
  @Input() type = 'primary';
  @Input() backgroundType: NotificationBackgroundType = '';
}
