import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NotificationTemplateComponent } from '../../common-template/common-template.component';
import { TNotification } from '../../model/notification.model';
import { NotificationComponent } from '../notificaton.component';

@Component({
  selector: 'p-error-common-notification',
  template: `
    <p-notification-template
      [title]="config.title"
      [description]="config.description"
      [type]="config.type!">
    </p-notification-template>`,
  styleUrls: ['./error-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NotificationTemplateComponent]
})
export class ErrorNotificationComponent extends NotificationComponent {
  @Input() override config!: {
    title: string
    description: string
    type?: TNotification;
  };
}

