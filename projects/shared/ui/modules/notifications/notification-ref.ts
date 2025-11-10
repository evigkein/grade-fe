import {ComponentFactoryResolver, Injector, Type} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TNotification} from './model/notification.model';

export interface NotificationConfig<T = {}> {
  title?: string;
  description?: string;
  component?: any;
  duration?: number;
  type?: TNotification;
  data?: T;
}

export class NotificationRef<T = {}> {
  title: string | undefined;
  description: string | undefined;
  type: TNotification | undefined;
  // tslint:disable-next-line:no-any
  component: Type<any>;
  duration: number | undefined;
  // tslint:disable-next-line:no-any
  data: any;
  injector: Injector;
  // tslint:disable-next-line:no-any
  private onClose$ = new Subject<any>();
  // tslint:disable-next-line:no-any
  private timeoutId: any;

  constructor(
    public config: NotificationConfig<T>,
    private parentInjector: Injector,
    private cfr: ComponentFactoryResolver,
  ) {
    this.injector = Injector.create({
      providers: [
        {provide: NotificationRef, useValue: this},
        {provide: ComponentFactoryResolver, useValue: this.cfr}, // otherwise it will be shaken
      ],
      parent: this.parentInjector,
    });

    this.title = config.title;
    this.description = config.description;
    this.type = config.type;
    // @ts-ignore
    this.duration = config.duration > 0 ? config.duration : 0;
    this.component = config.component;
    this.data = config.data;
    this.setTimeout();
  }

  // tslint:disable-next-line:no-any
  onClose(): Observable<any> {
    return this.onClose$.asObservable();
  }

  // tslint:disable-next-line:no-any
  close(result?: any) {
    if (!this.onClose$.closed) {
      this.onClose$.next(result);
      this.onClose$.complete();
    }
    this.clearTimeout();
  }

  private setTimeout() {
    // @ts-ignore
    if (this.duration > 0) {
      this.timeoutId = setTimeout(() => this.close(), this.duration!);
    }
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
