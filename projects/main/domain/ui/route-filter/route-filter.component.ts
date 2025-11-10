import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input, OnChanges,
  OnInit,
  Output, signal, SimpleChanges
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILocationSchema } from '@shared/domain/api/swagger/models/i-location-schema';
import { ApiLocationsService } from '@shared/domain/api/swagger/services/api-locations.service';
import { ButtonComponent } from '@ui/components/button/button.component';
import { ISelectOption, SelectModule } from '@ui/forms/controls/select';
import { _NOTIFY } from '@ui/modules/notifications/notification.service';
import { SvgIconComponent } from '@ui/modules/svg-icon/svg-icon.component';
import { destroy } from '@utils/libs/rxjs';
import { debounceSafe$ } from '@utils/libs/rxjs/debounce-safe';
import { ISimpleChanges } from '@utils/types';
import { Observable, Subject, tap } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { LocationsApiService } from './locations.service';

@Component({
  selector: 'p-route-filter',
  templateUrl: './route-filter.component.html',
  styleUrls: ['./route-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SelectModule, SvgIconComponent, ButtonComponent]
})
export class RouteFilterComponent implements OnInit, OnChanges {
  @Input() initSlugs: string | undefined;
  @Input() isLoading = false;
  @Input() initLocations: ILocationSchema[];
  @Output() pickRoute = new EventEmitter<ILocationSchema[]>();
  @Output() loading = new EventEmitter<void>();
  @Output() loaded = new EventEmitter<void>();

  private apiLocations = inject(ApiLocationsService);
  private notify = _NOTIFY();
  destroy$ = destroy();
  private locationsTransfer = inject(LocationsApiService);

  fromControl = new FormControl<ILocationSchema | null>(null)
  toControl = new FormControl<ILocationSchema | null>(null)

  private fromQuery$ = new Subject<string>();
  private toQuery$ = new Subject<string>();

  private route = inject(ActivatedRoute);
  slugs = toSignal(this.route.paramMap);

  locationsFrom$ = this.fromQuery$.pipe(
    startWith(''),
    map(q => q?.trim() ?? ''),
    debounceSafe$(),
    switchMap(q => this.fetchLocations(q)),
    map(list => this.applyPreset(list, 0))
  );

  locationsTo$ = this.toQuery$.pipe(
    startWith(''),
    map(q => q?.trim() ?? ''),
    debounceSafe$(),
    switchMap(q => this.fetchLocations(q)),
    map(list => this.applyPreset(list, 1))
  );

  ngOnInit(): void {
    // if(this.initSlugs) {
      // const [from, to] = this.initSlugs.split('_')
    //   // console.log(from, to);
    // }
    // this.form.valueChanges
    //   .pipe(this.destroy$())
    //   .subscribe();
  }

  ngOnChanges(changes: ISimpleChanges<RouteFilterComponent>) {
    if(!changes.initLocations?.firstChange) return;
    const init = changes.initLocations?.currentValue as ILocationSchema[] | undefined;
    if (!init || !Array.isArray(init) || init.length === 0) return;

    if (init[0]) this.fromControl.setValue(init[0], { emitEvent: true });
    if (init[1]) this.toControl.setValue(init[1], { emitEvent: true });
  }

  onSearchFrom(q: string) { this.fromQuery$.next(q); }
  onSearchTo(q: string)   { this.toQuery$.next(q); }

  onSubmit(): void {
    const fromLoc = this.fromControl.value;
    const toLoc = this.toControl.value;

    const slugs = this.slugs().get('slug')?.split('_')
    if(slugs?.length === 2 && fromLoc?.slug === slugs[0] && toLoc?.slug === slugs[1]) return;

    if (!fromLoc || !toLoc) {
      let msg = '';
      if(!toLoc) msg = 'Заполните локацию назначения'
      if(!fromLoc) msg = 'Заполните локацию отправления'
      this.notify.showError(msg)
      return;
    }

    if(fromLoc?.slug === toLoc?.slug) {
      this.notify.showError('Пункты отправления и назначения не должны совпадать')
      return;
    }

    this.pickRoute.emit([fromLoc, toLoc]);
  }

  private fetchLocations(q: string) {
    return this.locationsTransfer.get(q).pipe(
      // tap(i => console.log(i)),
      map(list => list.map(item => ({ label: `${item.region}, ${item.type} ${item.name}`, value: item }))),
      // map(list => list.map(item => ({ label: `${item.name}`, value: item }))),
    );
  }

  private applyPreset(list: ISelectOption<ILocationSchema>[], index: number) {
    const item = this.initLocations?.[index];
    if (!item) return list;

    const presetIndex = list.findIndex(i => i.value.slug === item.slug);
    if (presetIndex === -1) {
      list.push({ label: `${item.region}, ${item.type} ${item.name}`, value: item });
      // list.push({ label: `${item.name}`, value: item });
    } else {
      list.splice(presetIndex, 1, { label: `${item.region}, ${item.type} ${item.name}`, value: item });
      // list.splice(presetIndex, 1, { label: `${item.name}`, value: item });
    }
    return list;
  }
}
