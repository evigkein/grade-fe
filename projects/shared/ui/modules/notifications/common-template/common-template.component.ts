import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { NotificationComponent } from '../components/notificaton.component';
import { TNotification } from '../model/notification.model';

export interface SvgConfig {
  name: string;
  width: string;
  height: string;
}

@Component({
  selector: 'p-notification-template',
  templateUrl: './common-template.component.html',
  styleUrls: ['./common-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, SvgIconComponent, TranslateModule]
})
export class NotificationTemplateComponent extends NotificationComponent {
  @Input() svg: SvgConfig | null = null;
  @Input() title: string | null = null;
  @Input() description: string | null = null;
  @Input() icon: string | null = null;
  @Input() linkUrl: string | null = null;
  @Input() linkLabel: string | null = null;
  @Input() type: TNotification = 'default';
}
