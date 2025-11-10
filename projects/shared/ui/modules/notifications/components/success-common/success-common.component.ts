import {CommonModule} from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {TNotification} from '../../model/notification.model';
import { NotificationRef } from '../../notification-ref'
import {NotificationTemplateComponent} from '../../common-template/common-template.component';
import { NotificationComponent } from '../notificaton.component'

@Component({
    selector: 'p-success-common-notification',
    template: `
      <p-notification-template
        [title]="config.title"
        [description]="config.description"
        [icon]="config.icon!"
      >
      </p-notification-template>`,
  styleUrls: ['./success-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NotificationTemplateComponent]
})
export class SuccessCommonNotificationComponent extends NotificationComponent {
  @Input() override config!: {
    title: string
    description: string
    icon?: string
    type?: TNotification;
  };
}
