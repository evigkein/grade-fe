import { computed, inject, Injectable, signal } from '@angular/core';
import { combineLatest, distinctUntilChanged, map, Observable, shareReplay, startWith, tap } from 'rxjs';
import { isBrowser } from '../../utils/helpers/browser/is-browser.util';
import { NativeEventService } from '../events/native-event.service';

import { DeviceType } from './constants/device-size.constants';
import { isDesktop, isDesktopSmallOrSmaller, isMobile, isTablet, mapWidthToDevice } from './constants/device-type';

export function _DEVICE(): DeviceService {
  return inject(DeviceService);
}

function getWindowWidth(): number {
  // return 400;
  return window?.innerWidth ?? 400
}

@Injectable({providedIn: 'root'})
export class DeviceService {
  private eventService = inject(NativeEventService);
  currentWidth = signal<number>(isBrowser() ? getWindowWidth() : Infinity);
  device = signal<DeviceType>(null!);

  constructor() {
    if (!isBrowser()) return;
    this.eventService.resize$
      .pipe(startWith(window.innerWidth))
      .subscribe(() => {
        this.currentWidth.set(window.innerWidth);
        this.device.set(mapWidthToDevice(window.innerWidth));
      });
  }

  deviceType = computed(() => this.device());

  isMobile = computed(() => isMobile(this.deviceType()));
  isTablet = computed(() => isTablet(this.deviceType()));
  isDesktop = computed(() => isDesktop(this.deviceType()));
  isDesktopSmallOrSmaller = computed(() => isDesktopSmallOrSmaller(this.deviceType()));

  isMobileOrTablet = computed(() => this.isMobile() || this.isTablet());
  isTabletOrDesktop = computed(() => this.isTablet() || this.isDesktop());


  windowEvent$: Observable<Window> = this.eventService.resize$;
  currentWidth$: Observable<number> = this.windowEvent$.pipe(
    map(w => w.innerWidth),
    distinctUntilChanged()
  );
  deviceType$: Observable<DeviceType> = this.currentWidth$.pipe(
    map(mapWidthToDevice),
    distinctUntilChanged(),
    tap((device) => {
      this.device.set(device);
    }),
    shareReplay(1)
  );

  isMobile$: Observable<boolean> = this.deviceType$.pipe(map(isMobile), shareReplay(1));
  isTablet$: Observable<boolean> = this.deviceType$.pipe(map(isTablet), shareReplay(1));
  isDesktop$: Observable<boolean> = this.deviceType$.pipe(map(isDesktop), shareReplay(1));
  isDesktopSmallOrSmaller$: Observable<boolean> = this.deviceType$.pipe(
    map(isDesktopSmallOrSmaller),
    distinctUntilChanged(),
    shareReplay(1)
  );
  isMobileOrTablet$ = combineLatest([this.isMobile$, this.isTablet$]).pipe(
    map(([isMobile, isTablet]) => isMobile || isTablet)
  );
  isTabletOrDesktop$ = combineLatest([this.isTablet$, this.isDesktop$]).pipe(
    map(([isTablet, isDesktop]) => isTablet || isDesktop)
  );
}
