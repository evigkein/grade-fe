import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {NotificationsContainerComponent, NotificationTemplateComponent} from './components';
import { NotificationService } from './notification.service'

@NgModule({
  imports: [
    CommonModule,
    NotificationsContainerComponent,
    NotificationTemplateComponent,
  ],
  exports: [NotificationsContainerComponent, NotificationTemplateComponent],
  declarations: [],
  providers: [NotificationService],
})
export class NotificationModule {}
