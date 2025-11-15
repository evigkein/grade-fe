import { inject, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs'
import {ErrorNotificationComponent} from './components/error-common/error-common.component';
import { NotificationComponent } from './components/notificaton.component'
import {INotificationOptions} from './model/notification.model';
import { NotificationConfig } from './notification-ref'
import { SuccessCommonNotificationComponent } from './components/success-common/success-common.component'

export function _NOTIFY(): NotificationService {
  return inject(NotificationService)
}

interface INotificationsOptions {
  title?: string;
  duration?: number;
  icon?: string;
}

const defaultNotificationDuration = 4000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  addNotification$ = new Subject<NotificationConfig>()

  show<T extends NotificationComponent>(
    component: Type<T>,
    config: NotificationConfig<T['config']>,
  ): void {
    const duration = config.duration ? config.duration : 8000
    config = { duration, ...config, component: component }
    this.addNotification$.next(config)
  }

  showSuccess(
    description: string,
    title = '',
    options?: INotificationsOptions,
  ): void {
    // const title = options.title ? options.title : '';
    const duration = options?.duration ? options.duration : defaultNotificationDuration;
    const icon = options?.icon ? options.icon : '';
    this.show(SuccessCommonNotificationComponent, {
      data: {title, description, icon },
      duration,
    })
  }

  showError(description: string, title = 'error', options?: INotificationOptions): void {
    const duration = options?.duration || 8000;
    const type = options?.type || 'error';
    this.show(ErrorNotificationComponent, {
    // this.show(ErrorNotificationComponent, {
      data: {title, description, type },
      duration,
    })
  }

  showWarning(description: string, title = 'warning', options?: INotificationOptions): void {
    const duration = options?.duration || 8000;
    const type = options?.type || 'warning';
    this.show(ErrorNotificationComponent, {
    // this.show(ErrorNotificationComponent, {
      data: {title, description, type },
      duration,
    })
  }
}

