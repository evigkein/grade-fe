export type NotificationType =
  | 'neutral'
  | 'positive'
  | 'negative'
  | 'critical'
  | 'promo';

export enum NotificationTypes {
  Neutral = 'neutral',
  Positive = 'positive',
  Negative = 'negative',
  Critical = 'critical',
  Promo = 'promo',
}

export interface INotification {
  type: NotificationTypes
  text: string
  meta: any
}

export type TNotification = 'success' | 'error' | 'warning' | 'default'

export interface INotificationOptions {
  duration?: number,
  type?: TNotification
  icon?: string;
}
