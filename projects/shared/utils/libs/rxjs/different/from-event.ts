import { fromEvent as FromEventAngular, Observable } from 'rxjs';

export enum TFromEvent {
  Click = 'click',
  MouseMove = 'mouseMove',
}

export function fromEvent(event: TFromEvent): Observable<any> {
  return FromEventAngular(document, event)
}
