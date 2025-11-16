import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../modules/svg-icon/svg-icon.component';
import { SafeHtmlPipe } from '../../../pipes/sanitize/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';

export type NotificationBackgroundType = '' | 'red' | 'warn';
export type NotificationMessageSize = '' | 'sm';
export type NotificationMessageIconSize = '' | 'sm';

@Component({
  selector: 'p-notification-static',
  standalone: true,
  templateUrl: './notification-static.component.html',
  styleUrls: ['./notification-static.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SvgIconComponent, SafeHtmlPipe, TranslateModule],
})
export class NotificationStaticComponent {
  message = input.required<string>();
  icon = input<string>('notification');
  iconSize = input<string>('18');
  size = input<NotificationMessageSize>('');
  type = input<'primary'>('primary');
  backgroundType = input<NotificationBackgroundType>('');

  isLoading = input(false, { transform: booleanAttribute });
  tabindex = input(0, { transform: numberAttribute });

  classes = computed(() => {
    return [
      `notification--bg-${this.backgroundType()}`,
      this.type() === 'primary' ? 'notification--primary' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });
}
