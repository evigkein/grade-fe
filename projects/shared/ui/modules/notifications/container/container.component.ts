import { animate, animateChild, query, style, transition, trigger, } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnInit,
} from '@angular/core';
import { destroy } from '../../../../utils/libs/rxjs';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';
import { NotificationConfig, NotificationRef } from '../notification-ref';
import { NotificationService } from '../notification.service';
import { nestedTransition, shrinkInTransition, shrinkOutTransition } from '../utils/animations';

@Component({
  selector: 'p-notifications-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  animations: [
    trigger('nested', [nestedTransition]),
    trigger('shrink', [shrinkInTransition, shrinkOutTransition]),
  ]
})
export class NotificationsContainerComponent implements OnInit {
  notifications: NotificationRef[] = [];

  private destroy$ = destroy();

  constructor(
    private cd: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private notification: NotificationService,
    private injector: Injector,
    // private scrollbar: ScrollbarService,
    private element: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.notification.addNotification$.subscribe((config) => this.add(config));
    // this.initScrollbarOffset()
  }

  add<T>(config: NotificationConfig<T>): NotificationRef<T> {
    const notification = new NotificationRef(config, this.injector, this.cfr);
    notification.onClose().subscribe(() => {
      // @ts-ignore
      this.delete(this.notifications, notification);
    });

    // @ts-ignore
    this.notifications.push(notification);
    this.cd.detectChanges();

    return notification;
  }

  private delete(
    notifications: NotificationRef[],
    notification: NotificationRef,
  ): void {
    notifications.splice(notifications.indexOf(notification), 1);
    this.cd.detectChanges();
  }

  // private initScrollbarOffset(): void {
  //   this.modalService.popupCount$
  //     .pipe(untilDestroyed(this))
  //     .subscribe((count) =>
  //       count <= 0
  //         ? (this.element.nativeElement.style.right = `0px`)
  //         : (this.element.nativeElement.style.right = `${this.scrollbar.getScrollbarWidth()}px`),
  //     )
  // }
}
