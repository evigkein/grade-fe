import {Component, Directive} from '@angular/core';
import { NotificationRef } from '../notification-ref'

@Component({
    selector: 'p-notification',
    template: '',
    standalone: false
})
export abstract class NotificationComponent {
  config: {}

  constructor(protected notificationRef: NotificationRef) {
    this.config = this.notificationRef.data
  }
}
