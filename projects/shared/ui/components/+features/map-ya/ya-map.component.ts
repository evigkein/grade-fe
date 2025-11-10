import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit
} from '@angular/core';
import { AngularYandexMapsModule, YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'p-ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AngularYandexMapsModule
  ]
})
export class YaMapComponent implements OnInit {

  @Input({ transform: numberAttribute }) fromLat: number = 55.751952;
  @Input({ transform: numberAttribute }) fromLng: number = 37.600739;
  @Input({ transform: numberAttribute }) toLat: number = 55.76;
  @Input({ transform: numberAttribute }) toLng: number = 37.64;

  states: ymaps.IMapState = {
    behaviors: ['drag', 'dblClickZoom', 'multiTouch'],
  };

  private cdr = inject(ChangeDetectorRef)

  private map!: ymaps.Map;

  ngOnInit() {}

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    this.addRoute();
  }

  private addRoute(): void {
    const from: [number, number] = [this.fromLat, this.fromLng];
    const to: [number, number] = [this.toLat, this.toLng];

    const route = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [from, to],
        params: { routingMode: 'auto' }, // 'auto' | 'masstransit' | 'pedestrian' | 'bicycle'
      },
      {
        boundsAutoApply: true,
        routeActiveStrokeWidth: 5,
        routeActiveStrokeColor: '#1E98FF',
        routeInactiveStrokeColor: '#A6A6A6',
      }
    );

    this.map.geoObjects.add(route);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
}
