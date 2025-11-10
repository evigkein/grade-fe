import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export function _EVB(): EventBusService {
  return inject(EventBusService);
}

export type TEventBusAction = 'openLoginModal';

export interface EventPayloads {
  openLoginModal: any;
}

export interface IEventMessage<T extends TEventBusAction = TEventBusAction> {
  action: TEventBusAction;
  payload: EventPayloads[T];
}

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private actionSubject = new BehaviorSubject<IEventMessage<TEventBusAction> | null>(null);

  emit<T extends TEventBusAction>(action: T, payload?: EventPayloads[T]): void {
    this.actionSubject.next({ action, payload });
  }

  onAnyEvent(): Observable<IEventMessage<TEventBusAction>> {
    return this.actionSubject.asObservable().pipe(
      filter((event): event is IEventMessage<TEventBusAction> => event !== null)
    );
  }

  onEvent<T extends TEventBusAction>(action: T): Observable<EventPayloads[T]> {
    return this.onAnyEvent().pipe(
      filter(event => event.action === action),
      map(event => event.payload)
    );
  }
}
